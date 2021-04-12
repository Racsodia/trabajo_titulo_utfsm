import React from "react";
import ReactDOM from 'react-dom';
import { BrowserRouter as Router } from "react-router-dom";
import { Col, Container, Row, Footer,Fa } from "mdbreact";
import '../../sass/FooterPage.css';

class FooterPage extends React.Component {
    constructor (props) {
        super(props)
        this.state = {
            positioned: false
        }
    }
    componentDidMount () {
        let windowHeight = window.innerHeight
        let footer = document.getElementById('footer')
        let app = document.getElementById('content')
        let fSize = footer.offsetHeight
        let minHeight = windowHeight - fSize + 'px'
        app.style.minHeight = minHeight
    }
    render() {
        return (
            <Router>
                <Footer color="special-color" className="font-small pt-4">
                    <Container fluid className="text-md-left">
                        <Row>
                            <Col className="p-2 flex-fill col-md-4">
                                <img className="footer-img" src="/images/gob.png" alt="logo-gobierno"></img>
                            </Col>
                            <Col className="p-2 flex-fill col-md-4 text-left" >
                                <h4 className="title"><b>Salud mejor</b></h4>
                                <a href="/">Exploración de temáticas</a><br/>
                                <a href="/desafios">Propone tu desafío</a><br/>
                                <a href="/conocimientos">Base de conocimientos</a><br/>
                                <a href="/proyectos">Proyectos Ministerio de Salud</a><br/>
                                <a href="/privacidad">Política de privacidad</a><br/>
                                <a href="/terminos-de-servicio">Términos de servicio</a><br/>
                                <a href="mailto:saludmejor@minsal.cl">Contáctanos: <b>saludmejor@minsal.cl</b> </a>
                            </Col>
                            <Col className="p-2 flex-fill col-md-4 text-left" >
                                <h4 className="title"><b>Redes sociales</b></h4>
                                <a href="https://www.facebook.com/ministeriosaludchile"><i className="fab fa-facebook-square fa-3x padding-space-5x hovergrow" /></a>
                                <a href="https://twitter.com/ministeriosalud"><i className="fab fa-twitter-square fa-3x padding-space-5x hovergrow" /></a>
                                <a href="https://www.youtube.com/user/ministeriosaludchile"><i className="fab fa-youtube fa-3x padding-space-5x hovergrow" /></a>
                                <a href="https://www.linkedin.com/company/ministerio-de-salud-de-chile"><i className="fab fa-linkedin fa-3x padding-space-5x hovergrow" /></a>
                            </Col>
                        </Row>
                    </Container>
                    <div className="footer-copyright text-center py-4 mt-4">
                        <Container fluid>
                            &copy; {new Date().getFullYear()} Copyright -{" Ministerio de Salud - "}
                            <a href="https://www.gob.cl"> Gobierno de Chile</a>
                        </Container>
                    </div>
                </Footer>
            </Router>
        );
    }
}

if (document.getElementById('footer')) {
    ReactDOM.render(<FooterPage />, document.getElementById('footer'));
  }
