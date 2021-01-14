import {
  Navbar,
  Nav,
  NavDropdown
} from 'react-bootstrap'

const NavBar = () => {
  return(
  <Navbar collapseOnSelect expand="lg" bg="dark" variant="dark">
    <Navbar.Brand>Sistema Ventas</Navbar.Brand>
    <Navbar.Toggle aria-controls="responsive-navbar-nav" />
    <Navbar.Collapse id="responsive-navbar-nav">
      <Nav className="mr-auto">
        <Nav.Link href="/orders">Ordenes</Nav.Link>
        <Nav.Link href="/sales"></Nav.Link>
        <NavDropdown title="Ventas" id="collasible-nav-dropdown">
          <NavDropdown.Item href="/sales">Detalle de Ventas</NavDropdown.Item>
          <NavDropdown.Item href="/cutOff">Corte de Caja</NavDropdown.Item>
        </NavDropdown>
      </Nav>
    </Navbar.Collapse>
  </Navbar>
  );
}

export default NavBar;