import React from 'react';
import {MDBContainer,MDBRow,MDBCol,MDBCard} from 'mdbreact'
import OrganizationButton from './OrganizationButton.jsx';

import ReadMoreReact from 'read-more-react';
import { ORGANIZATIONS_PAGE } from '../queries.js';

import ModalCreateOrganization from './ModalCreateOrganization.jsx'

class OrganizationsAlbum extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            organizations: this.props.organizations,
            name: '',
            description: '',
            mission: '',
            vision:'',
            logo_uri: '',
            photo_uri: props.photo_uri,
            webpage:'',
            rendermode: props.rendermode,
            isEdit: false,
            isCreate: false,
            isOpen: false,
            updated: false
        };
    }

    componentDidMount() {
        if (this.state.organizations !== undefined) this.setState({isOpen: true})
    }
    createOrganization = e =>{
        e.preventDefault()
        this.setState({
            isEdit:true,
        })
    }
    handleFile = e =>{
        e.preventDefault()
        let formdata = new FormData()
        formdata.append('access_token',localStorage.getItem("tk"))
        formdata.append('file',e.target.files[0])

        axios.post(urls.prefix + urls.docsCreate,formdata)
        .then(response =>{
            this.setState({logo_uri: response.data.uri})
        })
        .catch(error =>{console.log(error)})
    }
    handleName = e =>{
        this.setState({
            name : e.target.value
        })
    }
    handleDescription = d =>{
        console.log(d.target.value)
        this.setState({
            description: d.target.value
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
    organizationForm = () =>{
        return(
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
                        <Mutation mutation = {ORG_CREATE} update = {this.updateCache}>
                            {(newMutation) => <input type="submit" value="Crear" onClick = {
                                (e) => {
                                    e.preventDefault()
                                    let name = this.state.name
                                    let mission = this.state.mission
                                    let description = this.state.description
                                    let vision = this.state.vision
                                    let photo_uri = this.state.logo_uri
                                    photo_uri = "https://lorempixel.com/600/600/business/?16533"
                                    let webpage = this.state.webpage
                                    let data = {name, mission, description, vision, photo_uri, webpage}
                                    console.log(data)
                                    if (name == '' || mission == '' || description == '' || vision == '' || photo_uri == '' || webpage == '')
                                        alert ("Todos los campos son requeridos")
                                    else newMutation({variables: data})
                                }
                            }/>}
                        </Mutation>
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
        )
    }

    render() {
        var organizations = this.props.organizations
        if(this.state.rendermode == 1){
            return (
                <MDBContainer>
                    <h5>Panel de organizaciones</h5>
                    <MDBRow>
                        <MDBCol size="sm-1">ID: </MDBCol>
                        <MDBCol size="sm-2">Logo: </MDBCol>
                        <MDBCol size="sm-3">Nombre </MDBCol>
                        <MDBCol size="sm-4">Descripción: </MDBCol>
                        <MDBCol size = "sm-1"><ModalCreateOrganization update = {this.updateCacheCreate} /></MDBCol>
                    </MDBRow>
                    <hr/>
                    <MDBRow>
                        {organizations.map(o => {
                            return (
                                <OrganizationButton key={o.id} organization={o} edit = {this.editOrganization} rendermode={this.state.rendermode}/>
                            )
                        })}
                    </MDBRow>
                </MDBContainer>
            )
        }
        if(this.state.rendermode == 2){
            return(
                <MDBContainer className="d-flex flex-wrap">
                    {
                        organizations.map((e)=>{
                            return(
                                <MDBContainer key={e.id} className="col-md-3">
                                    <MDBContainer >
                                        <MDBCard className = "card-body">
                                                <a href = {'organizaciones/'+e.id}>
                                                    <MDBRow className="mt-1">
                                                        <MDBCol size="sm-12">
                                                            <img src={e.photo_uri} alt="foto" className="w-100"/>
                                                        </MDBCol>
                                                    </MDBRow>
                                                    <MDBRow className="mt-1">
                                                        <MDBCol size="sm-12">
                                                            <b>{e.name}</b>
                                                        </MDBCol>
                                                    </MDBRow>
                                                </a>
                                                <MDBRow className="mt-1">
                                                    <MDBCol size="sm-12">
                                                        <a href={e.webpage} target = "_blank" rel="noopener noreferrer"> {e.webpage} </a>
                                                    </MDBCol>
                                                </MDBRow>
                                                <MDBRow className="mt-1">
                                                    <MDBCol size="sm-12">
                                                        <div className = 'scrollDiv'>
                                                            <ReadMoreReact min = {0} ideal = {80} max = {80} text = {e.description} readMoreText ="Leer más"/>
                                                            <p className="text-justify"></p>
                                                        </div>
                                                    </MDBCol>
                                                </MDBRow>
                                        </MDBCard>
                                    </MDBContainer>
                                </MDBContainer>
                            )
                        })
                    }
                </MDBContainer>
            )
        }
        if(this.state.rendermode == 3){
            return(
            <MDBContainer className="mt-0">
                <span> <b> También puedes seguir: </b></span>
                <ul>
                    {organizations.map((e)=>{
                        return(
                            <li key={e.id}> <a href={"/organizaciones/"+ e.id} className="a-grey"> {e.name}</a></li>
                        )
                    })}
                </ul>
            </MDBContainer>

            )
        }
    }
}

export default OrganizationsAlbum;
