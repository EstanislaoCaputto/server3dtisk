import express from "express";
import upload from "../services/uploader.js";
import ProductosDB from "../services/Productos.js";


const routerProducto = express.Router();
const prodService = new ProductosDB();

//GET
routerProducto.get('/',(req,res)=>{
    prodService.verTodosProductos().then(resultado=>{
        res.send(resultado)
    })
})
routerProducto.get('/:pid',(req,res)=>{
    let id = req.params.pid;
    prodService.productoPorId(id).then(resultado=>{
        res.send(resultado.payload)
    })
})

//POST
routerProducto.post('/',upload.array('file'), (req, res) => {
    let producto = req.body;
    let files = req.files
    let lasImagen = []
    files.forEach(imagen=>{
        lasImagen.push(imagen.path.substr(49))
    })
    producto.Imagen = lasImagen.toString()
    prodService.crearProducto(producto).then(result => {
        res.send(result)
    }).catch(err=>{

        res.send({error: -1, descripcion:`la ruta: ${req.originalUrl} y el método: ${req.method}, no estan autorizados`})
    })

})
//PUT
routerProducto.put('/:id',upload.single('image'),(req,res)=>{ //recibo es producto editado y con el id borro el prod viejo
    if(req.auth){
        let id = req.params.id
        let producto = req.body   
        try {
            prodService.editarProductoPorId(id, producto)
            res.send({status:'Exito!', message:'Producto editado con éxito'})
        } catch{
            return({status:'Error', message:'Error al editar el producto compruebe el ID'})        
        }

    }else{
        res.send({error: -1, descripcion:`la ruta: ${req.originalUrl} y el método: ${req.method}, no estan autorizados`})
    }
})

//DELETE
routerProducto.delete('/borrar-todos-productos', (req,res)=>{
    try {
        prodService.eliminarTodosLosDatos().then(resultado=>{
            res.send(resultado)
        })
    } catch (error) {
        return{status:'Error', message:'No se pudo borrar el producto', Elerror:error}
    }
})
routerProducto.delete('/:id',(req,res)=>{
    let id = req.params.id
    try {
        prodService.eliminarProductoPorId(id).then(resultado=>{
            res.send(resultado)
        })
    } catch (error) {
        return{status:'Error', message:'No se pudo borrar el producto'}
    }
})

export default routerProducto;