import { BrowserRouter, Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';

import React, { useState } from 'react';
import './css/Registro.css'
import logouleam from './imagenes/logouleam.png'
import fondo from './imagenes/fondo.jpg'
import Swal from 'sweetalert2';
import { validarCorreo, validarPassword, validarRepetirPassword, validarCedula, validarTelefono, validarTexto } from '../validaciones';

function Registro() {


    const validarDatos = (nombre, apellidos, cedula, telefono, correo, contrasena, confirmarContrasena, facultad) => {
        // Asegúrate de que cada función de validación devuelva true o false
        if (!validarCedula(cedula) || !validarTelefono(telefono) || !validarCorreo(correo) ||
            !validarPassword(contrasena) || contrasena !== confirmarContrasena ||
            nombre === "" || apellidos === "" || cedula === "" || telefono === "" || correo === "" || facultad === "" || contrasena === "") {
            return false;
        }
        return true;
    };


    const backgroundStyle = {
        backgroundImage: `url(${fondo})`,
        backgroundSize: 'cover', // Para que la imagen cubra todo el elemento
        backgroundRepeat: 'no-repeat', // Para evitar la repetición de la imagen
        backgroundPosition: 'center', // Para centrar la imagen horizontal y verticalmente
    };

    const handleInputChange = (event) => {
        validarTexto(event.target); // Llama a validarTexto cada vez que el contenido del input cambia
    };
    const navigate = useNavigate();



   

    const handleSubmit = (event) => {
        event.preventDefault();
        const nombre = document.getElementById("nombre").value;
        const apellidos = document.getElementById("apellidos").value;
        const cedula = document.getElementById("cedula").value;
        const telefono = document.getElementById("telefono").value;
        const correo = document.getElementById("correo").value;
        const facultad = document.getElementById("facultad").value;
        const contrasena = document.getElementById("Password").value;
        const confirmarContrasena = document.getElementById("RepeatPassword").value;

        if (!validarDatos(nombre, apellidos, cedula, telefono, correo, contrasena, confirmarContrasena, facultad)) {
            // Mostrar mensaje de error
            Toast.fire({
                icon: "error",
                title: "Hay errores en el formulario."
            });
            return;
        }
        

        const Toast = Swal.mixin({
            toast: true,
            position: "top-end",
            showConfirmButton: false,
            timer: 3000,
            timerProgressBar: true,
            didOpen: (toast) => {
                toast.onmouseenter = Swal.stopTimer;
                toast.onmouseleave = Swal.resumeTimer;
            }
        });

        

        if (nombre === "" || apellidos === "" || cedula === "" || telefono === "" || correo === "" || facultad === "" || contrasena === "" || confirmarContrasena === "") {
           Toast.fire({
            icon: "error",
            title: "Rellene todos los datos."
            });
            return;
        }



    // Obtener usuarios registrados del localStorage
    const datosRegistrados = JSON.parse(localStorage.getItem('usuariosRegistrados')) || { usuarios: [] };
    const usuariosRegistrados = datosRegistrados.usuarios;

    // Verificar si el correo o la cédula ya están registrados
    const existeCorreo = usuariosRegistrados.some(usuario => usuario.correo === correo);
    const existeCedula = usuariosRegistrados.some(usuario => usuario.cedula === cedula);

   

    if (existeCorreo) {
        Toast.fire({
            icon: "error",
            title: "El correo electrónico ya está registrado."
        });
        return;
    }

    if (existeCedula) {
        Toast.fire({
            icon: "error",
            title: "La cédula ya está registrada."
        });
        return;
    }


    // Crear objeto de usuario
    const nuevoUsuario = {
        nombre,
        apellidos,
        cedula,
        telefono,
        correo,
        facultad,
        contrasena,
    };

    // Agregar el nuevo usuario a la lista de usuarios registrados
    usuariosRegistrados.push(nuevoUsuario);

    // Guardar la lista actualizada en localStorage
    localStorage.setItem('usuariosRegistrados', JSON.stringify({ usuarios: usuariosRegistrados }));

    Toast.fire({
        icon: "success",
        title: "Registro exitoso"
    }).then(() => {
        navigate('/login'); // Redirecciona al usuario al inicio de sesión
    });
};


    return (
        <div className="registro"  style={backgroundStyle}>
            <header>
                <div className="logo">
                    <img src={logouleam} alt="Logo de la Universidad" />
                </div>
                <nav>
                    <ul>
                        <li><Link to='/'>Inicio</Link></li>
                        <li><Link to='/Login'>Iniciar Sesión</Link></li>
                        <li><Link to='/Contacto'>Contáctanos</Link></li>
                    </ul>
                </nav>
            </header>

            <section>
                <div className="container">
                    <h1>Registro de Usuario</h1>
                    <div className="form-container">
                        <form onSubmit={handleSubmit}>
                             <div className="form-group">
                                <label htmlFor="nombre">Nombre:</label>
                                <input type="text" id="nombre" name="nombre" required onChange={handleInputChange} />
                                <p className="error-mensaje"></p> {/* Mensaje de error para el nombre */}
                            </div>
                             <div className="form-group">
                                <label htmlFor="apellidos">Apellidos:</label>
                                <input type="text" id="apellidos" name="apellidos" required onChange={handleInputChange} />
                                <p className="error-mensaje"></p> {/* Mensaje de error para los apellidos */}
                            </div>

                            <div className="form-group">
                                <label htmlFor="cedula">Cédula:</label>
                                <input type="number" id="cedula" name="cedula" required onBlur={validarCedula} />
                                <div id="MensajeCedula"></div> {/* Mensaje de error */}
                            </div>

                            <div className="form-group">
                                <label htmlFor="telefono">Número de Teléfono:</label>
                                <input type="number" id="telefono" name="telefono" required onBlur={validarTelefono} />
                                <div id="resultadoTelefono"></div> {/* Mensaje de error */}

                            </div>

                            <div className="form-group">
                                <label htmlFor="correo">Correo Institucional:</label>
                                <input type="email" id="correo" name="correo" required onBlur={validarCorreo} />
                                <div id="correoMensaje"></div> {/* Mensaje de error */}
                            </div>

                            <div className="form-group">
                            <label htmlFor="facultad">Facultad a la que Pertenece:</label>
                                <select id="facultad" name="facultad" required>
                                    <option value="">Selecciona una facultad</option>
                                    <option value="FACULTAD CIENCIAS DE LA SALUD">FACULTAD CIENCIAS DE LA SALUD</option>
                                    <option value="FACULTAD CIENCIAS ADMINISTRATIVAS, CONTABLES Y COMERCIO">FACULTAD CIENCIAS ADMINISTRATIVAS, CONTABLES Y COMERCIO</option>
                                    <option value="FACULTAD DE EDUCACIÓN TURISMO ARTES Y HUMANIDADES">FACULTAD DE EDUCACIÓN TURISMO ARTES Y HUMANIDADES</option>
                                    <option value="FACULTAD INGENIERÍA, INDUSTRIA Y ARQUITECTURA">FACULTAD INGENIERÍA, INDUSTRIA Y ARQUITECTURA</option>
                                    <option value="FACULTAD CIENCIAS DE LA VIDA Y TECNOLOGÍAS">FACULTAD CIENCIAS DE LA VIDA Y TECNOLOGÍAS</option>
                                    <option value="FACULTAD DE CIENCIAS SOCIALES DERECHO Y BIENESTAR">FACULTAD DE CIENCIAS SOCIALES DERECHO Y BIENESTAR</option>
                                    <option value="EXTENSIÓN SUCRE">EXTENSIÓN SUCRE</option>
                                    <option value="EXTENSIÓN CHONE">EXTENSIÓN CHONE</option>
                                    <option value="EXTENSIÓN EL CARMEN">EXTENSIÓN EL CARMEN</option>
                                    <option value="EXTENSIÓN PEDERNALES">EXTENSIÓN PEDERNALES</option>
                                    <option value="CAMPUS PICHINCHA">CAMPUS PICHINCHA</option>
                                    <option value="PARALELO FLAVIO ALFARO">PARALELO FLAVIO ALFARO</option>
                                    <option value="SEDE SANTO DOMINGO">SEDE SANTO DOMINGO</option>
                                    <option value="CAMPUS TOSAGUA">CAMPUS TOSAGUA</option>
                                </select>

                            </div>

                            <div className="form-group">
                                <label htmlFor="contrasena">Contraseña:</label>
                                <input type="password" id="Password" name="contrasena" required onBlur={validarPassword} />
                                <div id="MensajePass"></div> {/* Mensaje de error */}
                            </div>

                            <div className="form-group">
                                <label htmlFor="confirmar-contrasena">Confirmar Contraseña:</label>
                                <input type="password" id="RepeatPassword" name="confirmar-contrasena" required onBlur={validarRepetirPassword} />
                                <div id="MensajeConfirmacion"></div> {/* Mensaje de error */}
                            </div>
                            <div className="form-group">
                                <button type="submit">Registar</button>
                            </div>
                        </form>
                    </div>
                </div>
            </section>
        </div>
    );
}

export default Registro;
