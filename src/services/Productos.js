import {mariadb} from "../config.js";
import upload from "./uploader.js";
import __dirname from '../utils.js'
import path from 'path'
import dotenv from 'dotenv'
dotenv.config({
  path: path.resolve(__dirname,'../variables.env')
})

class ProductosDB {
    constructor(){
        mariadb.schema.hasTable(process.env.COLLECTION_DB_PRODUCTO).then(resultado=>{
            if(!resultado){
                mariadb.schema.createTable(process.env.COLLECTION_DB_PRODUCTO, table=>{
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
            let prodID = await mariadb.table(process.env.COLLECTION_DB_PRODUCTO).insert(producto);
            return{status:'Exito!', message:`Producto agregado con el ID: ${prodID}`}
        } catch (error) {
            return{status:'Error', message:'No se pudo crear el producto', error:error}
        }
    }
    verTodosProductos = async () => {
        try {
            let losProductos = await mariadb.select().table(process.env.COLLECTION_DB_PRODUCTO);
            return{status:'Exito', payload:losProductos}
        } catch (error) {
            return {status:'Error', message:'Algo salio mal'}
        }
    }
    productoPorId = async (id) =>{
        try {
            let prod = await mariadb.select().table(process.env.COLLECTION_DB_PRODUCTO).where('id', id).first();
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
            let prod = await mariadb.select().table(process.env.COLLECTION_DB_PRODUCTO).where('id', id).first().update(producto);
            if (prod) {
                return{status:'Exito', payload:`Producto editado con éxito, ${prod}`}
            } else {
                return{status:'Error', message:'No existe un producto con ese ID'}
            }
        } catch (error) {
            return {status:'Error', message:'Algo salio mal'}
        }
    }
    eliminarTodosLosDatos = async () =>{
        try {
            await mariadb.select().table(process.env.COLLECTION_DB_PRODUCTO).delete()
        } catch (error) {
            return {status:'Error', error:error}
        }
    }
    eliminarProductoPorId = async (id) =>{
        try {
            await mariadb.select().table(process.env.COLLECTION_DB_PRODUCTO).where('id',id).first().del();
            return {status:'Exito!', message:'Producto eliminado'}
        } catch (error) {
            return {status:'Error', message:'Algo salio mal'}
        }
    }
}

export default ProductosDB;