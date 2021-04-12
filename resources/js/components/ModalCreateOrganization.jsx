import React from 'react';
import {MDBContainer,MDBRow,MDBCol,MDBBtn, MDBModal, MDBModalBody, MDBModalHeader, MDBModalFooter, Fa} from 'mdbreact';
import { Mutation } from 'react-apollo';
import { ORG_CREATE } from '../mutations';
import { ORGANIZATIONS_PAGE } from '../queries';
import urls from '../URLs.js';
import axios from 'axios';

class ModalCreateOrganization extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            rendermode: props.rendermode,
            organization: props.organization,
            id: "",
            name: "",
            mission: "",
            vision:  "",
            description: "",
            photo_uri: "",
            webpage: "",
            modal: false,
            update: props.update
        };
    }
    updateCache = (cache, {data: {newOrganization}}) => {
        const {organizations} = cache.readQuery({query: ORGANIZATIONS_PAGE})
        cache.writeQuery({
            query: ORGANIZATIONS_PAGE,
            data: {
                organizations: {data: [newOrganization].concat(organizations.data), __typename: "organizationPagination"}
            }
        })
        this.setState({organization: cache.readQuery({query: ORGANIZATIONS_PAGE}).organizations.data})
    }
    toggle = () => {
        this.setState({ modal: !this.state.modal });
    }
    handleFile = e => {
        e.preventDefault()
        let formdata = new FormData()
        formdata.append('file',e.target.files[0])

        axios.post(urls.prefix + urls.docsCreate, formdata, { headers: { Authorization: `Bearer ${localStorage.getItem("tk")}`}})
        .then(response =>{
            this.setState({logo_uri: response.data.uri})
        })
        .catch(error =>{console.log(error)})
    }
    createOrganization = e => {
        e.preventDefault()
        this.setState({ isCreate: !this.state.isCreate, isEdit: false })
    }
    editOrganization = e => {
        e.preventDefault()
        console.log(e.target.value)
        this.setState({ isEdit: !this.state.isEdit, isCreate: false })
    }
    handleName = e => {
        this.setState({
            name : e.target.value
        })
    }
    handleDescription = e =>{
        this.setState({
            description: e.target.value
        })
    }
    handlemission = e =>{
        this.setState({
            mission: e.target.value
        })
    }
    handlevision = e =>{
        this.setState({
            vision: e.target.value
        })
    }
    handleWebpage = e =>{
        this.setState({
            webpage: e.target.value
        })
    }

    render() {
        return (
            <MDBContainer>
                <MDBBtn onClick={this.toggle}>Nueva</MDBBtn>
                <MDBModal isOpen={this.state.modal} toggle={this.toggle} size="fluid">
                    <MDBModalHeader toggle={this.toggle}>Nueva organización</MDBModalHeader>
                    <MDBModalBody>
                        <form>
                            <MDBRow>
                                <MDBCol size="sm-1">
                                    <label className="file-btn-1 bg04" >
                                        <Fa icon="far fa-file" /> Logo
                                        <input type="file" onChange={this.handleFile}/>
                                    </label>
                                </MDBCol>
                                <MDBCol size="sm-3">
                                    <input type="text"
                                    placeholder="Nombre de la organización"
                                    className="title w-100"
                                    value={this.state.name}
                                    onChange={this.handleName}
                                    />
                                </MDBCol>
                                <MDBCol size="sm-4">
                                    <textarea
                                    className="form-control resize-area"
                                    rows="1"
                                    placeholder="Descripción"
                                    value={this.state.description}
                                    maxLength="10000"
                                    onChange={this.handleDescription}
                                    />
                                </MDBCol>
                                <MDBCol size="sm-3">
                                    <input type="text"
                                    className="title w-100"
                                    placeholder="https://www.ejemplo.cl"
                                    value={this.state.webpage}
                                    onChange={this.handleWebpage}
                                    />
                                </MDBCol>
                                <MDBCol size="sm-1">
                                </MDBCol>
                            </MDBRow>
                            <MDBRow>
                                <MDBCol size ="sm-4">
                                    <textarea
                                    type="text"
                                    placeholder="Misión"
                                    className="form-control resize-area"
                                    value={this.state.mission}
                                    onChange={this.handlemission}
                                    />
                                </MDBCol>
                                <MDBCol size ="sm-4">
                                    <textarea
                                    type="text"
                                    placeholder="Visión"
                                    className="form-control resize-area"
                                    value={this.state.vision}
                                    onChange={this.handlevision}
                                    />
                                </MDBCol>
                            </MDBRow>
                            <MDBRow>
                                <MDBCol size="sm-12"><p >{this.state.photo_uri}</p></MDBCol>
                            </MDBRow>
                            <hr/>
                        </form>
                    </MDBModalBody>
                    <MDBModalFooter>
                        <MDBBtn color="secondary" onClick={this.toggle}>Cerrar</MDBBtn>
                        <Mutation mutation = {ORG_CREATE} update = {this.updateCache}>
                            {(newMutation) => <MDBBtn value="Crear" onClick = {
                                (e) => {
                                    e.preventDefault()
                                    let name = this.state.name
                                    let mission = this.state.mission
                                    let description = this.state.description
                                    let vision = this.state.vision
                                    let photo_uri = this.state.logo_uri
                                    photo_uri = "https://lorempixel.com/600/600/business/?27499"
                                    let webpage = this.state.webpage
                                    let data = {name, mission, description, vision, photo_uri, webpage}
                                    if (name == '' || mission == '' || description == '' || vision == '' || photo_uri == '' || webpage == '')
                                        alert ("Todos los campos son requeridos")
                                    else if (window.confirm("Confirmar")) {
                                        newMutation({variables: data})
                                        this.toggle()
                                    }
                                }
                            }>Crear</MDBBtn>}
                        </Mutation>
                    </MDBModalFooter>
                </MDBModal>
            </MDBContainer>
        )
    }
}

export default ModalCreateOrganization
