import express from "express";
import Carrito from "../clases/ElCarrito.js";
import Contenedor from "../clases/ContenedorProductos.js";


const routerCarrito = express.Router();
const productos = new Contenedor();
const carrito = new Carrito();

//GET
routerCarrito.get('/:id/productos',(req,res)=>{
    let id = req.params.id;
    carrito.verCompraPorId(id).then(resultado=>{
        res.send(resultado)
    })
})

//POST
routerCarrito.post('/',(req,res)=>{  //Hago una peticion con formato JSON para poder dividir el array del carrito
    let pedido = req.body || []          //en compra(un array con 1 o mas objetos), usuario(objeto con los datos del user)
    let usuario = pedido.usuario || {}
    if(usuario.length===0){
        delete pedido.usuario
    }
    try {
        carrito.agregarAlCarro(pedido,usuario).then(resultado=>{
            res.send(resultado)
        })
        
        
    } catch (error) {
        res.send({error: -1, descripcion:`la ruta: ${req.originalUrl} y el método: ${req.method}, no estan autorizados`})
    }
})

routerCarrito.post('/:id_compra/productos/:id', async (req,res)=>{  // La consigna no aclara como debo acceder al carrito 
    let idCompra = req.params.id_compra                             // por lo que mandare el id de producto y el de compra
    let idProducto = req.params.id;
    try {
        await productos.obtenerPorID(idProducto).then(resulta=>{
            carrito.agregarProductoAlCompra(idCompra,resulta.objeto).then(resultado=>{
                res.send(resultado)
            
            })
        })      
    } catch (error) {
        console.log('Hubo un error'+error);
    }                           
})

//DELETE
routerCarrito.delete('/:id',(req,res)=>{
    let id = req.params.id;
    carrito.eliminarCompraPorId(id).then(resultado=>{
        res.send(resultado)
    })
})





export default routerCarrito