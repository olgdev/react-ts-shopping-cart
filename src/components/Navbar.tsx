import { Container, Nav, Button, Navbar as NavbarBs } from "react-bootstrap";
import { NavLink } from "react-router-dom";
import { CartIcon } from "./Icons";
import { useShoppingCart } from "../context/ShoppingCartContext.tsx";

const Navbar = () => {
  const { toggleCart, cartQuantity } = useShoppingCart();
  return (
    <NavbarBs sticky="top" className="bg-white shadow-sm mb-3">
      <Container>
        <Nav className="me-auto">
          <Nav.Link to="/" as={NavLink}>
            Home
          </Nav.Link>
          <Nav.Link to="/store" as={NavLink}>
            Store
          </Nav.Link>
          <Nav.Link to="/about" as={NavLink}>
            About
          </Nav.Link>
        </Nav>
        {cartQuantity > 0 &&
          <Button
            style={{ width: "3rem", height: "3rem", position: "relative" }}
            variant="outline-primary"
            className="rounded-circle"
            onClick={toggleCart}
          >
            <CartIcon />
            <strong
              className="rounded-circle bg-danger text-white d-flex align-items-center justify-content-center"
              style={{
                position: "absolute",
                bottom: 0,
                right: 0,
                width: "1.5rem",
                height: "1.5rem",
                transform: "translate(25%, 25%)"
              }}
            >
              {cartQuantity}
            </strong>
          </Button>}
      </Container>
    </NavbarBs>
  );
};

export default Navbar;
