let bntSession = document.getElementById('sesion')
let btnInicioSesion = document.getElementById('entrar')

bntSession.addEventListener('click', e=>{
    e.preventDefault()
    fetch('/login').then(result=>{
        result.json()
        location.replace('/login')
    })
    
})

btnInicioSesion.addEventListener('click', e=>{
    e.preventDefault()
    fetch('/inicioSesion').then(result=>{
        console.log(result);
        location.replace('/inicioSesion')
    })
})

