import express from "express";
import routerProducto from './route/productos.js';
import routerCarrito from './route/carrito.js'
import routerUsuario from "./route/usuario.js";
import __dirname from "./utils.js";
import cors from 'cors'
import jwt from 'jsonwebtoken'
import dotenv from 'dotenv'
import { key } from "./key.js";
import ProductosDB from "./services/Productos.js";
import Chat from "./services/Chat.js";
import { Server } from "socket.io";
import path from "path";

dotenv.config({
    path: path.resolve(__dirname,'../variables.env')
})
const app = express();
const PORT = process.env.PORT || 8081;
const server = app.listen(PORT, ()=>console.log(`Servidor escuchando en el puerto: ${PORT}`));
const prodRouter = routerProducto;
const userRouter = routerUsuario;

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
    let deDonde = `desde ip: ${req.ip}`
    console.log('Peticion hecha a las: '+time.toTimeString().split(" ")[0], req.method, req.url, deDonde);
    
    next();
})
app.use('/api/productos', prodRouter);
app.use('/api/carrito', routerCarrito);
app.use('/api/usuario', userRouter);




app.get('/', (req,res)=>{
    let servicio = new ProductosDB();
    servicio.verTodosProductos().then(impresoras=>{
        
        let objRenderizado = {
            objetos: impresoras.payload
        }
        res.render('productos', objRenderizado)
    })
})
app.get('/formulario-de-carga', (req,res)=>{
    res.render('upload')
})




app.get('/info', (req,res)=>{
    res.send({Puerto:PORT})
})


//SOCKET para crear el chat

io.on('connection', async socket=>{
    console.log(`El socket ${socket.id} se ha conectado`);
    let mensjEmit = await mensajes.verMensajes().then(resul=>{
        return resul
    })
    socket.emit('mensajeLog', mensjEmit.message);

    socket.on('mensj', async dato=>{
        io.emit('mensajeLog', mensjEmit.message);
        await mensajes.crearRegistro(dato).then(resultado=>{
            console.log(resultado);
        })
    })
    

})

//------------------USANDO JWT-----------------//
const user = [{
    username:'Tano',
    contraseña:'123',
    mail:'correo@correo.com'
}];
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
app.get('/currentUser', authMiddleware, (req,res)=>{
    res.send(req.user)
})
app.get('/login', (req,res)=>{
    res.render('login')
})
app.post('/login', (req,res)=>{
    let users = user.find(usuario=>usuario.username=== req.body.username)
    if(!users) return res.status(400).send({status:'error', error:'usuario no existe'})
    if(users.password!==req.body.password) return res.status(400).send({status:'error', error:'Contraseña incorrecta'})
    const payload = {
        user:{
            username:users.username,
            mail:users.mail
        }
    }
    let token = jwt.sign(payload,key,{
        expiresIn:'24h'
    })
    res.send({
        message:'logged in',
        token:token
    })
})


