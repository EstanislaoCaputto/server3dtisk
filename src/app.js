import express from "express";
import routerProducto from './route/productos.js';
import routerCarrito from './route/carrito.js'
import __dirname from "./utils.js";
import cors from 'cors'
import ProductosDB from "./services/Productos.js";
import Chat from "./services/Chat.js";
import { Server } from "socket.io";
import { sqlite } from "./config.js";


const app = express();
const PORT = process.env.PORT || 8080;
const server = app.listen(PORT, ()=>console.log(`Servidor escuchando en el puerto: ${PORT}`));
const prodRouter = routerProducto;
const admin = true; //Cambiar la variable a true para las peticiones POST, PUT y DELETE
const io = new Server(server);
const mensajes = new Chat();

//PUG para las vistas
app.set('views', __dirname+'/views');
app.set('view engine', 'pug');


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

app.get('/', (req,res)=>{
    let servicio = new ProductosDB();
    servicio.verTodosProductos().then(impresoras=>{
        
        let objRenderizado = {
            objetos: impresoras.payload
        }
        res.render('productos', objRenderizado)
    })
})

//SOCKET para crear el chat

io.on('connection', async socket=>{
    
    console.log(`El socket ${socket.id} se ha conectado`);
    socket.on('mensj', async dato=>{
        await mensajes.crearRegistro(dato).then(resultado=>{
            console.log(resultado);
        })
        let mensjEmit = await mensajes.verMensajes().then(resul=>{
            return resul
        });
        console.log(mensjEmit);
        io.emit('mensajeLog', mensjEmit);
    })
})


