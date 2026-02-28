//referenciación a los elementos del DOM
const formulario = document.getElementById('formulario-registro');
const password = document.getElementById('contraseña');
const seguridad = document.getElementById('nivelseguridad');
const usuario = document.getElementById('nombreusuario');
const correoElectronico = document.getElementById('correo');

//Medidor de nivel de seguridad de la contraseña en tiempo real
//En el addEventListener se ejecuta cada vez que el usuario ingresa un caracter en el campo de 
// contraseña, se evalúa la fortaleza de la contraseña y se actualiza el indicador de seguridad en consecuencia.
password.addEventListener('input', () => {
    const valor = password.value;
    let fortaleza = 0;

    // Se valida en el primer if la longitud de la contraseña 
    // En el segundo if se valida si contiene letras mayúsculas, minúsculas, números y caracteres especiales
    //El tecer if valida se la contraseña contiene números
    if (valor.length >= 5) fortaleza +=30;
    if (valor.match(/[A-Z]/)) fortaleza += 30;
    if (valor.match(/[0-9]/)) fortaleza += 40;

    // se cambio el tamaño (ancho) de la barra o div (en CSS)
    seguridad.style.width = fortaleza + '%';

    //cambio de color (de div) dependiendo del nivel de seguridad
    if(fortaleza <= 40) seguridad.style.background = '#ef4444';
    else if (fortaleza <= 70) seguridad.style.background = '#f59e0b';
    else seguridad.style.background = '#22c55e';
});
// validación al enviar, este listerner se dispara o ejecuta cuanda se hace click

formulario.addEventListener('submit', (e) => {
    e.preventDefault(); // Evita el envío del formulario para realizar validaciones personalizadas

    //Esta función revisa internamente si el formulario es válido utilizando el método checkValidity()
    //  que verifica si todos los campos cumplen con sus restricciones de validación.
    if (formulario.checkValidity()) {
        const datosUsuario = {
            nombreusuario: usuario.value,
            Email: correoElectronico.value,
            password: password.value,
            fecha: new Date().toLocaleDateString() // Agrega la fecha actual en formato local
        };

        localStorage.setItem('datosUsuario', JSON.stringify(datosUsuario)); // Guarda los datos en localStorage como una cadena JSON
        alert('Registro exitoso');
        console.log(`Datos en LocalStorage:`, JSON.parse(localStorage.getItem('datosUsuario')));

        formulario.reset(); // Limpia el formulario después del registro
        seguridad.style.width = '0%'; 
    } else{
        alert('Por favor, completa el formulario correctamente.');

    }
    
    
});



