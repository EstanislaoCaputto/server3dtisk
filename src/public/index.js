const getProductos = () =>{
    let usuario = document.getElementById('user');
    let boton = document.getElementById('btnProduct');
    
    if(usuario.options.selectedIndex === 0){ // 0 Admin 1 Cliente
        boton.disabled = true
        fetch('/api/productos',{
            method:'GET'
        }).then(resultado=>{
            return resultado.json()
        }).then(json => {
            let productos = json.objetos
            let div = document.getElementById('productos')      //Se que deberia usar motores de plantillas aca 
            productos.forEach(obj => {                          //pero era para verificar que la data llegaba bien
                div.innerHTML += `<div class="card-prod"><h2>Nombre: ${obj.titulo}</h2>
                <spam>$${obj.precio}</spam>
                <img src=${obj.imagen} alt="fotoProducto" id="img-prod"></img>
                </div>`
                console.log(obj);
            });
            return(productos)
        })
        
    }else{
        return(console.log({status:'Error', message:'Solo el Administrador puede'}))
    }

}
