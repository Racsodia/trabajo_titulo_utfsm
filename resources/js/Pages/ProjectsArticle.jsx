import React from 'react';
// import PropTypes from 'prop-types';
import {MDBJumbotron,MDBContainer,MDBRow,MDBCol} from 'mdbreact';
import ChallengesAlbum from '../components/ChallengesAlbum';
import ProjectButton from '../components/ProjectButton'

import { Query } from "react-apollo";
import { PROJECTS_ARTICLE } from '../queries';
import Loading from '../components/Loading';

class ProjectsArticle extends React.Component {
    constructor(props) {
        super(props);
        this.state = {};
    }

    render() {
        let id = parseInt(this.props.match.params.id)
        return (
            <Query query = {PROJECTS_ARTICLE} variables = {{id}}>
                {({ loading, error, data: {projects} }) => {
                    if (loading) return <Loading/>
                    if (error) return 'Error'

                    let project = projects.data[0]

                    return(
                        <MDBContainer fluid className="p-0">
                            <MDBJumbotron>
                                <MDBContainer className="p-0">
                                    <MDBRow>
                                        <MDBCol size="sm-7" className="mt-3">
                                            {/* <ModalCreateProject project = {project.data} newChallenge={this.setNewChallenge} rendermode={1}></ModalCreateProject> */}
                                            <hr className="hr-bar w-100"></hr>
                                            <h5 className="text-center"><b>Desafíos recientes</b></h5>
                                            <hr className="hr-bar w-100"></hr>
                                            <ChallengesAlbum rendermode={1} filter = 'projects' id = {this.props.match.params.id}/>
                                        </MDBCol>
                                        <MDBCol size="sm-5" className="mt-3">
                                            <hr className="hr-bar w-100"></hr>
                                            <h5 className="text-center"><b>Sobre el Proyecto</b></h5>
                                            <hr className="hr-bar w-100"></hr>
                                            <ProjectButton project = {project} rendermode = {1} readmore = {false} />
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

export default ProjectsArticle;
