import {mariadb} from "../config.js";

export default class Carro{
    constructor(){
        mariadb.schema.hasTable('carrocompra').then(resultado=>{
            if(!resultado){
                mariadb.schema.createTable('carrocompra', table=>{
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
            let carrocompra = await mariadb.select().table('carrocompra');
            return { status: 'Exito', payload: carrocompra }
        } catch (error) {
            return{status:'Error', message:error}
            
        }
    }
    verCarritoPorId = async (id) =>{
        try {
            let carrocompra = await mariadb.select().table('carrocompra').where('id', id).first();
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
            let exists = await mariadb.table('carrocompra').select().where('comprador', carrocompra.comprador).first();
            if (exists) return {status:'Error', message: 'El carro de compra ya existe'}
            let resultado = await mariadb.table('carrocompra').insert(carrocompra)
            return {status:'Exitos', payload:resultado}
        } catch (error) {
            return{status:'Error', message:error}
        }
    }
    
}