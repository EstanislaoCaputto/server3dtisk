const socket = io();

let input = document.getElementById('mensaje');
let user = document.getElementById('usuario');
input.addEventListener('keyup', (e)=>{
    if(e.key==='Enter'){
        socket.emit('mensj', {usuario:user.value, mensajes:e.target.value})
    }
})
socket.on('mensajeLog', data =>{
    console.log(data);
    let p = document.getElementById('log');
    let todosMensj = `<p>${data.usuario} dice: ${data.mensajes}</p>`
    p.innerHTML = todosMensj
})