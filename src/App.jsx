import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Home from './components/Home.jsx'
import Login from './components/Login.jsx'
import Registro from './components/Registro.jsx'
import Contacto from './components/Contacto.jsx'
import ContactoM from './components/ContactoM.jsx'
import Main from './components/Main.jsx'
import Busqueda from './components/Busqueda.jsx'
function App() {
  return (
    <Router>
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/Login' element={<Login />} />
        <Route path='/Registro' element={<Registro />} />
        <Route path='/Contacto' element={<Contacto />} />
        <Route path='/Main' element={<Main />} />
        <Route path='/ContactoM' element={<ContactoM />} />
        <Route path='/Busqueda' element={<Busqueda />} />
      </Routes>
    </Router >
  )
}

export default App
