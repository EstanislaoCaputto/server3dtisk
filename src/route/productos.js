import express from "express";
import upload from "../services/uploader.js";
import Contenedor from "../clases/ContenedorProductos.js";


const routerProducto = express.Router();
const productos = new Contenedor();

//GET
routerProducto.get('/',(req,res)=>{
    productos.obtenerProductos().then(resultado=>{
        res.send(resultado);
    })
})
routerProducto.get('/:pid',(req,res)=>{
    let id = req.params.pid;
    productos.obtenerPorID(id).then(resultado=>{
        res.send(resultado)
    })
})

//POST
routerProducto.post('/', upload.single('image'), (req,res)=>{ //Agrega un nuevo producto
    if(req.auth){
        let file = req.file
        let producto = req.body;
        console.log(file);
        producto.precio = parseInt(producto.precio)
        producto.imagen = req.protocol+'://'+req.hostname+':8080/'+'/imagenes/'+file.filename;
        productos.guardarProducto(producto).then(result=>{
            res.send(result)
            
        })

    }else{
        res.send(console.log({status:'Error', message:'Solo el admin tiene autorizacion'}))
    }
})
//PUT
routerProducto.put('/',upload.single('image'),(req,res)=>{
    if(req.auth){
        let file = req.file;
        let producto = req.body
        console.log(producto);
        producto.imagen = req.protocol+'://'+req.hostname+':8080/'+'/imagenes/'+file.filename;
        try {
            productos.editarPorID(producto)
            res.send({status:'Exito!', message:'Producto editado con éxito'})
        } catch{
            return({status:'Error', message:'Error al editar el producto compruebe el ID'})        
        }

    }else{
        res.send(console.log({status:'Error', message:'Solo el admi esta autorizado'}))
    }
})

//DELETE
routerProducto.delete('/:pid',(req,res)=>{
    if(req.auth){
        let id = req.params.pid;
        productos.eliminarPorID(id).then(resultado=>{
            res.send(resultado)
        })

    }else{
        res.send(console.log({status:'Error', message:'Solo el admin esta autorizado'}))
    }
})

export default routerProducto;