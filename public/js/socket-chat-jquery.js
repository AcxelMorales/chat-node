var params = new URLSearchParams(window.location.search);

var usuarios = $('#divUsuarios')
var form = $('#enviar')
var txt = $('#mensaje')
var chat = $('#divChatbox')

function renderizarUsers(users) {
    console.log(users)

    let html = ''

    html += `
        <li>
            <a href="javascript:void(0)" class="active"> Chat de <span>${params.get('sala')}</span></a>
        </li>
    `

    for (var i = 0; i < users.length; i++) {
        html += `
            <li>
                <a data-id="${users[i].id}" href="javascript:void(0)"><img src="assets/images/users/1.jpg" alt="user-img" class="img-circle"> <span>${users[i].nombre} <small class="text-success">online</small></span></a>
            </li>
        `
    }

    usuarios.html(html)
}

function renderizarMensaje(mensaje, yo) {
    var fecha = new Date(mensaje.fecha)
    var hora = `${fecha.getHours()}:${fecha.getMinutes()}`
    var adminClass = 'info'

    if (mensaje.nombre === 'Administrador') {
        adminClass = 'danger'
    }

    var html = ''

    if (yo) {
        html += `
        <li class="reverse">
        <div class="chat-content">
            <h5>${mensaje.nombre}</h5>
            <div class="box bg-light-inverse">${mensaje.mensaje}</div>
        </div>
        <div class="chat-img">
            <img src="assets/images/users/1.jpg" alt="user" />
        </div>
        <div class="chat-time">${hora}</div>
        </li>
        `
    } else {
        html += `
        <li class="animated fadeIn">
        <div class="chat-img">
            <img src="assets/images/users/1.jpg" alt="user" />
        </div>
        <div class="chat-content">
            <h5>${mensaje.nombre}</h5>
            <div class="box bg-light-${adminClass}">${mensaje.mensaje}</div>
        </div>
        <div class="chat-time">${hora}</div>
        </li>
        `
    }

    chat.append(html)
}

function scrollBottom() {

    // selectors
    var newMessage = divChatbox.children('li:last-child');

    // heights
    var clientHeight = divChatbox.prop('clientHeight');
    var scrollTop = divChatbox.prop('scrollTop');
    var scrollHeight = divChatbox.prop('scrollHeight');
    var newMessageHeight = newMessage.innerHeight();
    var lastMessageHeight = newMessage.prev().innerHeight() || 0;

    if (clientHeight + scrollTop + newMessageHeight + lastMessageHeight >= scrollHeight) {
        divChatbox.scrollTop(scrollHeight);
    }
}

usuarios.on('click', 'a', function () {
    var id = $(this).data('id')
    if (id) console.log(id)
})

form.on('submit', function (e) {
    e.preventDefault()

    if (txt.val().trim().length === 0) return

    // Enviar información
    socket.emit('crearMensaje', {
        nombre: params.get('nombre'),
        mensaje: txt.val()
    }, function (mensaje) {
        txt.val(null).focus()
        renderizarMensaje(mensaje, true)
    })
})