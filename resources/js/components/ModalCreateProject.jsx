import React from 'react';
import {MDBContainer,MDBRow,MDBCol,MDBBtn, MDBModal, MDBModalBody, MDBModalHeader, MDBModalFooter, Fa} from 'mdbreact';
import { Query, Mutation } from 'react-apollo';
import { CREATE_PROJECT } from '../mutations';
import { PROJECTS_PAGE, ORGANIZATIONS_PAGE } from '../queries';
import urls from '../URLs.js';
import axios from 'axios';
import Loading from './Loading';

class ModalCreateProject extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            rendermode: props.rendermode,
            project: props.organization,
            id: "",
            name: "",
            organization: "",
            status:  "",
            description: "",
            file: "",
            modal: false,
            update: props.update,
        };
    }
    updateCacheNewProject = (cache, {data: {newProject}}) => {
        const {projects} = cache.readQuery({query: PROJECTS_PAGE})
        cache.writeQuery ({
            query: PROJECTS_PAGE,
            data: {
                projects: {data: projects.data.concat(newProject), __typename: 'projectPagination'}
            }
        })
        this.state.update(newProject)
    }
    toggle = () => {
        this.setState({ modal: !this.state.modal });
    }
    handleName = e =>{ this.setState({ name: e.target.value }) }
    handleOrganization = e =>{ this.setState({ organization_id: e.target.value }) }
    handleFile = e =>{
        e.preventDefault()
        let formdata = new FormData()
        formdata.append('file',e.target.files[0])
        axios.post(urls.prefix + urls.docsCreate, formdata, { headers: { Authorization: `Bearer ${localStorage.getItem("tk")}`}})
        .then(response =>{
            this.setState({photo_uri: response.data.uri})
            console.log("r",response.data.uri)
        })
        .catch(error =>{console.log(error)})
    }
    handleStatus = e =>{ this.setState({ status: e.target.value }) }
    handleDescription = e =>{ this.setState({ description: e.target.value }) }

    render() {
        return (
            <MDBContainer>
                <MDBBtn onClick={this.toggle}>Nuevo</MDBBtn>
                <MDBModal isOpen={this.state.modal} toggle={this.toggle} size="lg">
                    <MDBModalHeader toggle={this.toggle}>Nuevo Proyecto</MDBModalHeader>
                    <MDBModalBody>
                        <Query query = {ORGANIZATIONS_PAGE}>
                            {({loading, error, data: {organizations}}) => {
                                if (loading) return <Loading/>
                                if (error) return <div>Error</div>

                                organizations = organizations.data

                                return (
                                    <form>
                                        <MDBRow>
                                            <MDBCol size="sm-4">
                                                <input type="text"
                                                placeholder="Nombre del proyecto"
                                                className="title w-100"
                                                value={this.state.name}
                                                onChange={this.handleName}
                                                />
                                            </MDBCol>
                                            <MDBCol size="sm-3">
                                                <select value={this.state.organization_id} name="organization_id" onChange={this.handleOrganization}>
                                                    <option value="0">Selecciona organización</option>
                                                    {
                                                        organizations.map((pj,index)=>{
                                                            return <option key={index} value={pj.id}>{pj.name}</option>
                                                        })
                                                    }
                                                </select>
                                                <select value={this.state.status} onChange={this.handleStatus}>
                                                    <option value="0">Estado del proyecto</option>
                                                    <option value="construction">Construcción</option>
                                                    <option value="development">Desarrollo</option>
                                                    <option value="completed">Completado</option>
                                                </select>
                                            </MDBCol>
                                            <MDBCol size="sm-4"><textarea
                                                placeholder="Descripción del proyecto"
                                                className="form-control resize-area"
                                                rows="1"
                                                maxLength="10000"
                                                value={this.state.description}
                                                onChange={this.handleDescription}
                                            /></MDBCol>
                                        </MDBRow>
                                        <MDBRow>
                                            <MDBCol size="sm-12">{this.state.photo_uri}</MDBCol>
                                        </MDBRow>
                                        <br/>
                                        <MDBRow>
                                            <MDBCol size="sm-12">
                                                <label className="file-btn-1 bg05" >
                                                    <Fa icon="far fa-file"/>
                                                    <input type="file" onChange={this.handleFile}/>
                                                </label>
                                            </MDBCol>
                                        </MDBRow>
                                    </form>
                                )
                            }}
                        </Query>
                    </MDBModalBody>
                    <MDBModalFooter>
                        <MDBBtn color="secondary" onClick={this.toggle}>Cerrar</MDBBtn>
                        <Mutation mutation = {CREATE_PROJECT} update = {this.updateCacheNewProject}>
                            {(newProject) => <input onClick = {
                                e => {
                                    e.preventDefault()
                                    if (this.state.name == '' || this.state.organization_id == '0' || this.state.context == '')
                                        return alert("Faltan campos por completar, son todos obligatorios")
                                    let tk = localStorage.getItem('tk')
                                    let name = this.state.name
                                    let org = this.state.organization_id
                                    let context = this.state.description
                                    let data = {tk, name, org, context}
                                    let status = this.state.status
                                    let article = this.state.article_id
                                    let photo_uri = this.state.photo_uri
                                    if (typeof status != undefined && status != '0') data['status'] = status
                                    if (article != '0') data['article'] = article
                                    if (photo_uri != '' && photo_uri != '0') data['photo_uri'] = photo_uri
                                    newProject({variables: data})
                                    this.toggle()
                                }
                            } type="submit" className="btn" value="Crear"/> }
                        </Mutation>
                    </MDBModalFooter>
                </MDBModal>
            </MDBContainer>
        )
    }
}

export default ModalCreateProject
