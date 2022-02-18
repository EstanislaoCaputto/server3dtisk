import { mariadb } from "../config.js";

class Chat {
    constructor(){
        mariadb.schema.hasTable('Chat').then(resultado=>{
            if(!resultado){
                mariadb.schema.createTable('Chat', table=>{
                    table.increments();
                    table.string('usuario').notNullable();
                    table.string('mensajes').notNullable();
                    table.timestamps(true,true);
                }).then(result=>{

                    console.log("Tabla de Chat creada")
                })
            }
        })
    }
    
    verMensajes = async () =>{
        try {
            let Chat = await mariadb.select().table('Chat');
            return {status:'Exito', message:Chat}
        } catch (error) {
            return{status:'Error', message:error}
        }
    }
    crearRegistro = async (datos) =>{
        try {
            let result = await mariadb.table('Chat').insert(datos);
            return {status:'Exito', message:`Registro creado con el id: ${result}`}
        } catch (error) {
            return{status:'Error', message:error}
        }
    }
}

export default Chat;