import React from "react";
import ReactDOM from 'react-dom';
import { BrowserRouter as Router,Route } from "react-router-dom";
import {Navbar, NavbarBrand, NavbarNav, NavItem, NavLink, NavbarToggler, Collapse, FormInline, Dropdown, DropdownToggle, DropdownMenu,  DropdownItem, Fa, MDBIcon, MDBBtn } from "mdbreact";
import '../../sass/NavbarPage.css';
import ModalPage from "./ModalPage";

const logo ='/images/brand.png';

class NavbarPage extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      isOpen: false,
      isLogin: false
    }
  }
  goToChallenges = () => {
    localStorage.setItem("articleID",0)
    window.location = "../desafios"
  }
  goToPublications = () => {
    localStorage.setItem("publicationID",0)
    window.location = "../conocimientos"
  }
  render() {
    return (
      <Router>
        <Navbar color="navbar-color" dark expand="md" style={{marginTop: "0px"}}>
            <NavbarBrand>
              <strong className="white-text"><a href="/"><img src={logo} alt="Logo"></img></a></strong>
            </NavbarBrand>
            <NavbarToggler
              onClick={(e)=>this.setState(prevState=>({isOpen: !prevState.isOpen}))}
            />
            <Collapse id="navbarCollapse3" isOpen={this.state.isOpen} navbar>
              <NavbarNav left>
                <NavItem className="p-2">
                  <a href="../" className="navbar-link"> Inicio </a>
                </NavItem>
                <NavItem className="p-2">
                  <a onClick={this.goToChallenges} className="navbar-link"> Desafíos </a>
                </NavItem>
                <NavItem className="p-2">
                  <a onClick ={this.goToPublications}  className="navbar-link"> Conocimientos </a>
                </NavItem>
                <NavItem className="p-2">
                  <a href="../proyectos"  className="navbar-link"> Proyectos </a>
                </NavItem>
              </NavbarNav>
              <NavbarNav right>
                <NavItem>
                  <ModalPage></ModalPage>
                </NavItem>
              </NavbarNav>
            </Collapse>
        </Navbar>
      </Router>
    )
  }
}

if (document.getElementById('navBar')) ReactDOM.render(<NavbarPage />, document.getElementById('navBar'))
