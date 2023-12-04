import { Link, useNavigate } from 'react-router-dom';
import './css/Busqueda.css'; // Asegúrate de importar tus estilos CSS
import logouleam from './imagenes/logouleam.png'
import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content';

function Busqueda() {
    const navigate = useNavigate();

    const MySwal = withReactContent(Swal);
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
                localStorage.removeItem('Inloged'); // Elimina el indicador de sesión
                navigate('/'); // Redirecciona a la página principal o de inicio de sesión
            }
        });
    };

    const handleSearch = (event) => {
        event.preventDefault(); // Previene el comportamiento por defecto del formulario

        // Aquí puedes agregar la lógica de búsqueda y verificación de resultados

        // Si no hay coincidencias, muestra la alerta de SweetAlert2
        MySwal.fire({
            toast: true,
            position: 'top-end',
            icon: 'info',
            title: 'No se encontraron coincidencias con su búsqueda',
            showConfirmButton: false,
            timer: 3000
        });

        
    };

    return (
        <div className='busqueda'>
            <header>
                <div className="top-bar">
                    <div className="logo">
                        <img src={logouleam} alt="Logo de la Universidad" />
                    </div>
                    <nav>
                        <ul>
                            <li><Link to='/Main'>Inicio</Link></li>
                            <li><Link to='/ContactoM'>Contáctanos</Link></li>
                            <li><a onClick={handleLogout} style={{cursor: 'pointer'}}>Cerrar Sesión</a></li>
                        </ul>
                    </nav>
                </div>
            </header>
            <section className="search-box">
                <div className="container">
                    <h2>Búsqueda Personalizada</h2>
                    <form action="#" method="get" onSubmit={handleSearch}>
                        <div className="form-group">
                            <label htmlFor="busqueda">Buscar por título o autor:</label>
                            <input type="text" id="busqueda" name="busqueda" placeholder="Escribe aquí" required />
                        </div>
                        <div className="form-group">
                            <button type="submit">Buscar</button>
                        </div>
                    </form>
                </div>
            </section>
        </div>
    );
}

export default Busqueda;
