let registerBtn = document.getElementById('registrar')
registerBtn.addEventListener('click', e=>{
    e.preventDefault()
    let enviarObj = {}
    let formu = document.getElementById('registroUser')
    let datos = new FormData(formu)
    datos.forEach((value,key)=>enviarObj[key]=value)
    fetch('/api/usuario/registrar',{
        method:'POST',
        body:JSON.stringify(enviarObj),
        headers:{
            'Content-Type':'application/json'
        }
    }).then(result=>result.json()).then(json=>{
        if(json.status==='Error'){
            console.log(json.error);
        }else{
            console.log(json.payload);
        }
    })
})