import { BrowserRouter, Link } from 'react-router-dom';
import './css/Home.css'
import logouleam from './imagenes/logouleam.png'
import fondo from './imagenes/fondo.jpg'

function Home() {
    const backgroundStyle = {
        backgroundImage: `url(${fondo})`,
        backgroundSize: 'cover', // Para que la imagen cubra todo el elemento
        backgroundRepeat: 'no-repeat', // Para evitar la repetición de la imagen
        backgroundPosition: 'center', // Para centrar la imagen horizontal y verticalmente
    };
    return (
        <div className='inicio' style={backgroundStyle}>
            <header>
                <div className="logo2">
                    <img src={logouleam} alt="Logo de la Universidad" />
                </div>
                <nav>
                    <ul>
                        <li><Link to='/'>Inicio</Link></li>
                        <li><Link to='/Registro'>Registro </Link></li>
                        <li><Link to='/Login'>Iniciar Sesión</Link></li>
                        <li><Link to='/Contacto'>Contáctanos</Link></li>
                    </ul>
                </nav>
            </header>
            <section className="hero">
                <div className="container">
                    <div className="feature">
                        <h2>Bienvenidos</h2>
                        <p>Biblioteca Virtual ULEAM.</p>
                        <a href="#" className="button">Más información</a>
                    </div>
                    <div className="feature">
                        <h2>Conócenos un poco más</h2>
                        <p>ULEAM tu futuro educativo en buenas manos.</p>
                        <a href="#" className="button">Explorar</a>
                    </div>
                </div>
            </section>
        </div>
    );
}

export default Home;
