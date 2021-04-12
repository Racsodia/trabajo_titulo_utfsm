import React from 'react';
import {MDBContainer,MDBJumbotron,MDBBtn,MDBRow,MDBCol} from 'mdbreact';
import { Query } from "react-apollo";
import { HOME } from '../queries';
import Loading from '../components/Loading';
import CarouselPage from '../components/CarouselPage';
import ArticlesAlbum from '../components/ArticlesAlbum';
import OrganizationsAlbum from '../components/OrganizationsAlbum';

import '../../sass/Home.css';
import '../../sass/SaludMejor.css'

class Home extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
        };
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
            <React.Fragment>
                <MDBJumbotron className=" p-0">
                    <CarouselPage/>
                </MDBJumbotron>
                <Query query = {HOME}>
                    {({ loading, error, data: {articles, organizations} }) => {
                        if (loading) return <Loading/>
                        if (error) return `Error! ${error.message}`;
                        return (
                            <React.Fragment>
                                <MDBJumbotron fluid className="jumbotron p-0 m-0" >
                                    <MDBContainer className="text-center">
                                        <h3>¿Qué es <b className="c03">Salud Mejor</b>?</h3>
                                        <p className="lead text-muted">
                                        Somos una plataforma que el Ministerio de Salud pone a disposición de
                                        toda la comunidad para pensar, discutir y crear de manera conjunta
                                        soluciones que mejoren la calidad de la salud de todos los chilenos y chilenas,
                                        con una mirada innovadora y constructiva. </p>
                                    </MDBContainer>
                                </MDBJumbotron>
                                <MDBContainer>
                                    <ArticlesAlbum rendermode={1} articles = {articles.data}/>
                                </MDBContainer>
                                <hr/>
                                <MDBJumbotron fluid className="shadow-none pt-0">
                                    <MDBContainer>
                                        <h1 className="text-center mb-5">Participa en <b className="c03">Salud Mejor</b> a través de las siguientes acciones.</h1>
                                    </MDBContainer>
                                    <MDBContainer className="text-center flex-wrap">
                                        <MDBRow className=" flex-wrap">
                                            <MDBCol size="sm-4">
                                                <MDBBtn onClick={this.goToChallenges} className="section-button challenge-button"></MDBBtn>
                                                <MDBRow size="4" className="justify-content-center"><h4 className="ml-3 text-size">Plantea desafíos</h4></MDBRow>
                                            </MDBCol>
                                            <MDBCol size="sm-8" className="justify-content-center "><h5 className="text-justify text-width">¿Deseas proponer oportunidades de mejora en relación con alguno(s) de los temas de salud propuestos? Publícala para iniciar su discusión entre todos o aporta a las propuestas de otros usuarios. </h5></MDBCol>
                                        </MDBRow>
                                        <br/><br/>
                                        <MDBRow className=" flex-wrap">
                                            <MDBCol size="sm-4">
                                                <MDBBtn onClick={this.goToPublications} className=" section-button publications-button"></MDBBtn>
                                                <MDBRow size="4" className="justify-content-center"><h4 className="ml-2 text-size">Comparte <br/> Conocimientos</h4></MDBRow>
                                            </MDBCol>
                                            <MDBCol size="sm-8" className="justify-content-center "><h5 className="text-justify text-width">¿Tienes algún estudio, buena práctica, modelo de atención, flujograma o cualquier otro material para contribuir a una base de datos? Súbelo aquí o comenta los aportes de otros usuarios.</h5></MDBCol>
                                        </MDBRow>
                                        <br/><br/>
                                        <MDBRow className=" flex-wrap">
                                            <MDBCol size="sm-4">
                                                <MDBBtn href="proyectos" className=" section-button projects-button"></MDBBtn>
                                                <MDBRow size="4" className="justify-content-center"><h4 className="ml-2 text-size">Conoce los <br/> proyectos </h4></MDBRow>
                                            </MDBCol>
                                            <MDBCol size="sm-8" className="justify-content-center "><h5 className="text-justify text-width">¿Quieres saber qué iniciativas ha realizado o está realizando el Ministerio de Salud en los diferentes temas propuestos? Revísalos en esta sección.</h5></MDBCol>
                                        </MDBRow>
                                        <br/><br/>
                                    </MDBContainer>
                                </MDBJumbotron>
                                <MDBJumbotron className="m-6 shadow-none">
                                    <MDBContainer>
                                        <h1 className="text-center mb-5">Instituciones que colaboran y participan en <b className="c03">Salud Mejor</b></h1>
                                    </MDBContainer>
                                    <OrganizationsAlbum rendermode={2} organizations = {organizations.data}/>
                                </MDBJumbotron>
                            </React.Fragment>
                        )
                    }}
                </Query>
            </React.Fragment>
        )
    }
}

export default Home;
