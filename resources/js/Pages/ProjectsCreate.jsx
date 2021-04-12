import React from 'react'
import {MDBContainer,MDBJumbotron} from 'mdbreact'
import ProjectsAlbum from '../components/ProjectsAlbum'
import Loading from '../components/Loading'

import { Query } from "react-apollo"
import { PROJECTS_PAGE } from '../queries'

class ProjectsCreate extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            changes: false
        }
    }

    render() {
        return (
            <Query query = {PROJECTS_PAGE}>
                {({loading, error, data: {projects}}) => {
                    if (loading) return <Loading/>
                    if (error) return <div>Error</div>

                    projects = projects.data
                    let d = new Date()
                    let key = d.getTime()
                    
                    return(
                        <MDBContainer className="pt-5">
                            <MDBJumbotron className="pt-5 w-100">
                                <ProjectsAlbum key = {key} rendermode ={3} projects = {projects} />
                            </MDBJumbotron>
                        </MDBContainer>
                    )
                }}
            </Query>
        )
    }
}

export default ProjectsCreate;
