import React from 'react'
import axios from 'axios'
import urls from '../URLs.js'
import {MDBContainer, MDBRow,MDBCol,Fa, MDBModal} from 'mdbreact'
import ProjectButton from './ProjectButton.jsx'
import '../../sass/SaludMejor.css'
import { Query, Mutation } from 'react-apollo';
import Loading from './Loading.jsx';
import { ORGANIZATIONS_PAGE, PROJECTS_PAGE } from '../queries.js';
import { CREATE_PROJECT, EDIT_PROJECT } from '../mutations.js';
import ModalCreateProject from './ModalCreateProject.jsx';

class ProjectsAlbum extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            projects: props.projects,
            rendermode: props.rendermode,
            status: props.status,
            isOpen: true,
            organizations:[],
            id:'',
            name:'',
            organization_id: '0',
            article_id: '0',
            photo_uri:'',
            // status:'',
            description:'',
            showCreate: false,
            showEdit: false,
            editedProject: {}
        };
        this.showEdit = this.showEdit.bind(this)
    }
    updateCreate = newProject => {
        this.setState({projects: [newProject].concat(this.state.projects)})
    }
    updateCacheEditProject(cache, {data: {editProject}}) {
        const {projects} = cache.readQuery({query: PROJECTS_PAGE})
        cache.writeQuery ({
            query: PROJECTS_PAGE,
            data: {
                projects: {data: [editProject].concat(projects.data.filter(p => {return p.id != editProject.id})), __typename: 'projectPagination'}
            }
        })
    }
    showCreate = e =>{
        e.preventDefault()
        this.setState({ showCreate: !this.state.showCreate, showEdit: false })
    }
    showEdit = e => {
        this.setState({showEdit: !this.state.showEdit, showCreate: false, editedProject: e})
    }

    render() {
        if(this.state.rendermode == 2 || this.state.rendermode == 4){
            return (
                <MDBContainer >
                    {
                        this.state.projects.map((pj) =>{
                            return <ProjectButton key={pj.id} project = {pj} rendermode={this.state.rendermode}/>
                        })
                    }
                </MDBContainer>
            );
        }
        if(this.state.rendermode == 1){
            var renderVar = [];
            for(let i=0;i<this.state.projects.length;i++)
                if(this.state.projects[i].status.toString() == this.state.status.toString()) renderVar.push(this.state.projects[i])

            return (
                renderVar.map((pj) => {
                    return <ProjectButton key={pj.id} project={pj} rendermode={this.state.rendermode}/>
                })
            )
        }
        if(this.state.rendermode == 3){
            var renderVar = this.state.projects
            return (
                <MDBContainer>
                    <hr/>
                    <MDBRow>
                        <MDBCol size="sm-1">ID:</MDBCol>
                        <MDBCol size="sm-3">Nombre:</MDBCol>
                        <MDBCol size="sm-2">Creador:</MDBCol>
                        <MDBCol size="sm-2">Estado:</MDBCol>
                        <MDBCol size="sm-3">Descripción:</MDBCol>
                        <MDBCol size="sm-1"><ModalCreateProject update = {this.updateCreate}/></MDBCol>
                    </MDBRow>
                    <hr/>
                    {
                        renderVar.map((pj) =>{
                            return <ProjectButton key={pj.id} project={pj} rendermode={this.state.rendermode} handleDelete={this.handleDelete}/>
                        })
                    }
                </MDBContainer>
            )
        }
    }
}

export default ProjectsAlbum;
