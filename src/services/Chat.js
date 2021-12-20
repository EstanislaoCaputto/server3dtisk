import { sqlite } from "../config.js";

class Chat {
    constructor(){
        sqlite.schema.hasTable('Chat').then(resultado=>{
            if(!resultado){
                sqlite.schema.createTable('Chat', table=>{
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
            let Chat = await sqlite.select().table('Chat');
            return {status:'Exito', message:Chat}
        } catch (error) {
            return{status:'Error', message:error}
        }
    }
    crearRegistro = async (datos) =>{
        try {
            let result = await sqlite.table('Chat').insert(datos);
            return {status:'Exito', message:`Registro creado con el id: ${result}`}
        } catch (error) {
            return{status:'Error', message:error}
        }
    }
}

export default Chat;