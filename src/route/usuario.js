import express from "express";
import upload from "../services/uploader.js";
import { encript, compare } from "../utilidades/handleEncript.js";
import Usuarios from "../services/User.js";

const routerUsuario = express.Router();
const userService = new Usuarios();
const authMiddleware = (req,res,next) =>{
    const authHeader = req.headers.authorization;
    if(!authHeader || authHeader === 'null') return res.status(401).send({status:'error', error:'Token not authorization'})
    const token = authHeader.split(' ')[1];
    jwt.verify(token, key,(err,decoded)=>{
        if(err) return res.status(403).send({error:'Not authorized'})
        req.user = decoded.user;
        next();
    })
}

//GET
routerUsuario.get('/', (req,res)=>{
    userService.verUsuarios().then(resultado=>{
        res.send(resultado)
    })
})
routerUsuario.get('/:uid', (req,res)=>{
    let id = req.params.uid;
    userService.verUsuarioId(id).then(resultado=>{
        res.send(resultado.payload)
    })
})

//POST
routerUsuario.post('/logear', async(req,res)=>{
    let user = req.body
    console.log(user);
    userService.verUsuarioNombre(user.Nombre).then(result=>{
        console.log(result.payload[1])
        res.send(result.payload)
        
    })
})
routerUsuario.post('/registrar', async(req,res)=>{
    let usuario = req.body
    userService.verUsuarioNombre(usuario.Nombre).then(result=>{
        res.send(result)
    })
})
routerUsuario.post('/', async(req,res)=>{
    let usuario = req.body
    
    let password = await encript(usuario.Contraseña,10)
    usuario.Contraseña = password
    try{
        userService.crearUsuario(usuario).then(resultado=>{
            res.send({status:'Exito', message:'Usuario agreado', payload:resultado})
        })

    }catch(error){
        res.send({status:'Error', error:error})
    }
})

//DELETE
routerUsuario.delete('/eliminar-todos-usuarios', (req,res)=>{
    userService.eliminarTodo().then(resultado=>{
        res.send(resultado)
    })
})
routerUsuario.delete('/:uid',(req,res)=>{
    let id = req.params.uid
    userService.eliminarUser(id).then(result=>{
        res.send(result)
    })
})

export default routerUsuario;