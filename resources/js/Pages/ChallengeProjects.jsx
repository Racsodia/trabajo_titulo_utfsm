import React from 'react';
import {MDBContainer,MDBJumbotron,MDBRow,MDBCol} from 'mdbreact';
import ChallengesAlbum from '../components/ChallengesAlbum';
import ProjectsAlbum from '../components/ProjectsAlbum';
import ArticlesAlbum from '../components/ArticlesAlbum';
import MostCommentChallenges from '../components/MostCommentChallenges';
import ModalCreateChallenge from '../components/ModalCreateChallenge';
import '../../sass/SaludMejor.css'

import { Query } from "react-apollo";
import { ARTICLES_ALBUM, PROJECTS_ALBUM } from '../queries';

class ChallengeProject extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            newChallenge: props.newChallenge,
            newChallengeKey: props.newChallengeKey,
        };
    }

    /* static getDerivedStateFromError(error) {
        var delayInMilliseconds = 100
        setTimeout(function() {
            window.location.href = window.location.href
        }, delayInMilliseconds)
    } */
    componentDidMount(){
        if(typeof this.state.newChallenge == 'undefined'){
            this.setState({newChallengeKey: this.props.match.params.id})
        }
    }
    setNewChallenge = e =>{
        this.setState({newChallenge: e, newChallengeKey: e.id})
    }
    componentDidUpdate(prevProps){
         if(this.props.newChallenge !== prevProps.newChallenge)
             this.setState({newChallenge: typeof 'undefined'})
    }
    render() {
        let id = this.props.match.params.id
        return (
            <MDBContainer fluid className="p-0">
                <MDBJumbotron>
                    <MDBContainer className="p-0">
                        <MDBRow>
                            <MDBCol size="sm-7" className="mt-3">
                                {localStorage.getItem("tk") != null &&<ModalCreateChallenge newChallenge={this.setNewChallenge} filter = 'projects' rendermode={1}/>}
                                <hr className="hr-bar w-100"></hr>
                                <h5 className="text-center"><b> Desafíos recientes</b></h5>
                                <hr className="hr-bar w-100"></hr>
                                <ChallengesAlbum rendermode={1} filter = 'projects' id = {this.props.match.params.id}/>
                            </MDBCol>
                            <MDBCol size="sm-5" className="d-flex flex-column mt-2">
                                <hr className="hr-bar w-75"></hr>
                                <h5 className="text-center"><b> Explora los desafíos</b></h5>
                                <hr className="hr-bar w-75"></hr>
                                <b className="text-center">Por temática:</b>
                                <hr className="hr-bar w-75"></hr>
                                <Query query = {ARTICLES_ALBUM}>
                                    {({ loading, error, data: {articles} }) => {
                                        if (loading) return ('Loading...');
                                        if (error) return `Error! ${error.message}`;

                                        return <ArticlesAlbum rendermode={2} articles = {articles.data} link_type="challenge"/>
                                    }}
                                </Query>
                                <hr className="hr-bar w-75"></hr>
                                <b className="text-center">Por proyecto:</b>
                                <hr className="hr-bar w-75"></hr>
                                <Query query = {PROJECTS_ALBUM}>
                                    {({ loading, error, data: {projects} }) => {
                                        if (loading) return ('Loading...');
                                        if (error) return `Error! ${error.message}`;

                                        return <ProjectsAlbum rendermode={2} projects = {projects.data}/>
                                    }}
                                </Query>
                                <MDBContainer >
                                    <hr className="hr-bar w-75"></hr>
                                    <h5 className="text-center"><b>Desafíos más comentados</b></h5>
                                    <hr className="hr-bar w-75"></hr>
                                    <MostCommentChallenges rendermode={2}/>
                                </MDBContainer>
                            </MDBCol>
                        </MDBRow>
                    </MDBContainer>
                </MDBJumbotron>
            </MDBContainer>
        )
    }
}

export default ChallengeProject;
