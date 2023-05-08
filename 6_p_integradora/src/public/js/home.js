const socket = io();

/* socket.on('log', data=>{
    console.log(data);
})

socket.emit('message', 'Nuevo ingreso'); */


const input = document.getElementById('textbox');
const email = document.getElementById('useremail');

/* input.addEventListener('keyup', evt =>{
    let {key} = evt;
    evt.target.value = '';
    socket.emit('message1', key)
})
socket.on('log',data=>{
    log.innerHTML += data;
}) */

input.addEventListener('keyup', evt =>{
    if(evt.key === 'Enter'){
        let messageToSend = {
            user: email.value,
            message: input.value
        }
        socket.emit('message2',messageToSend)
        input.value = '';
    }
})

socket.on('log',data=>{

    let logs = '';

    data.logs.forEach(log => {
    logs +=   `${ log.user } dice: ${ log.message} <br/>`      
    });
    log.innerHTML = logs;    
})