import fs from 'fs';
import crearId from '../utilidades/utilidades.js';
import __dirname from '../utils.js';

const prodURL = __dirname+'/files/data.txt';


class Contenedor{
    constructor(archivo){
        this.archivo = archivo;
    };
    async guardarProducto(producto){ //Quiero recibir impresoras, tratare de mantener el espanglish pido perdon
        try{
            let misDatos = await fs.promises.readFile(prodURL,'utf-8');
            let productoParseado = JSON.parse(misDatos);
            let id = crearId(4);
            producto.id = id;
            let timestamp = Date.now();
            let time = new Date(timestamp)
            producto.timestamp = time.toTimeString().split(" ")[0]
            productoParseado.push(producto);
            await fs.promises.writeFile(prodURL,JSON.stringify(productoParseado,null,2));
            console.log(`${producto.titulo} guardado con exito con el id: ${producto.id}`);
            return{status:"Exito", message:"Producto guardado!"};
            
        }catch{
            let id = crearId(4)
            let timestamp = Date.now();
            let time = new Date(timestamp)
            producto.timestamp = time.toTimeString().split(" ")[0]
            producto.id = id
            try {
                await fs.promises.writeFile(prodURL, JSON.stringify([producto],null,2));
                return{status:"Exito!", message:"Producto agregado!"};
                
            }catch (error) {
                return{status:'Error', message:"Error al guardar el archivo", error:error}
            };
        };
    };
    async obtenerProductos(){
        try {
            let misDatos = await fs.promises.readFile(prodURL, 'utf-8');
            let productos = JSON.parse(misDatos);
            return{status:'Exito', objetos:productos}
        } catch{
            return{status:'Error', message:'Error al mostrar los productos'}
        };
    };
    async obtenerPorID(id){
        try {
            let misDatos = await fs.promises.readFile(prodURL, 'utf-8');
            let productos = JSON.parse(misDatos);
            let elProducto = productos.find(p=>p.id===id);
            if(elProducto){
                return{status:'Exito!', objeto:elProducto}
            }else{
                return{status:'Error', message:`El producto con el id: ${id} de momento no ta :S`}
            };
        } catch{
            return{status:'Error', message:`Error al buscar el producto`}
        };
    };
    async editarPorID(id, producto){
        try {
            let misDatos = await fs.promises.readFile(prodURL, 'utf-8');
            let productos = JSON.parse(misDatos);
            let prod = productos.map(impresora=>{
                if(impresora.id===id){
                    impresora = Object.assign({id:impresora.id, ...producto, ...impresora})
                    return impresora
                }else{
                    return impresora
                }
            })
            
            try {
                await fs.promises.writeFile(prodURL, JSON.stringify(prod, null, 2))
            } catch{
                
                return {status:'Error', message:'No se pudo editar el producto con el ID indicado'}
            }
        } catch{
            return {status:'Error', message:'No existe el producto o el ID esta mal escrito'}
        };
    };
    async eliminarPorID(id){
        let misDatos = await fs.promises.readFile(prodURL, 'utf-8');
        let productos = JSON.parse(misDatos);
        let prodBorrado = productos.filter(p=>p.id!==id)
        try {
            await fs.promises.writeFile(prodURL, JSON.stringify(prodBorrado, null, 2))
            console.log(`Eliminaste el producto con el ID: ${id}`);
            return{status:'Exito!', message:'Objeto eliminado con éxito!'}
        } catch{
            return{status:'Error', message:'Problema para eliminar el archivo'}
        }
    }
    async eliminarTodo(){
        await fs.promises.unlink(prodURL, function(err){
            if (err) return{status:'Error', message:`Error al borrar: ${err}`}
            return{status:'Exito!', message:'Productos eliminados con éxito'}
        })
    }
};


// let a = new Contenedor('prueba.txt');
// a.guardarProducto({titulo:'Las Hojas', precio:250, descripcion:'Tabaco barato'})



export default Contenedor;