import mariadb from '../config.js';
import __dirname from '../utils.js';
import crearId from '../utilidades/utilidades.js';

const carritoURL = __dirname+'/files/carrito.txt';

class Carrito{
    constructor(archivo, user){
        this.archivo = archivo;
        this.user = user;
    };
    async agregarAlCarro(producto, user){
        try {
            let miCarrito = await mariadb.promises.readFile(carritoURL, 'utf-8');
            let carroParseado = JSON.parse(miCarrito);
            let idCompra = crearId(4)
            let timestamp = Date.now();
            let time = new Date(timestamp)
            
            carroParseado.push({id:idCompra,timestamp:time.toTimeString().split(" ")[0],usuario:user,carrito:[producto.compra]})       
            await mariadb.promises.writeFile(carritoURL,JSON.stringify(carroParseado,null,2))
            return{status:'Exito!', message:'Compra agregada al Carrito con éxito', id:`el ID de su compra es ${idCompra}`}

        } catch{
            try {
                let idCompra = crearId(4)
                let compra = []
                let timestamp = Date.now();
                let time = new Date(timestamp)
                compra.push({id:idCompra,timestamp:time.toTimeString().split(" ")[0], usuario:user, carrito:[producto.compra]})
                await mariadb.promises.writeFile(carritoURL,JSON.stringify(compra,null,2))
                return{status:'Exito!', message:'Tu primera compra agregada al Carrito con éxito', id:`el ID de su compra es ${idCompra}`}
            } catch(error){
                console.log(error);
                return{status:'Error', message:'No se pudo agregar'}
            }
        }
    }
    async eliminarCompraPorId(id){
        let misDatos = await mariadb.promises.readFile(carritoURL,'utf-8');
        let carroParseado = JSON.parse(misDatos);
        let compraBorrada = carroParseado.filter(c=>c.id!==id)
        try {
            await mariadb.promises.writeFile(carritoURL,JSON.stringify(compraBorrada,null,2))
            return{status:'Exito!', message:'Compra borrada con éxito'}
        } catch (error) {
            return{status:'Error', message:'No se pudo borrar', error:error}
        }

    }
    async verCompraPorId(id){
        let misDatos = await mariadb.promises.readFile(carritoURL,'utf-8');
        let carroParseado = JSON.parse(misDatos);
        let miCompra = carroParseado.find(c=>c.id===id)
        if(!miCompra){
            return{status:'Error', message:'Compruebe el ID ingresado'}
        }else{
            return(miCompra.carrito)
        }

    }
    async agregarProductoAlCompra(id, producto){
        let misDatos = await mariadb.promises.readFile(carritoURL, 'utf-8');
        let carroParseado = JSON.parse(misDatos);
        try {
            let miCompra = carroParseado.find(c => c.id === id);
            let objetos = miCompra.carrito
            objetos.push(producto)
            miCompra.carrito = objetos
            let NvaCompra = carroParseado.filter(c => c.id !== miCompra.id)  //borro la compra con su id y pusheo la compra con sus prod agregados
            NvaCompra.push(miCompra)
            await mariadb.promises.writeFile(carritoURL,JSON.stringify(NvaCompra,null,2))
            return{status:'Exito!', message:'Producto agregado al carro'}
        } catch (error) {
            return{status:'Error', message:'Error al agregar el producto', error:error}
        }

    }
    async eliminarProductoDeCompra(idCompra,idProducto){
        let misDatos = await mariadb.promises.readFile(carritoURL,'utf-8');
        let carroParseado = JSON.parse(misDatos);
        let miCompra = carroParseado.find(c=>c.id===idCompra)
        let objetos = [miCompra.compra]
        let objElim = objetos.filter(o=>o.id!==idProducto)
        miCompra.compra = objElim
        let compraEditada = carroParseado.filter(c=>c.id!==idCompra)
        compraEditada.push(miCompra)
        try {
            await mariadb.promises.writeFile(carritoURL, JSON.stringify(compraEditada,null,2))
            return{status:'Exito!', message:'Producto eliminado del carrito'}
        } catch (error) {
            return{status:'Error', message:'No se pudo borrar el producto', error:error}
        }
    }
}


// const c = new Carrito('carrito.txt');
// c.agregarAlCarro({titulo:'Lucky', precio:180, descripcion:'Tabaco industrial'},{userName:"Alguien Más"});
//c.eliminarCompraPorId('9ErN')
//c.verCompraPorId('dp3e')
//c.agregarProductoAlCompra('dp3e',{titulo:'Las Hojas', precio:200, descripcion:'Tabaco barato'})

export default Carrito;