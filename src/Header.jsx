import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import './header.css';

const Header=()=>{

  const Redireccion = () => {
    window.location.href = 'https://nodejsprueba.onrender.com/api/v1/docs/';
   
 };
 

return(<>
 <Navbar expand="lg" className="bg-body-tertiary">
      <Container>
        <Navbar.Brand href="#home">
       
      
    R ArchivoRD
    </Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
            <Nav.Link href="/"> <i className="fa-solid fa-file"></i>AppArchivo</Nav.Link>
            <Nav.Link href="/servidor"> <i className="fa-solid fa-server"></i>Servidor</Nav.Link>
            <Nav.Link href="/guia"> <i className="fa-solid fa-guarani-sign"></i>Guia</Nav.Link>
            <Nav.Link href="#docuemtnacion" onClick={Redireccion }> <i className="fa-solid fa-folder"></i>Documentacion</Nav.Link>
           
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>


</>)


}
export default Header;