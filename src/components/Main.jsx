import { Link, useNavigate } from 'react-router-dom';
import React, { useState, useEffect } from 'react';
import './css/Main.css'; // Asegúrate de importar tus estilos aquí
import logouleam from './imagenes/logouleam.png'
import Foto1 from './imagenes/Foto1.jpg'
import Foto2 from './imagenes/Foto2.jpg'
import Foto3 from './imagenes/Foto3.jpg'
import fondo from './imagenes/fondo.jpg'
import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content';

const MySwal = withReactContent(Swal);

function Main() {

    const navigate = useNavigate();

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

    const uploadBook = () => {
        MySwal.fire({
            title: 'Subir Libro',
            html: (
                <div>
                    <input id="swal-input1" className="swal2-input" placeholder="Nombre del libro" />
                    <input id="swal-input2" className="swal2-input" type="file" accept=".pdf" />
                    <input id="swal-input3" className="swal2-input" type="date" placeholder="Fecha de publicación" />
                    <select id="swal-input4" className="swal2-input">
                        <option value="">Es usted el autor</option>
                        <option value="yes">Sí</option>
                        <option value="no">No</option>
                    </select>
                </div>
            ),
            focusConfirm: false,
            preConfirm: () => {
                let bookData = {
                    nombre: document.getElementById('swal-input1').value,
                    // Aquí no podemos obtener el archivo directamente, se necesitará procesamiento adicional
                    fechaPublicacion: document.getElementById('swal-input3').value,
                    autoriaPropia: document.getElementById('swal-input4').value
                }
                // Guardar en localStorage
                localStorage.setItem('bookData', JSON.stringify(bookData));
            },
            allowOutsideClick: () => !Swal.isLoading()
        }).then((result) => {
            if (result.isConfirmed) {
                Swal.fire('Guardado!', 'Tu libro ha sido subido.', 'success');
            }
        })
    }


    const backgroundStyle = {
        backgroundImage: `url(${fondo})`,
        backgroundSize: 'cover', // Para que la imagen cubra todo el elemento
        backgroundRepeat: 'no-repeat', // Para evitar la repetición de la imagen
        backgroundPosition: 'center', // Para centrar la imagen horizontal y verticalmente

    };

    const [currentIndex, setCurrentIndex] = useState(0);
    const images = [Foto1, Foto2, Foto3];

    // Actualiza la posición de la galería para mostrar la imagen actual
    const updateGalleryPosition = (index) => {
        const gallery = document.querySelector(".gallery-container");
        const galleryWidth = gallery.clientWidth;
        const offset = index * galleryWidth;
        gallery.style.transform = `translateX(-${offset}px)`;
    };

    
    const showImage = (index) => {
        const gallery = document.querySelector(".gallery-container");
        gallery.style.transform = `translateX(-${index * 100}%)`; // Mueve la galería un 100% del ancho por cada índice
    };

    const goToPrevious = () => {
        setCurrentIndex((prevIndex) => {
            const newIndex = (prevIndex - 1 + images.length) % images.length;
            return newIndex;
        });
    };
    
    const goToNext = () => {
        setCurrentIndex((prevIndex) => {
            const newIndex = (prevIndex + 1) % images.length;
            return newIndex;
        });
    };
    

    
 useEffect(() => {
    showImage(currentIndex);
}, [currentIndex]);

    

    return (
        <div className="main" style={backgroundStyle}>
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
                <div className="secondary-bar">
                    <ul className="centered">
                        <li><Link to='/Busqueda'>Búsqueda</Link></li>
                        <li onClick={uploadBook} style={{cursor: 'pointer'}}>Subir Libro</li>
                    </ul>
                </div>
            </header>
            <section className="gallery">
                <div className="gallery-container">
                    {images.map((image, index) => (
                        <img key={index} src={image} alt={`Imagen ${index + 1}`} />
                    ))}
                </div>
                <div className="gallery-controls">
                    <button className="prev-button" onClick={goToPrevious}>Anterior</button>
                    <button className="next-button" onClick={goToNext}>Siguiente</button>
                </div>
                <div className="text-boxes">
                    <div className="text-box">
                        <h3>Libros para recreación</h3>
                        <p>Los libros de recreación son obras literarias diseñadas para proporcionar entretenimiento, diversión y escape de la realidad a los lectores, en lugar de enfocarse en la educación o la información. Estas obras suelen incluir novelas, cuentos, poesía y otros géneros que buscan brindar placer y disfrute a través de la lectura.</p>
                    </div>
                    <div className="text-box">
                        <h3>Libros académicos</h3>
                        <p>Los libros académicos son publicaciones escritas por expertos en un campo específico y están diseñados para proporcionar información educativa, investigaciones y análisis detallados sobre un tema en particular. Estos libros son utilizados como recursos de referencia en contextos educativos y de investigación, y su objetivo principal es impartir conocimiento y promover el aprendizaje en disciplinas académicas.</p>
                    </div>
                </div>
            </section>
        </div>
    );
}

export default Main;
