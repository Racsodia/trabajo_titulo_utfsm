import React from 'react';
import {MDBJumbotron,MDBContainer,MDBCol,MDBRow} from 'mdbreact';
import ChallengesAlbum from '../components/ChallengesAlbum';
import ProjecstAlbum from '../components/ProjectsAlbum';
import ArticlesAlbum from '../components/ArticlesAlbum';
import MostCommentChallenges from '../components/MostCommentChallenges';
import ModalCreateChallenge from '../components/ModalCreateChallenge';
import Loading from '../components/Loading';

import { Query } from "react-apollo";
import { CHALLENGES_PAGE, ALL_CHALLENGES_ALBUM } from '../queries';

import '../../sass/SaludMejor.css'

class ChallengesPage extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            newChallenge: props.newChallenge,
            challengeKey: props.challengeKey,
        };
    }

    componentWillMount(){
        if(typeof this.state.newChallenge == 'undefined'){
            this.setState({challengeKey: localStorage.getItem("articleID")})
        }
    }
    setNewChallenge = e =>{
        this.setState({newChallenge: e, challengeKey: e.id})
    }
    componentDidUpdate(prevProps){
        if(this.props.newChallenge !== prevProps.newChallenge)
        this.setState({newChallenge: typeof 'undefined'})
    }

    render() {
        return (
            <Query query = {CHALLENGES_PAGE}>
                {({loading, error, data: {articles, projects}}) => {
                    if (loading) return <Loading/>
                    if (error) return <div>Error</div>

                    articles = articles.data
                    projects = projects.data
                    return (
                        <MDBContainer fluid className="p-0">
                            <MDBJumbotron>
                                <MDBContainer>
                                    <MDBRow>
                                        <MDBCol size="sm-7" className="mt-3">
                                            {localStorage.getItem("tk") != null && <ModalCreateChallenge articles = {articles} projects = {projects} newChallenge={this.setNewChallenge} filter = 'all' rendermode={1}/>}
                                            <hr className="hr-bar w-100"></hr>
                                            <h5 className="text-center"><b> Desafíos recientes</b></h5>
                                            <hr className="hr-bar w-100"></hr>
                                            <ChallengesAlbum rendermode={1} filter = 'all'/>
                                        </MDBCol>
                                        <MDBCol size="sm-5" className="d-flex flex-column mt-2">
                                            <hr className="hr-bar w-100"></hr>
                                            <h5 className="text-center"><b> Explora los desafíos</b></h5>
                                            <hr className="hr-bar w-100"></hr>
                                            <ArticlesAlbum rendermode={2} link_type="challenge" articles = {articles}></ArticlesAlbum>
                                            <div className="w-100 text-center">
                                                <hr className="hr-bar w-100"></hr>
                                                <h5><b>Por proyecto: </b></h5>
                                                <hr className="hr-bar w-100"></hr>
                                            </div>
                                            <ProjecstAlbum projects = {projects} rendermode={2}/>
                                            <MDBContainer>
                                                <hr className="hr-bar w-100"></hr>
                                                <h5 className="text-center"><b>Desafíos más comentados</b></h5>
                                                <hr className="hr-bar w-100"></hr>
                                                <MostCommentChallenges rendermode={2}/>
                                            </MDBContainer>
                                        </MDBCol>
                                    </MDBRow>
                                </MDBContainer>
                            </MDBJumbotron>
                        </MDBContainer>
                    )
                }}
            </Query>
        );
    }
}

ChallengesPage.propTypes = {};

export default ChallengesPage;
