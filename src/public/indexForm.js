let nombre = document.getElementById('nombre')
let precio = document.getElementById('precio')
let stock = document.getElementById('stock')
let descripcion = document.getElementById('descripcion')
let img = document.getElementById('imagen')
let categoria = document.getElementById('categoria')
let input = document.getElementById('enviar')
let muestraImg = document.getElementById('mostrarImg')
let formulario = document.getElementById('formulario')


input.addEventListener('click',(e)=>{
    e.preventDefault();
    let producto = {
        Nombre:nombre.value,
        Precio:precio.value,
        Stock:stock.value,
        Descripcion:descripcion.value,
        Imagen:img.value,
        Categoria:categoria.value
    }
    fetch('http://localhost:8080/api/productos', {
        method:'POST',
        body:JSON.stringify(producto),
        headers:{
            'Content-Type':'application/json; charset=utf-8'
        }
    })
    .then(console.log('enviado'))
    .catch(err=>console.log('error'+err))
    
    
})
let limpiar = () =>{
    formulario.reset()
}
img.addEventListener('change', ()=>{
    let archImg = img.files;
    if(!archImg || !archImg.length){
        muestraImg.src=""
        return
    }else if(archImg.length > 1){
        let arrayImg = []
        Array.from(archImg).forEach((element,index) => {
            console.log(`index: ${index} y elemnt: ${element}`);
            arrayImg.push(element)
            if(index===0){
                let elUrl = URL.createObjectURL(arrayImg[0])
                muestraImg.src=elUrl
            }else if(index>0){
                let urlImagen = URL.createObjectURL(archImg[index])
                let muestraImagenes = document.createElement('img')
                muestraImagenes.classList.add('mostrarImg')
                muestraImagenes.src=urlImagen 
                let div = document.getElementById('mostraimg')
                div.appendChild(muestraImagenes)

            }
            
        });
    }else if(archImg.length===1){
        let laImg = archImg[0]
        let objUrl = URL.createObjectURL(laImg)
        muestraImg.src = objUrl

    }
})
