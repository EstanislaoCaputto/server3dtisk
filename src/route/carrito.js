import express from "express";
import Contenedor from "../clases/ContenedorProductos.js";
import Carro from "../services/Carrito.js";

const carritoService = new Carro();
const routerCarrito = express.Router();
const productos = new Contenedor();

//GET
routerCarrito.get('/',(req,res)=>{
    carritoService.verCarrito().then(result=>{
        res.send(result)
    })
    
})
routerCarrito.get('/id', (req,res)=>{
    let id = req.params.id
    carritoService.verCarritoPorId(id).then(result=>{
        res.send(result)
    })
})

//POST
routerCarrito.post('/',(req,res)=>{
    let pedido = req.body
    try {
        carritoService.crearCarrito(pedido).then(resul=>{
            res.send(resul)
        })        
    } catch (error) {
        res.send({error: -1, descripcion:`la ruta: ${req.originalUrl} y el método: ${req.method}, no estan autorizados`})
    }
})

routerCarrito.post('/:id_compra/productos/:id', async (req,res)=>{  // La consigna no aclara como debo acceder al carrito 
    let idCompra = req.params.id_compra                             // por lo que mandare el id de producto y el de compra
    let idProducto = req.params.id;
                               
})

//DELETE
routerCarrito.delete('/:id',(req,res)=>{
    let id = req.params.id;
    
})





export default routerCarrito