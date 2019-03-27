const {
    io
} = require('../server')

// Requerimos la Clase Usuarios y hacemos una nueva instancia
const {
    Usuarios
} = require('../classes/Usuarios')
const usuarios = new Usuarios()

// Requerimos las funciones
const {
    crearMensaje
} = require('../functions/function')

// Escuchamos la conexión
io.on('connection', client => {

    // Escuchamos mediante el cliente, el evento de entrar al chat
    client.on('entrarChat', (user, cll) => {
        if (!user.nombre || !user.sala) {
            return cll({
                error: true,
                mensaje: 'El nombre/sala es necesario'
            })
        }

        client.join(user.sala)

        // Agregamos la persona conectada a el arreglo
        usuarios.addPersona(client.id, user.nombre, user.sala)

        // Emitimos a todos las personas conectadas a el momento de ingresar 
        client.broadcast.to(user.sala).emit('listaPersonas', usuarios.getPersonaPorSala(user.sala))

        // Mandamos las persona
        cll(usuarios.getPersonaPorSala(user.sala))
    })

    // Escuchamos un mensaje para todos los usuarios
    client.on('crearMensaje', data => {
        let persona = usuarios.getPersona(client.id)

        let mensaje = crearMensaje(persona.nombre, data.mensaje)
        client.broadcast.join(persona.sala).emit('crearMensaje', mensaje)
    })

    // Escuchamos mediante el cliente, el evento de desconectar
    // Obtenemos la persona con la clase Usuarios y mandamos un mensaje a el cliente
    client.on('disconnect', () => {
        let personaEliminada = usuarios.deletePersona(client.id)

        client.broadcast.to(personaEliminada.sala).emit('crearMensaje', crearMensaje('Administrador', `${personaEliminada.nombre} abandonó el Chat`))

        client.broadcast.to(personaEliminada.sala).emit('listaPersonas', usuarios.getPersonaPorSala(personaEliminada.sala))
    })

    // Mensaje privado
    client.on('mensajePrivado', data => {
        let persona = usuarios.getPersona(client.id)
        client.broadcast.to(data.para).emit('crearMensaje', crearMensaje(persona.nombre, data.mensaje))
    })
})