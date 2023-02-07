let baseUrl = "http://localhost:8080";
let socket = io.connect(baseUrl, {
    'forceNew': true,
    transport: ["polling"]
});

socket.on('mensajes', function (msjs) {
    document.querySelector('#messages').innerHTML = msjs.map(msj => `<strong>Usuario: ${msj.mensaje.email}</strong> -> Mensaje: ${msj.mensaje.texto}`).join('<br>')
});

const addMessage = () => {
    const data = {
        email: document.getElementById("email").value,
        texto: document.getElementById("texto").value
    }
    socket.emit('mensaje', data);
    fetch(baseUrl + '/api/messages/', {
        method: "POST",
        body: JSON.stringify(data),
        headers: {
            "Content-Type": 'application/json; charset=UTF-8'
        }
    }).then(res => { })
}