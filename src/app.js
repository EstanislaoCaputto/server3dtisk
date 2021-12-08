import express from "express";
import routerProducto from './route/productos.js';
import routerCarrito from './route/carrito.js'
import __dirname from "./utils.js";
import cors from 'cors'


const app = express();
const PORT = process.env.PORT || 8080;
const server = app.listen(PORT, ()=>console.log(`Servidor escuchando en el puerto: ${PORT}`));
const prodRouter = routerProducto;
const admin = true; //Cambiar la variable a true para las peticiones POST, PUT y DELETE


app.use(express.json());
app.use(cors());
app.use(express.urlencoded({extended:true}));
app.use(express.static(__dirname+'/public'));
app.use((err,req,res,next)=>{
    console.log(err);
    res.status(404).send({error: -2, descripcion:`la ruta: ${req.originalUrl} y el método: ${req.method}, no estan autorizados`})
    next();
})
app.use((req,res,next)=>{
    let timestamp = Date.now();
    let time = new Date(timestamp);
    console.log('Peticion hecha a las: '+time.toTimeString().split(" ")[0], req.method, req.url);
    req.auth = admin;
    next();
})
app.use('/api/productos', prodRouter);
app.use('/api/carrito', routerCarrito);




