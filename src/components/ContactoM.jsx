import { Link } from 'react-router-dom';
import './css/Contacto.css'
import logouleam from './imagenes/logouleam.png'

function Contacto() {
    const handleSubmit = (event) => {
        event.preventDefault();

        const nombre = document.getElementById("nombre").value;
        const correo = document.getElementById("correo").value;
        const comentario = document.getElementById("comentario").value;

        if (nombre === "" || correo === "" || comentario === "") {
            alert("Por favor, complete todos los campos.");
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
                            <li><Link to='/Main'>Inicio</Link></li>
                            <li><Link to='/ContactoM'>Contáctanos</Link></li>
                            <li><Link to='/'>Cerrar Sesion</Link></li>
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
                            <label htmlFor="nombre">Nombre:</label>
                            <input type="text" id="nombre" name="nombre" required />
                            <label htmlFor="correo">Correo Electrónico:</label>
                            <input type="email" id="correo" name="correo" required />
                            <label htmlFor="comentario">Comentario:</label>
                            <textarea id="comentario" name="comentario" rows="4" required></textarea>
                            <button type="submit">Enviar</button>
                        </form>
                    </div>
                </div>
            </section>
        </div>
    );
}

export default Contacto;
