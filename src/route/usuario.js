import express from "express";
import upload from "../services/uploader.js";
import Usuarios from "../services/User.js";

const routerUsuario = express.Router();
const userService = new Usuarios();

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
routerUsuario.post('/', (req,res)=>{
    let usuario = req.body;
    userService.crearUsuario(usuario)
    .then(resultado=>{
        res.send(resultado)
    })
    .catch(error=>console.log(error))
})

export default routerUsuario;