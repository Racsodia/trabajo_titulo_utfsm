import React from "react";
import ReactDOM from 'react-dom';
import { BrowserRouter as Router } from "react-router-dom";
import {Navbar, NavbarBrand, NavbarNav, NavItem, NavbarToggler, Collapse, Dropdown, DropdownToggle, DropdownMenu,  DropdownItem, MDBBtn} from "mdbreact";

import { Query } from "react-apollo";
import { GET_USER } from '../queries';
import Loading from '../components/Loading';

import {ApolloProvider} from "react-apollo";
import ApolloClient from "apollo-client";
import { createHttpLink } from 'apollo-link-http';
import { setContext } from 'apollo-link-context';
import { InMemoryCache } from 'apollo-cache-inmemory';

import '../../sass/NavbarPage.css';

const httpLink = createHttpLink({
    uri: '/graphql',
});

  const authLink = setContext((_, { headers }) => {
      // get the authentication token from local storage if it exists
      const token = localStorage.getItem('tk');
      // return the headers to the context so httpLink can read them
      return {
          headers: {
          ...headers,
          authorization: token ? `Bearer ${token}` : "",
          }
      }
  });

  const client = new ApolloClient({
    link: authLink.concat(httpLink),
    cache: new InMemoryCache()
  });

const logo ='/images/brand.png';
class NavbarPageAuth extends React.Component {

    constructor(props) {
        super(props);
        this.state = {}
        this.logoutFunction = this.logoutFunction.bind(this);
    }

    logoutFunction(event){
        event.preventDefault();
        localStorage.removeItem("tk");
        localStorage.removeItem("uID");
        localStorage.removeItem("uTP")
        localStorage.removeItem("articleID")
        localStorage.removeItem("userID")
        localStorage.removeItem("projectID")
        localStorage.removeItem("publicationID")
        localStorage.removeItem("org")
        localStorage.removeItem("oID")
        localStorage.removeItem("vrf")
        document.getElementById('logout-form').submit();
    }
    goToChallenges = () =>{
        localStorage.setItem("articleID",0)
        window.location = "../desafios"
    }
    goToPublications = () =>{
        localStorage.setItem("publicationID",0)
        window.location = "../conocimientos"
    }

    render() {
        let id = parseInt(document.getElementById('app').dataset.user)
        var isSA = false
        var isAD = false
        var isMS = false
        var isOA = false
        var isLogin = false
        return (
            <ApolloProvider client = {client}>
                <Query query = {GET_USER} variables = {{id: id}}>
                    {({loading, error, data: {users}}) => {
                        if (loading) return <Loading/>
                        if (error) return <div>Error</div>

                        let oID = users.data[0].organization === null ? null : users.data[0].organization.id

                        localStorage.setItem("uID",users.data[0].id)
                        localStorage.setItem("oID",oID)
                        localStorage.setItem("uTP",users.data[0].type)
                        localStorage.setItem("org",users.data[0].org_admin)
                        localStorage.setItem("vrf",users.data[0].verified)

                        if (users.data[0].type == "super_admin") {
                            isSA = isLogin = true
                        }
                        if(users.data[0].type == "admin"){
                            isAD = isLogin = true
                        }
                        if(users.data[0].type == "minsal"){
                            isMS = isLogin = true
                        }
                        if(users.data[0].type == "general"){
                            isLogin = true
                        }
                        if(users.data[0].org_admin == "yes"){
                            isOA = isLogin = true
                        }
                        return (
                            <Router>
                                <Navbar color="navbar-color" dark expand="md" style={{marginTop: "0px", zIndex: 50}}>
                                    <NavbarBrand>
                                        <strong className="white-text"><a href="/"><img src={logo} alt="Logo"></img></a></strong>
                                    </NavbarBrand>
                                    <NavbarToggler onClick={(e)=>this.setState(prevState=>({isOpen: !prevState.isOpen}))}/>
                                    <Collapse id="navbarCollapse3" isOpen={this.state.isOpen} navbar>
                                        <NavbarNav left>
                                            <NavItem className="p-2">
                                                <a href="/muro" className="navbar-link"> Muro </a>
                                            </NavItem>
                                            <NavItem className="p-2">
                                                <a onClick={this.goToChallenges} className="navbar-link"> Desafíos </a>
                                            </NavItem>
                                            <NavItem className="p-2">
                                                <a onClick={this.goToPublications} className="navbar-link"> Conocimientos </a>
                                            </NavItem>
                                            <NavItem className="p-2">
                                                <a href="/proyectos"  className="navbar-link"> Proyectos </a>
                                            </NavItem>
                                        </NavbarNav>
                                        <NavbarNav right>
                                            {(isAD || isSA || isMS) && <NavItem> <MDBBtn href="/gestionar-tematicas"> Gestionar temáticas</MDBBtn></NavItem>}
                                            {(isAD || isSA || isMS || isOA) && <NavItem> <MDBBtn href="/gestionar-proyectos"> Gestionar proyectos</MDBBtn></NavItem>}
                                            <NavItem>
                                                <Dropdown>
                                                    <DropdownToggle nav caret className="pt-0">
                                                        <MDBBtn className="white">{users.data[0].name}</MDBBtn>
                                                    </DropdownToggle>
                                                    <DropdownMenu className="dropdown-default" right>
                                                        <DropdownItem href="/perfil/">Mi perfil</DropdownItem>
                                                        { (isSA || isAD || isMS || isOA)
                                                            && <DropdownItem href="/gestionar-usuarios"> Lista de usuarios</DropdownItem>}
                                                        {  (isSA || isAD || isMS )
                                                            && <DropdownItem href="/lista-organizaciones">Organizaciones</DropdownItem>}
                                                        <DropdownItem href="/" onClick={this.logoutFunction}>Cerrar sesión</DropdownItem>
                                                    </DropdownMenu>
                                                </Dropdown>
                                            </NavItem>
                                        </NavbarNav>
                                    </Collapse>
                                </Navbar>
                            </Router>
                        )
                    }}
                </Query>
            </ApolloProvider>
        )
    }
}

if (document.getElementById('navBarAuth')) {
  ReactDOM.render(<NavbarPageAuth />, document.getElementById('navBarAuth'));
}
