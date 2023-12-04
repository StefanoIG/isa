// Función para validar el correo
export function validarCorreo() {
    const correoInput = document.getElementById("correo");
    const correoMensaje = document.getElementById("correoMensaje");

    // Expresión regular ajustada según los nuevos requisitos
    const correoPattern = /^[a-zA-Z][0-9]{10}@((live|est)\.)?uleam\.edu\.ec$/;

    if (!correoPattern.test(correoInput.value)) {
        correoMensaje.textContent = "Correo no válido";
        correoInput.classList.add("is-invalid");
        return false;
    } else {
        correoMensaje.textContent = "";
        correoInput.classList.remove("is-invalid");
        return true;
    }
}


  // Función para validar la contraseña
  export function validarPassword() {
    const passwordInput = document.getElementById("Password");
    const passwordMensaje = document.getElementById("MensajePass");

    if (passwordInput.value.length < 8) {
      passwordMensaje.textContent = "La contraseña debe tener al menos 8 caracteres";
      passwordInput.classList.add("is-invalid");
      return false;
    } else {
      passwordMensaje.textContent = "";
      passwordInput.classList.remove("is-invalid");
      return true;
    }
  }

  // Función para validar la repetición de contraseña
  export function validarRepetirPassword() {
    const passwordInput = document.getElementById("Password");
    const repeatPasswordInput = document.getElementById("RepeatPassword");
    const mensajeConfirmacion = document.getElementById("MensajeConfirmacion");

    if (passwordInput.value !== repeatPasswordInput.value) {
      mensajeConfirmacion.textContent = "Las contraseñas no coinciden";
      repeatPasswordInput.classList.add("is-invalid");
      return false;
    } else {
      mensajeConfirmacion.textContent = "";
      repeatPasswordInput.classList.remove("is-invalid");
      return true;
    }
  }
  //validar solo letras
  export function validarTexto(input) {
    const errorMensaje = input.nextElementSibling; // Obtiene el elemento p que mostrará el mensaje de error
  
    // Expresión regular que coincide con cualquier carácter que no sea una letra o espacio
    const regex = /[^a-zA-Z\s]/g;
  
    // Comprueba si el valor del input contiene algún carácter no permitido
    if (regex.test(input.value)) {
      errorMensaje.textContent = "Solo se permiten letras.";
      input.value = input.value.replace(regex, ''); // Elimina los caracteres no deseados
      return false;
    } else {
    
      errorMensaje.textContent = ""; // Limpia el mensaje de error si todo está bien
      return true;
    }
  }



  // Función para validar un número de teléfono
export function validarTelefono() {
    const phoneRegex = /^\d{10}$/; // Se asume que el número debe contener exactamente 10 dígitos
    const telefonoInput = document.getElementById("telefono");
    const resultadoTelefono = document.getElementById("resultadoTelefono");
    
    if (!phoneRegex.test(telefonoInput.value.replace(/\D/g, ''))) {
        resultadoTelefono.textContent = "El número de teléfono no es válido. Debe contener 10 dígitos.";
        return false;
    }
        resultadoTelefono.textContent="";
    return true;
  }

  // Validación de una cédula personalizada
  export function validarCedula() {
    const cedulaPersonalizada = document.getElementById("cedula").value;
    const mensajeCedulaPersonalizada = document.getElementById("MensajeCedula");
    
    if (cedulaPersonalizada.length !== 10) {
      mensajeCedulaPersonalizada.textContent = "La cédula debe tener 10 dígitos.";
      return false;
    }
  
    if (!/^[0-9]+$/.test(cedulaPersonalizada)) {
      mensajeCedulaPersonalizada.textContent = "La cédula debe contener solo números.";
      return false;
    }
  
    const provincia = Number(cedulaPersonalizada.substring(0, 2));
    if (provincia < 1 || provincia > 24) {
      mensajeCedulaPersonalizada.textContent = "El primer número de la cédula debe estar entre 1 y 24.";
      return false;
    }
  
    const coeficientesCedula = [2, 1, 2, 1, 2, 1, 2, 1, 2];
    const digitoVerificadorCedula = Number(cedulaPersonalizada[9]);
  
    let sumaCedula = 0;
    for (let i = 0; i < 9; i++) {
      let valorCedula = Number(cedulaPersonalizada[i]) * coeficientesCedula[i];
      if (valorCedula > 9) {
        valorCedula -= 9;
      }
      sumaCedula += valorCedula;
    }
  
    const totalCedula = (Math.ceil(sumaCedula / 10) * 10);
    const digitoVerificadorCalculadoCedula = totalCedula - sumaCedula;
  
    if (digitoVerificadorCalculadoCedula === 10) {
      if (digitoVerificadorCedula !== 0) {
        mensajeCedulaPersonalizada.textContent = "La cédula es inválida.";
        return false;
      }
    } else {
      if (digitoVerificadorCedula !== digitoVerificadorCalculadoCedula) {
        mensajeCedulaPersonalizada.textContent = "La cédula es inválida.";
        return false;
      }
    }
  
    mensajeCedulaPersonalizada.textContent = "";
    return true;
  }