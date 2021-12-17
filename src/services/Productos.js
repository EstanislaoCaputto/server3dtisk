import {mariadb} from "../config.js";

class ProductosDB {
    constructor(){
        mariadb.schema.hasTable('producto').then(resultado=>{
            if(!resultado){
                mariadb.schema.createTable('producto', table=>{
                    table.increments();
                    table.string('titulo').notNullable();
                    table.string('marca').notNullable().defaultTo('sin Marca');
                    table.string('tipo').notNullable();
                    table.string('dimensiones').notNullable().defaultTo('0x0x0');
                    table.string('imagen').notNullable();
                    table.string('descripcion').notNullable().defaultTo('sin Descripcion');
                    table.integer('precio').notNullable();
                    table.boolean('stock').notNullable().defaultTo(false);
                    table.timestamps(true,true);
                })
            }else{
                return {status:'Error', message:'Algo salio mal'}
            }
        })
    }
    crearProducto = async (producto) => {
        try {
            let prodID = await mariadb.table('producto').insert(producto);
            return{status:'Exito!', message:`Producto agregado con el ID: ${prodID}`}
        } catch (error) {
            return{status:'Error', message:'No se pudo crear el producto'}
        }
    }
    verTodosProductos = async () => {
        try {
            let losProductos = await mariadb.select().table('producto');
            return{status:'Exito', payload:losProductos}
        } catch (error) {
            return {status:'Error', message:'Algo salio mal'}
        }
    }
    productoPorId = async (id) =>{
        try {
            let prod = await mariadb.select().table('producto').where('id', id).first();
            if (prod) {
                return{status:'Exito!', payload:prod}
            } else {
                return{status:'Error', message:'No se encontro el producto, verifique el ID'}
            }
        } catch (error) {
            return {status:'Error', message:'Algo salio mal'}
        }
    }
    editarProductoPorId = async (id,producto) =>{
        try {
            let prod = await mariadb.select().table('producto').where('id', id).first().update(producto);
            if (prod) {
                return{status:'Exito', payload:`Producto editado con éxito, ${prod}`}
            } else {
                return{status:'Error', message:'No existe un producto con ese ID'}
            }
        } catch (error) {
            return {status:'Error', message:'Algo salio mal'}
        }
    }
    eliminarProductoPorId = async (id) =>{
        try {
            await mariadb.select().table('producto').where('id',id).first().del();
            return {status:'Exito!', message:'Producto eliminado'}
        } catch (error) {
            return {status:'Error', message:'Algo salio mal'}
        }
    }
}

export default ProductosDB;