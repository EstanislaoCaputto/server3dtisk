import { mariadb } from "../config.js";

export default class Usuarios{
    constructor(){
        mariadb.schema.hasTable('usuarios').then(resultado=>{
            if(!resultado){
                mariadb.schema.createTable('usuarios', table=>{
                    table.increments();
                    table.string('Nombre').notNullable();
                    table.string('Apellido').notNullable();
                    table.string('Mail').notNullable();
                    table.integer('Edad');
                    table.integer('Telefono').notNullable()
                    table.string('Imagen');
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
            let userId = await mariadb.table('usuarios').insert(usuario);
            return {status:'Exito', payload:`Usuario creado con el id: ${userId}`}
        } catch (error) {
            return{status:'Error', message:`Algo anda mal, no se creo el usuario, ${error}`}
        }
    }
    verUsuarios = async () =>{
        try {
            let usuarios = await mariadb.select().table('usuarios')
            return {status:'Exito', payload:usuarios}
        } catch (error) {
            return {status:'Error', message:'Algo salio mal'}
        }
    }
    verUsuarioId = async(id) =>{
        try {
            let user = await mariadb.select().table('usuarios').where('idusuarios', id).first();
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
            await mariadb.select().table('usuarios').where('id', id).first().del()
            return{status:'Exito', message:'Usuario eliminado'}
        } catch (error) {
            return {status:'Error', message:'Algo salio mal'}
        }
    }

}
