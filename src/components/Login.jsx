import './css/Login.css';
import logouleam from './imagenes/logouleam.png';
import { Link, useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';
import fondo from './imagenes/fondo.jpg'

function Login() {
    const backgroundStyle = {
        backgroundImage: `url(${fondo})`,
        backgroundSize: 'cover', // Para que la imagen cubra todo el elemento
        backgroundRepeat: 'no-repeat', // Para evitar la repetición de la imagen
        backgroundPosition: 'center', // Para centrar la imagen horizontal y verticalmente

    };
    const navigate = useNavigate();

    // Configuración para el toast de SweetAlert2
    const Toast = Swal.mixin({
        toast: true,
        position: 'top-end',
        showConfirmButton: false,
        timer: 3000,
        timerProgressBar: true,
        didOpen: (toast) => {
            toast.addEventListener('mouseenter', Swal.stopTimer);
            toast.addEventListener('mouseleave', Swal.resumeTimer);
        }
    });
    

    const handleSubmit = (event) => {
        event.preventDefault();

        const correo = document.getElementById("correo").value;
        const contrasena = document.getElementById("contrasena").value;

        if (correo === "" || contrasena === "") {
            Toast.fire({
                icon: 'error',
                title: 'Por favor, rellena todos los campos.'
            });
            return;
        }

        // Obtener los datos de los usuarios del localStorage
        const datosRegistrados = JSON.parse(localStorage.getItem('usuariosRegistrados')) || { usuarios: [] };
        const usuarioEncontrado = datosRegistrados.usuarios.find(usuario => usuario.correo === correo && usuario.contrasena === contrasena);

        if (usuarioEncontrado) {
            localStorage.setItem('Inloged', 'true');
            Toast.fire({
                icon: 'success',
                title: 'Inicio de sesión exitoso'
            }).then(() => {
                navigate('/Main'); // Redirecciona al usuario al área principal
            });
        } else {
            Toast.fire({
                icon: 'error',
                title: 'Correo electrónico o contraseña incorrecta.'
            });
        }
        
        
    };


    return (
        <div className="login" style={backgroundStyle}>
            <header>
                <div className="logo3">
                    <img src={logouleam} alt="Logo de la Universidad" />
                </div>
                <nav>
                    <ul>
                        <li><Link to='/'>Inicio</Link></li>
                        <li><Link to='/Registro'>Registro</Link></li>
                        <li><Link to='/Login'>Iniciar Sesión</Link></li>
                        <li><Link to='/Contacto'>Contáctanos</Link></li>
                    </ul>
                </nav>
            </header>
            <section>
                <div className="container login-container">
                    <h2 className="login-title">Iniciar Sesión</h2>
                    <form onSubmit={handleSubmit} className="login-form">
                        <div className="form-group">
                            <label htmlFor="correo" className="form-label">Correo Institucional:</label>
                            <input type="email" id="correo" name="correo" required className="form-input" />
                        </div>
                        <div className="form-group">
                            <label htmlFor="contrasena" className="form-label">Contraseña:</label>
                            <input type="password" id="contrasena" name="contrasena" required className="form-input" />
                        </div>
                        <div className="form-group">
                            <button type="submit" className="login-button">Ingresar</button>
                        </div>
                    </form>
                </div>
            </section>
        </div>
    );
}

export default Login;
