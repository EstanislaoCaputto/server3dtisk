import express from "express";
import routerProducto from './route/productos.js';
import routerCarrito from './route/carrito.js'
import __dirname from "./utils.js";


const app = express();
const PORT = process.env.PORT || 8080;
const server = app.listen(PORT, ()=>console.log(`Servidor escuchando en el puerto: ${PORT}`));
const prodRouter = routerProducto;
const admin = true;

app.use(express.json());
app.use(express.urlencoded({extended:true}));
app.use(express.static(__dirname+'/public'));
app.use((req,res,next)=>{
    let timestamp = Date.now();
    let time = new Date(timestamp);
    console.log('Peticion hecha a las: '+time.toTimeString().split(" ")[0], req.method, req.url);
    req.auth = admin;
    next();
})
app.use((err,req,res,next)=>{
    console.log(err.stack);
    res.status(500).send('Error en el Servidor')
})
app.use('/api/productos', prodRouter);
app.use('/api/carrito', routerCarrito);

