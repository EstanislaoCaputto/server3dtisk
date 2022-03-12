import {mariadb} from "../config.js";

class ProductosDB {
    constructor(){
        mariadb.schema.hasTable('productos1').then(resultado=>{
            if(!resultado){
                mariadb.schema.createTable('productos1', table=>{
                    table.increments();
                    table.string('Nombre').notNullable();
                    table.string('Categorías').notNullable().defaultTo('sin Marca');
                    table.string('Imagen').notNullable();
                    table.string('Descripcion').notNullable().defaultTo('sin Descripcion');
                    table.integer('Precio').notNullable();
                    table.string('Stock').notNullable()
                    table.timestamps(true,true);
                })
            }else{
                return {status:'Error', message:'Algo salio mal'}
            }
        })
    }
    crearProducto = async (producto) => {
        try {
            let prodID = await mariadb.table('productos1').insert(producto);
            return{status:'Exito!', message:`Producto agregado con el ID: ${prodID}`}
        } catch (error) {
            return{status:'Error', message:'No se pudo crear el producto', error:error}
        }
    }
    verTodosProductos = async () => {
        try {
            let losProductos = await mariadb.select().table('productos1');
            return{status:'Exito', payload:losProductos}
        } catch (error) {
            return {status:'Error', message:'Algo salio mal'}
        }
    }
    productoPorId = async (id) =>{
        try {
            let prod = await mariadb.select().table('productos1').where('id', id).first();
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
            let prod = await mariadb.select().table('productos1').where('id', id).first().update(producto);
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
            await mariadb.select().table('productos1').where('id',id).first().del();
            return {status:'Exito!', message:'Producto eliminado'}
        } catch (error) {
            return {status:'Error', message:'Algo salio mal'}
        }
    }
}

export default ProductosDB;