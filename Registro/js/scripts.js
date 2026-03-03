// Referenciación a los elementos del DOM
const formulario = document.getElementById('formulario-registro');
const usuario = document.getElementById('nombreusuario');
const correoElectronico = document.getElementById('correo');
const password = document.getElementById('contraseña');
const confirmarContrasena = document.getElementById('confirmarcontraseña'); 
const seguridad = document.getElementById('nivelseguridad');
const verContraseña = document.getElementById('ver-contraseña');
const mostrarContraseña = document.getElementById('mostrar-contraseña');

// Vistas
const vistaRegistro = document.getElementById('vista-registro');
const vistaLogin = document.getElementById('vista-login');

// Enlaces de navegación
const irLogin = document.getElementById('ir-login');
const irRegistro = document.getElementById('ir-registro');

// Formulario y campos del login
const formularioLogin = document.getElementById('formulario-login');
const loginCorreo = document.getElementById('login-correo');
const loginPassword = document.getElementById('login-password');
const mensajeLogin = document.getElementById('mensaje-login'); 


// Referencia al span de error del campo confirmar contraseña
// Es el segundo .mensaje-error de la página, por eso usamos querySelectorAll y tomamos el índice [3]
// Más fácil: agrégale un id en el HTML, por ejemplo id="error-confirmacion"
const errorConfirmacion = confirmarContrasena.nextElementSibling;


// ─── Medidor de fortaleza de contraseña ───────────────────────────────────────
password.addEventListener('input', () => {
    const valor = password.value;
    let fortaleza = 0;

    if (valor.length >= 5) fortaleza += 30;
    if (valor.match(/[A-Z]/)) fortaleza += 30;
    if (valor.match(/[0-9]/)) fortaleza += 40;

    seguridad.style.width = fortaleza + '%';

    if (fortaleza <= 40) seguridad.style.background = '#ef4444';
    else if (fortaleza <= 70) seguridad.style.background = '#f59e0b';
    else seguridad.style.background = '#22c55e';

    // Si el usuario ya había empezado a escribir en confirmar, re-validar
    if (confirmarContrasena.value !== '') {
        validarCoincidencia();
    }
});


// ─── Validación de la confirmación de contraseña ────────────────────────────────
function validarCoincidencia() {
    if (confirmarContrasena.value === '') {
        errorConfirmacion.style.display = 'none';
        confirmarContrasena.style.borderColor = 'transparent';
        return;
    }

    if (password.value !== confirmarContrasena.value) {
        errorConfirmacion.style.display = 'block';
        confirmarContrasena.style.borderColor = 'var(--color-error)';
    } else {
        errorConfirmacion.style.display = 'none';
        confirmarContrasena.style.borderColor = 'var(--color-exitoso)';
    }
}


confirmarContrasena.addEventListener('input', validarCoincidencia);


// ─── Envío del formulario ─────────────────────────────────────────────────────
formulario.addEventListener('submit', (e) => {
    e.preventDefault();

    // Verificar que las contraseñas coincidan 
    if (password.value !== confirmarContrasena.value) {
        validarCoincidencia(); // Muestra el error visualmente
        alert('Las contraseñas no coinciden.');
        return;
    }

    if (formulario.checkValidity()) {
        const datosUsuario = {
            nombreusuario: usuario.value,
            email: correoElectronico.value,
            password: password.value,
            fecha: new Date().toLocaleDateString()
        };

        // Guardar como arreglo para soportar múltiples usuarios
        const existentes = JSON.parse(localStorage.getItem('usuariosRegistrados')) || [];
        existentes.push(datosUsuario);
        localStorage.setItem('usuariosRegistrados', JSON.stringify(existentes));

        alert('¡Registro exitoso! Datos guardados.');
        console.log('Usuarios en LocalStorage:', JSON.parse(localStorage.getItem('usuariosRegistrados')));

        formulario.reset();
        seguridad.style.width = '0%';
        errorConfirmacion.style.display = 'none';
        confirmarContrasena.style.borderColor = 'transparent';

    } else {
        alert('Por favor, completa el formulario correctamente.');
    }
});


// ─── mostrar/ocultar contraseña ───────────────────────────────────────
verContraseña.addEventListener('change', () => {
    password.type = verContraseña.checked ? 'text' : 'password';
});

mostrarContraseña.addEventListener('change', () => {
    confirmarContrasena.type = mostrarContraseña.checked ? 'text' : 'password';
});

// ─── Navegación entre vistas ─────────────────────────────────────────
irLogin.addEventListener('click', () => {
    vistaRegistro.style.display = 'none';
    vistaLogin.style.display = 'block';
});
irRegistro.addEventListener('click', () => {
    vistaLogin.style.display = 'none';
    vistaRegistro.style.display = 'block';
});

// ─── Validación del formulario de login ─────────────────────────────────────────
formularioLogin.addEventListener('submit', (e) => {
    e.preventDefault();
    const email = loginCorreo.value;
    const password = loginPassword.value;
    const usuarios = JSON.parse(localStorage.getItem('usuariosRegistrados')) || [];

    const usuarioEncontrado = usuarios.find(u => u.email === email && u.password === password);
    if (usuarioEncontrado) {
        mensajeLogin.textContent = `¡Bienvenido, ${usuarioEncontrado.nombreusuario}!`;
        mensajeLogin.style.color = 'var(--color-exitoso)';
    } else {
        mensajeLogin.textContent = 'Correo o contraseña incorrectos.';
        mensajeLogin.style.color = 'var(--color-error)';
    }
    });