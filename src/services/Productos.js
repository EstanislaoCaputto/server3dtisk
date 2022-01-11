import {mariadb} from "../config.js";

class ProductosDB {
    constructor(){
        mariadb.schema.hasTable('productos').then(resultado=>{
            if(!resultado){
                mariadb.schema.createTable('productos', table=>{
                    table.increments();
                    table.string('Nombre').notNullable();
                    table.string('Categorías').notNullable().defaultTo('sin Marca');
                    table.string('Tipo').notNullable();
                    table.string('Imágenes').notNullable();
                    table.string('Descripcion').notNullable().defaultTo('sin Descripcion');
                    table.string('Descripcion corta').notNullable().defaultTo('sin Descripcion');
                    table.integer('Precio normal').notNullable();
                    table.integer('Peso').notNullable();
                    table.integer('Ancho').notNullable();
                    table.integer('Altura').notNullable();
                    table.integer('Longitud').notNullable();
                    table.boolean('Stock').notNullable().defaultTo(false);
                    table.timestamps(true,true);
                })
            }else{
                return {status:'Error', message:'Algo salio mal'}
            }
        })
    }
    crearProducto = async (producto) => {
        try {
            let prodID = await mariadb.table('productos').insert(producto);
            return{status:'Exito!', message:`Producto agregado con el ID: ${prodID}`}
        } catch (error) {
            return{status:'Error', message:'No se pudo crear el producto', error:error}
        }
    }
    verTodosProductos = async () => {
        try {
            let losProductos = await mariadb.select().table('productos');
            return{status:'Exito', payload:losProductos}
        } catch (error) {
            return {status:'Error', message:'Algo salio mal'}
        }
    }
    productoPorId = async (id) =>{
        try {
            let prod = await mariadb.select().table('productos').where('id', id).first();
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
            let prod = await mariadb.select().table('productos').where('id', id).first().update(producto);
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
            await mariadb.select().table('productos').where('id',id).first().del();
            return {status:'Exito!', message:'Producto eliminado'}
        } catch (error) {
            return {status:'Error', message:'Algo salio mal'}
        }
    }
}

export default ProductosDB;