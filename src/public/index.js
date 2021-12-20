const socket = io();

let input = document.getElementById('mensaje');
let user = document.getElementById('usuario');
input.addEventListener('keyup', (e)=>{
    if(e.key==='Enter'){
        socket.emit('mensj', {usuario:user.value, mensajes:e.target.value})
    }
})

socket.on('mensajeLog', mensaje=>{
    console.log(mensaje);
    let div = document.getElementById('container-chat');
    let todosMensj = mensaje.map(chat=>{
        return `<p>${chat.usuario} dice: ${chat.mensajes}</p>`
    })
    div.innerHTML = todosMensj

})