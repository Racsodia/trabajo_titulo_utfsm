import React from 'react';
import {MDBContainer, MDBRow, MDBCol, MDBBtn, MDBModal, MDBModalBody, MDBModalHeader, MDBModalFooter} from 'mdbreact'
import UserChallenges from '../components/UserChallenges';
import KnowledgeAlbum from '../components/KnowledgeAlbum';
import '../../sass/SaludMejor.css'
import { Query, Mutation } from 'react-apollo';
import { GET_USER } from '../queries';
import Loading from '../components/Loading';
import { EDIT_USER } from '../mutations';


class Profile extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            user: [],
            organizations: props.organizations,
            position: '',
            org: '0',
            isEdit: false,
            modal: false
        };
        this.renderPublications = this.renderPublications.bind(this);
    }
    toggle = () => {
        this.setState({
          modal: !this.state.modal
        });
      }
    showOrganization = (organization) =>{
        if (organization != null) return organization.name
        else return 'Sin organización'
    }
    renderPublications (){
        if(this.state.user.verified == "yes"){
            return (
                <MDBContainer className="border-profile mt-3" >
                <MDBRow  >
                    <MDBCol size="10">
                        <h5>Mis publicaciones</h5>
                        <MDBContainer>
                            <KnowledgeAlbum rendermode={1} user_id = {this.state.user.id} ></KnowledgeAlbum>
                        </MDBContainer>
                    </MDBCol>
                </MDBRow>
                </MDBContainer>
            )
        }
        else{
            <p>Solo perfiles verificados pueden publicar conocimientos. Envía un correo de contacto para verificar tu perfil</p>
        }
    }
    editPosition = (e) =>{
        e.preventDefault()
        this.setState({isEdit:true})
    }
    handlePositionChange = e =>{
        this.setState({
            position: e.target.value
        })
    }
    handleOrgChange = e =>{
        this.setState({
            org: e.target.value
        })
    }
    handleEditPosition = (id, organizations) =>{
        return(
            <MDBContainer>
                <MDBBtn onClick={this.toggle} color = 'secondary'>Editar</MDBBtn>
                <MDBModal isOpen={this.state.modal} toggle={this.toggle}>
                    <MDBModalHeader toggle={this.toggle}>Editar datos</MDBModalHeader>
                    <MDBModalBody>
                        <form>
                            <input type="text"
                                placeholder = "Puesto de trabajo"
                                className ="title w-75"
                                maxLength="40"
                                value={this.state.position}
                                onChange={this.handlePositionChange}
                            />
                            <select value={this.state.org} onChange={this.handleOrgChange}>
                                <option value="0">Institución</option>
                                <option value='otra'>Otra</option>
                                {organizations.map(c => {
                                    return <option key={c.id} value={c.id}>{c.name}</option>
                                })}
                            </select>
                        </form>
                    </MDBModalBody>
                    <MDBModalFooter>
                        <Mutation mutation = {EDIT_USER}>
                            {editUser => <MDBBtn onClick = {
                                e => {
                                    e.preventDefault()
                                    let position = this.state.position
                                    let organization_id = this.state.org
                                    let data = {id: id}
                                    if (position != null && typeof position != 'undefined')
                                        data['position'] = position
                                    if (organization_id != null && typeof organization_id != 'undefined' && organization_id != 0 && organization_id != '0')
                                        data['organization_id'] = organization_id
                                    if (organization_id == 'otra')
                                        data['organization_id'] = null
                                    
                                    editUser({variables: data})
                                    this.setState({isEdit: false})
                                    this.toggle()
                                }
                            } color="secondary">Guardar cambios</MDBBtn>}
                        </Mutation>
                        <MDBBtn color="primary" onClick={this.toggle}>Cancelar</MDBBtn>
                    </MDBModalFooter>
                </MDBModal>
            </MDBContainer>
        )
    }
    render() {
        let id = parseInt(document.getElementById('app').dataset.user)
        return (
            <Query query = {GET_USER} variables = {{id}}>
                {({ loading, error, data: {users, organizations}}) => {
                    if (loading) return <Loading/>
                    if (error) return 'Error'

                    let user = users.data[0]
                    let id = user.id
                    let name = user.name
                    let photo_uri = user.photo_uri
                    let organization = user.organization
                    let verified = user.verified
                    let org_admin = user.org_admin
                    let position = user.position
                    let challenges = user.challenges
                    organizations = organizations.data

                    return (
                        <MDBContainer className="pt-3">
                            <MDBContainer>
                                <MDBContainer>
                                <MDBContainer>
                                <MDBContainer>
                                <MDBContainer className="mt-0">
                                <MDBContainer className="mt-0">
                                <MDBContainer className="pt-0 border-profile">
                                    <MDBRow>
                                        <MDBCol size = "sm-10" className="text-right bg02">
                                            <MDBRow>
                                                <MDBCol size="sm-2" className="text-left">{this.handleEditPosition(id, organizations)}</MDBCol>
                                                <MDBCol size="sm-10"><MDBContainer ><h3>{name}</h3></MDBContainer></MDBCol>
                                            </MDBRow>
                                        </MDBCol>
                                        <MDBCol  size ="sm-2" className="text-center profile-img-border">
                                            <img className="br-50 profile-img " src={photo_uri} alt="foto_perfil"/>
                                        </MDBCol>
                                    </MDBRow>
                                    <MDBRow className="pt-2" >
                                        <MDBCol  size="sm-5" className="text-right"> <b>Trabajo:</b> </MDBCol>
                                        <MDBCol size="sm-3" className="text-left">{(position == "" || position == null)? "No definido":position}</MDBCol>
                                    </MDBRow>
                                    <MDBRow >
                                        <MDBCol className="text-right" size="sm-5"> <b>Institución:</b></MDBCol>
                                        <MDBCol size="sm-5">{this.showOrganization(organization)}</MDBCol>
                                    </MDBRow>
                                    <MDBRow >
                                        <MDBCol className="text-right" size="sm-5"> <b>¿Pertenencia a organización verificada?:</b> </MDBCol>
                                        <MDBCol size="sm-7">
                                        {(verified == "no")?"No":"Sí"}
                                        </MDBCol>
                                    </MDBRow>
                                    <MDBRow >
                                        <MDBCol className="text-right" size="sm-5"> <b>¿Administrador de organización?:</b> </MDBCol>
                                        <MDBCol size="sm-7">
                                        {(org_admin == "no")?"No":"Sí"}
                                        </MDBCol>
                                    </MDBRow>
                                    </MDBContainer>
                                    <MDBContainer className="border-profile mt-3" >
                                        <MDBRow  >
                                            <MDBCol size="sm-10">
                                                <h5>Mis desafíos</h5>
                                                <UserChallenges user_id={id} rendermode={1} challenges = {challenges}></UserChallenges>
                                            </MDBCol>
                                        </MDBRow>
                                    </MDBContainer>

                                    { this.renderPublications()}

                                    </MDBContainer>
                                    </MDBContainer>
                                    </MDBContainer>
                                    </MDBContainer>
                                </MDBContainer>
                            </MDBContainer>
                        </MDBContainer>
                    )
                }}
            </Query>
        )
    }
}

export default Profile;



