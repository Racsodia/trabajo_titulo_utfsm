import React from 'react';
import {MDBContainer, MDBJumbotron,MDBRow,MDBCol} from 'mdbreact';
import ProjectsAlbum from '../components/ProjectsAlbum';
import '../../sass/SaludMejor.css'

import { Query } from "react-apollo";
import { gql } from 'apollo-boost';
import { PROJECTS_PAGE } from '../queries';

class ProjectsPage extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            projects: [],
            isOpen: false,
        };
    }

    render() {
        return(
            <Query query = {PROJECTS_PAGE}>
                {({ loading, error, data: {projects} }) => {
                    if (loading) return(
                        <div className="justify-content-center text-center">
                            <div className="spinner-border" role="status">
                                <span className="sr-only">Loading...</span>
                            </div>
                        </div>
                    )
                    if (error) return `Error! ${error.message}`;

                    projects = projects.data
                    return (
                        <MDBContainer className="pt-5">
                            <MDBContainer className="pt-5">
                                <MDBRow>
                                    <MDBCol sm="4" >
                                        <MDBContainer className="bg06"><h4 className="text-center"><b>Proyectos en construcción</b></h4></MDBContainer>
                                        <ProjectsAlbum projects={projects} rendermode={1} status="construction" isOpen={true}></ProjectsAlbum>
                                    </MDBCol>
                                    <MDBCol sm="4" >
                                        <MDBContainer className="bg03"><h4 className="text-center"><b>Proyectos en desarrollo</b></h4></MDBContainer>
                                        <ProjectsAlbum projects={projects} rendermode={1} status="development" isOpen={true}></ProjectsAlbum>

                                    </MDBCol>
                                    <MDBCol sm="4" >
                                        <MDBContainer className="bg04"><h4 className="text-center"><b>Proyectos implementados</b></h4></MDBContainer>
                                        <ProjectsAlbum projects={projects} rendermode={1} status="completed" isOpen={true}></ProjectsAlbum>
                                    </MDBCol>
                                </MDBRow>
                            </MDBContainer>
                        </MDBContainer>
                    )
                }}
            </Query>
        )
    }
}

ProjectsPage.propTypes = {};

export default ProjectsPage;
