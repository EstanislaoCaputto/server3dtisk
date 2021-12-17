import { sqlite } from "../config.js";

class Chat {
    
    verMensajes = async () =>{
        try {
            let Chat = await sqlite.select().table('Chat');
            return {status:'Exito', message:Chat[0]}
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