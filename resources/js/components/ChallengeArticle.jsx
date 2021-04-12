import React from 'react';
// import PropTypes from 'prop-types';
import {MDBContainer,MDBJumbotron,MDBRow,MDBCol} from 'mdbreact';
import ChallengesAlbum from '../components/ChallengesAlbum';
import BreadcrumbPage from '../components/BreadcrumbPage';
import ProjecstAlbum from '../components/ProjectsAlbum';
import ArticlesAlbum from '../components/ArticlesAlbum';
import MostCommentChallenges from '../components/MostCommentChallenges';
class ChallengeArticle extends React.Component {
    constructor(props) {
        super(props);
        this.state = {};
    }

    render() {
        return (
            <MDBContainer fluid className="p-0">
                <MDBJumbotron>
                    <MDBContainer className="p-0">
                        <MDBRow>
                            <MDBCol size="7">
                                <hr className="hr-bar w-100"></hr>
                                <h5 className="text-center"><b> Desafíos recientes</b></h5>
                                <hr className="hr-bar w-100"></hr>
                                <BreadcrumbPage/>
                                <ChallengesAlbum rendermode={1} filter = 'articles'></ChallengesAlbum>
                            </MDBCol>
                            <MDBCol size="5" className="d-flex flex-column">

                                    <hr className="hr-bar w-75"></hr>
                                    <h5 className="text-center"><b> Explora los desafíos</b></h5>
                                    <hr className="hr-bar w-75"></hr>
                                    <b className="text-center">Artículos</b>


                                    <hr className="hr-bar w-75"></hr>
                                    <ArticlesAlbum rendermode={2}></ArticlesAlbum>


                                    <hr className="hr-bar w-75"></hr>
                                    <b className="text-center">Proyectos</b>

                                    <hr className="hr-bar w-75"></hr>

                                    <ProjecstAlbum rendermode={2}></ProjecstAlbum>
                                <MDBContainer >
                                    <hr className="hr-bar w-75"></hr>

                                    <h5 className="text-center"><b>Desafíos más comentados</b></h5>



                                    <hr className="hr-bar w-75"></hr>
                                    <MostCommentChallenges rendermode={2}></MostCommentChallenges>
                                </MDBContainer>
                                <MDBContainer className="w-75">

                                </MDBContainer>
                            </MDBCol>
                        </MDBRow>
                    </MDBContainer>
                </MDBJumbotron>
            </MDBContainer>
        );
    }
}

ChallengeArticle.propTypes = {};

export default ChallengeArticle;
