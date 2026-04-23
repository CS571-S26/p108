import { Link, useLocation } from "react-router-dom";
import { Navbar as BSNavbar, Nav, Container } from "react-bootstrap";

export default function Navbar() {
  const location = useLocation();

  return (
    <BSNavbar bg="dark" variant="dark" expand="md" sticky="top">
      <Container>
        <BSNavbar.Brand as={Link} to="/" className="fw-bold fs-4">
          ⚔️ CodeDuel
        </BSNavbar.Brand>
        <BSNavbar.Toggle aria-controls="main-nav" />
        <BSNavbar.Collapse id="main-nav">
          <Nav className="ms-auto" activeKey={location.pathname}>
            <Nav.Link as={Link} to="/" eventKey="/">
              Home
            </Nav.Link>
            <Nav.Link as={Link} to="/duel/easy" eventKey="/duel/easy">
              Easy
            </Nav.Link>
            <Nav.Link as={Link} to="/duel/medium" eventKey="/duel/medium">
              Medium
            </Nav.Link>
            <Nav.Link as={Link} to="/duel/hard" eventKey="/duel/hard">
              Hard
            </Nav.Link>
            <Nav.Link as={Link} to="/stats" eventKey="/stats">
              Stats
            </Nav.Link>
          </Nav>
        </BSNavbar.Collapse>
      </Container>
    </BSNavbar>
  );
}
