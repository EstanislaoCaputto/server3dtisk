import {mariadb} from "../config.js";
import __dirname from '../utils.js'
import path from 'path'
import dotenv from 'dotenv'
dotenv.config({
  path: path.resolve(__dirname,'../variables.env')
})

export default class Carro{
    constructor(){
        mariadb.schema.hasTable(process.env.COLLECTION_DB_CARRITO).then(resultado=>{
            if(!resultado){
                mariadb.schema.createTable(process.env.COLLECTION_DB_CARRITO, table=>{
                    table.increments();
                    table.string('titulo').notNullable();
                    table.string('comprador').notNullable();
                    table.integer('total').notNullable().defaultTo(0)
                    table.timestamps(true,true);
                })
            }
        })
    }
    verCarrito = async () =>{
        try {
            let carrocompra = await mariadb.select().table(process.env.COLLECTION_DB_CARRITO);
            return { status: 'Exito', payload: carrocompra }
        } catch (error) {
            return{status:'Error', message:error}
            
        }
    }
    verCarritoPorId = async (id) =>{
        try {
            let carrocompra = await mariadb.select().table(process.env.COLLECTION_DB_CARRITO).where('id', id).first();
            if(carrocompra){
                return{status:'Exito', payload:carrocompra}
            }else{
                return{status:'Error', message:'carro de compra no existe'}
            }
        } catch (error) {
            return{status:'Error', message:error}
        }
    }
    crearCarrito = async (carrocompra) =>{
        try {
            let exists = await mariadb.table(process.env.COLLECTION_DB_CARRITO).select().where('comprador', carrocompra.comprador).first();
            if (exists) return {status:'Error', message: 'El carro de compra ya existe'}
            let resultado = await mariadb.table(process.env.COLLECTION_DB_CARRITO).insert(carrocompra)
            return {status:'Exitos', payload:resultado}
        } catch (error) {
            return{status:'Error', message:error}
        }
    }
    
}