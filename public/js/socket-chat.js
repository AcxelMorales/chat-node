let socket = io()

// Obtenemos los parametros de la URL
let params = new URLSearchParams(window.location.search)

// Hacemos la validación
if (!params.has('nombre') || !params.has('sala')) {
    window.location = 'index.html'
    throw new Error('El nombre y sala son necesarios')
}

// Creamos un objeto con el parametro
let usuario = {
    nombre: params.get('nombre'),
    sala: params.get('sala')
}

// Escuchamos la conexión de user
socket.on('connect', () => {
    console.log('Conectado al servidor')
    socket.emit('entrarChat', usuario, resp => {
        console.log('Usuarios conectados:', resp)
    })
})

// Escuchar información
socket.on('crearMensaje', mensaje => {
    console.log('Servidor:', mensaje)
})

// Escuchar cambios de usuario al entrar y salir del mismo
socket.on('listaPersonas', personas => {
    console.log(personas);
})

// Mensaje privado
socket.on('mensajePrivado', mensaje => {
    console.log('Mensaje Privado:', mensaje)
})

// Enviar información
// socket.emit('crearMensaje', {
//     usuario: 'Fernando',
//     mensaje: 'Hola Mundo'
// }, (resp) => {
//     console.log('respuesta server: ', resp)
// })

// // escuchar
// socket.on('disconnect', () => {
//     console.log('Perdimos conexión con el servidor')
// })