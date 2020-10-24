import React, { Component } from "react";
import {
  Collapse,
  Navbar,
  NavbarToggler,
  NavbarBrand,
  Nav,
  NavItem,
  NavLink,
  Container,
} from "reactstrap";
import RegisterModal from "./auth/RegisterModal";
import Logout from "./auth/Logout";
import LoginModal from "./auth/LoginModal";

class NavBar extends Component {
  state = {
    isOpen: false,
  };

  handleToggle = () => {
    this.setState({
      isOpen: !this.state.isOpen,
    });
  };

  render() {
    return (
      <div>
        <Navbar color="dark" dark expand="sm" className="mb-5">
          <Container>
            <NavbarBrand href="/">ShoppingList</NavbarBrand>
            <NavbarToggler onClick={this.handleToggle}></NavbarToggler>
            <Collapse isOpen={this.state.isOpen} navbar>
              <Nav className="ml-auto">
                <NavItem>
                  <RegisterModal />
                </NavItem>
                <NavItem>
                  <LoginModal />
                </NavItem>
                <NavItem>
                  <Logout />
                </NavItem>
              </Nav>
            </Collapse>
          </Container>
        </Navbar>
      </div>
    );
  }
}

export default NavBar;
