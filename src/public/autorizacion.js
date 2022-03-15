fetch('/currentUser', {
    method:'GET',
    headers:{
        authorization:localStorage.getItem('token')
    }
}).then(result=>{
    if(result.status===401||result.status===403) {
        location.replace('/login')
        console.log(result.status)

    }else{
        console.log(result.status);
        location.replace('/demoFront')
    }
}).catch(error=>{
    console.log('me rompi'+error);
})