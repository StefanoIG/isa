import { BrowserRouter, Link } from 'react-router-dom';
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './css/Contacto.css'
import logouleam from './imagenes/logouleam.png'
import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content';


function Contacto() {
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const navigate = useNavigate();
    const MySwal = withReactContent(Swal);

    useEffect(() => {
        // Verificar si el usuario está logueado
        const loggedIn = localStorage.getItem('Inloged') === 'true';
        setIsLoggedIn(loggedIn);
    }, []);

    const handleLogout = () => {
        MySwal.fire({
            title: '¿Estás seguro de que quieres cerrar sesión?',
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Sí, cerrar sesión'
        }).then((result) => {
            if (result.isConfirmed) {
                localStorage.removeItem('Inloged');
                setIsLoggedIn(false);
                navigate('/'); // Redirecciona a la página principal o de inicio de sesión
            }
        });
    };

    const handleSubmit = (event) => {
        event.preventDefault();

        const nombre = document.getElementById("nombre").value;
        const correo = document.getElementById("correo").value;
        const comentario = document.getElementById("comentario").value;

        if (nombre === "" || correo === "" || comentario === "") {
            MySwal.fire({
                toast: true,
                position: 'top-end',
                icon: 'error',
                title: 'Por favor, complete todos los campos.',
                showConfirmButton: false,
                timer: 3000
            });

        }
    };

    return (
        <div className="contacto">
        <header>
            <div className="top-bar">
                <div className="logo">
                    <img src={logouleam} alt="Logo de la Universidad" />
                </div>
                <nav>
                    <ul>
                        <li><Link to='/'>Inicio</Link></li>
                        {!isLoggedIn ? (
                            <>
                                <li><Link to='/Registro'>Registro de Usuario</Link></li>
                                <li><Link to='/Login'>Iniciar Sesión</Link></li>
                            </>
                        ) : (
                            <li><a onClick={handleLogout} style={{cursor: 'pointer'}}>Cerrar Sesión</a></li>
                        )}
                        <li><Link to='/Contacto'>Contáctanos</Link></li>
                    </ul>
                </nav>
            </div>
        </header>
            <section>
                <div className="container">
                    <h2>Contáctanos</h2>
                    <div className="contact-info">
                        <h3>Información de Contacto:</h3>
                        <p>Dirección: Circunvalación- Vía San Mateo, Manta, Manabí, Ecuador</p>
                        <p>Teléfono: (05) 2 623 046 - (05) 2 629 781</p>
                        <p>Correo Electrónico: contacto@uleam.edu.ec</p>
                    </div>
                    <div className="comments-box">
                        <h3>Preguntas o Comentarios</h3>
                        <form onSubmit={handleSubmit} className="comment-form">
                            <div className="form-group">
                                <label htmlFor="nombre" className="form-label">Nombre:</label>
                                <input type="text" id="nombre" name="nombre" className="form-input" required />
                            </div>
                            <div className="form-group">
                                <label htmlFor="correo" className="form-label">Correo Electrónico:</label>
                                <input type="email" id="correo" name="correo" className="form-input" required />
                            </div>
                            <div className="form-group">
                                <label htmlFor="comentario" className="form-label">Comentario:</label>
                                <textarea id="comentario" name="comentario" className="form-textarea" rows="4" required></textarea>
                            </div>
                            <button type="submit" className="form-button">Enviar</button>
                        </form>

                    </div>
                </div>
            </section>
        </div>
    );
}

export default Contacto;
