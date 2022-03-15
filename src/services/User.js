import { mariadb } from "../config.js";
import __dirname from '../utils.js'
import path from 'path'
import dotenv from 'dotenv'
dotenv.config({
  path: path.resolve(__dirname,'../variables.env')
})

export default class Usuarios{
    constructor(){
        mariadb.schema.hasTable(process.env.COLLECTION_DB_USUARIO).then(resultado=>{
            if(!resultado){
                mariadb.schema.createTable(process.env.COLLECTION_DB_USUARIO, table=>{
                    table.increments();
                    table.string('Nombre').notNullable();
                    table.string('Apellido').notNullable();
                    table.string('Mail').notNullable();
                    table.integer('Edad');
                    table.integer('Telefono').notNullable();
                    table.string('Imagen');
                    table.string('Contraseña').notNullable();
                    table.timestamps(true,true);
                })
                return{message:'Tabla usuario creada'}
            }else{
                return{status:'Error', message:'Algo anda mal'}
            }
        })
    }
    crearUsuario = async(usuario) =>{
        try {
            let userId = await mariadb.table(process.env.COLLECTION_DB_USUARIO).insert(usuario);
            return {status:'Exito', payload:`Usuario creado con el id: ${userId}`}
        } catch (error) {
            return{status:'Error', message:`Algo anda mal, no se creo el usuario, ${error}`}
        }
    }
    verUsuarios = async () =>{
        try {
            let usuarios = await mariadb.select().table(process.env.COLLECTION_DB_USUARIO)
            return {status:'Exito', payload:usuarios}
        } catch (error) {
            return {status:'Error', message:'Algo salio mal'}
        }
    }
    verUsuarioNombre = async(nombre) =>{
        try {
            let user = await mariadb.select().table(process.env.COLLECTION_DB_USUARIO).where('Nombre',nombre)
            if(user){
                return{status:'Exito', payload:user}
            }else{
                return{status:'error', message:'No se encontro el Nombre de usuario'}
            }
        } catch (error) {
            return {status:'Error', message:'No existe el Usuario', error:error}
        }
    }
    verUsuarioId = async(id) =>{
        try {
            let user = await mariadb.select().table(process.env.COLLECTION_DB_USUARIO).where('idusuarios', id).first();
            if(user){
                return{status:'Exito', payload:user}
            }else {
                return{status:'Error', message:'No se encontro el Usuario, verifique el ID'}
            }
        } catch (error) {
            return {status:'Error', message:'Algo salio mal'}
        }
    }
    eliminarUser = async(id) =>{
        try {
            await mariadb.select().table(process.env.COLLECTION_DB_USUARIO).where('id', id).first().del()
            return{status:'Exito', message:'Usuario eliminado'}
        } catch (error) {
            return {status:'Error', message:'Algo salio mal'}
        }
    }
    eliminarTodo = async()=>{
        try {
            await mariadb.select().table(process.env.COLLECTION_DB_USUARIO).delete()
            return{status:'Exito', message:'Usuarios eliminados'}
        } catch (error) {
            return {status:'Error', message:'Algo salio mal', error:error}
        }
    }

}

