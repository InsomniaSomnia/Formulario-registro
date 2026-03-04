#  Formulario de Registro 

> Proyecto de formulario web desarrollado con HTML, CSS y JavaScript puro. Permite registrar usuarios con validación en tiempo real, almacenamiento local y autenticación mediante inicio de sesión.

[![HTML5](https://img.shields.io/badge/HTML5-E34F26?style=flat&logo=html5&logoColor=white)](https://developer.mozilla.org/en-US/docs/Web/HTML)
[![CSS3](https://img.shields.io/badge/CSS3-1572B6?style=flat&logo=css3&logoColor=white)](https://developer.mozilla.org/en-US/docs/Web/CSS)
[![JavaScript](https://img.shields.io/badge/JavaScript-F7DF1E?style=flat&logo=javascript&logoColor=black)](https://developer.mozilla.org/en-US/docs/Web/JavaScript)
---

##  Funcionalidades

- **Registro de usuarios** con validación de nombre, correo y contraseña
- **Medidor de fortaleza** de contraseña en tiempo real
- **Confirmación de contraseña** con validación visual instantánea
- **Mostrar / ocultar contraseña** mediante checkbox en ambos campos
- **Almacenamiento múltiple** de usuarios en `localStorage`
- **Inicio de sesión** con autenticación contra los usuarios registrados

---

##  Arquitectura del proyecto

```
formulario-registro/
├── index.html
├── css/
│   └── styles.css
├── js/
│   └── scripts.js
└── img/
    └── background.jpg
```

---

##  Tecnologías utilizadas

| Tecnología | Uso |
|---|---|
| HTML5 | Estructura semántica del formulario |
| CSS3 | Estilos, animaciones y fondo difuminado |
| JavaScript | Validaciones, localStorage y toggle de vistas |

---

##  Detalles técnicos

### Validaciones del formulario de registro

- **Nombre de usuario:** mínimo 4 caracteres
- **Correo electrónico:** formato válido con `type="email"`
- **Contraseña:** mínimo 8 caracteres, debe incluir letras y números (validado con expresión regular)
- **Confirmar contraseña:** se compara en tiempo real contra el campo de contraseña

### Almacenamiento en localStorage

Los usuarios se guardan como un arreglo de objetos en la clave `usuariosRegistrados`. Cada objeto contiene:

```json
{
  "nombreusuario": "Pedro",
  "email": "pedro@correo.com",
  "password": "Abc12345",
  "fecha": "3/3/2026"
}
```

Para ver los usuarios guardados, abre la consola del navegador (`F12`) y escribe:
```javascript
JSON.parse(localStorage.getItem('usuariosRegistrados'))
```

### Inicio de sesión

La autenticación busca en el arreglo del `localStorage` un usuario cuyo correo y contraseña coincidan con los ingresados. Si el usuario no existe o la contraseña es incorrecta, se muestra un mensaje de error.

---

##  Autor

Jorman R. Torres Pertuz 
