let nombre = document.getElementById('nombre')
let precio = document.getElementById('precio')
let stock = document.getElementById('stock')
let descripcion = document.getElementById('descripcion')
let img = document.getElementById('imagen')
let categoria = document.getElementById('categoria')
let input = document.getElementById('enviar')
let muestraImg = document.getElementById('mostrarImg')
let formulario = document.getElementById('formulario')

let laImagen = img.value.substr(12)
input.addEventListener('click',(e)=>{
    e.preventDefault();
    let formData = new FormData(formulario)
    
    fetch('http://localhost:8080/api/productos', {
        method:'POST',
        body:formData
        
    })
    .then(result=>result.json()).then(json=>console.log(json))
    // .then(console.log('enviado'))
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
