import React, { Component } from 'react';
import { MDBRow, MDBCol, MDBContainer, MDBBtn, MDBModal, MDBModalBody, MDBModalHeader, MDBModalFooter } from 'mdbreact';
import { ORGANIZATIONS_PAGE, ALL_USERS } from '../queries';
import { Query, Mutation } from 'react-apollo';
import Loading from './Loading';
import { EDIT_USER, DELETE_USER } from '../mutations';

class EditPopup extends Component {
    constructor(props) {
        super(props);
        this.state = {
            modal: false,
            user: props.user,
            rendermode: props.rendermode,
            isOpen: false,
            position: props.user.position,
            organization: props.user.organization,
            orgId: 0,
            orgAdmin: props.user.org_admin,
            verified: props.user.verified,
            type: props.user.type,
            update: props.update,
            page: props.page
        }
        this.toggle = this.toggle.bind(this)
    }

    updateEdit = (cache, {data: {editUser}}) => {
        /* const {users} = cache.readQuery({query: ALL_USERS})
        cache.writeQuery ({
            query: ALL_USERS,
            data: {
                projects: {data: projects.data.concat(editUser), __typename: 'userPagination'}
            }
        }) */
        document.getElementById('position'+editUser.id).innerHTML = editUser.position
        document.getElementById('organization'+editUser.id).innerHTML = this.showOrganization(editUser.organization)
        document.getElementById('verified'+editUser.id).innerHTML = this.capitalize(editUser.verified)
        document.getElementById('type'+editUser.id).innerHTML = editUser.type
    }
    updateDelete = (cache, {data: {deleteUser}}) => {
        //window.location.reload()
        const {users} = cache.readQuery({query: ALL_USERS, variables: {limit: 15, page: parseInt(this.state.page)}})
        cache.writeQuery ({
            query: ALL_USERS,
            variables: {limit: 15, page: parseInt(this.state.page)},
            data: {
                projects: {data: users.data.filter(user => {return user.id != deleteUser}), __typename: 'userPagination'}
            }
        })
        this.state.update(deleteUser)
    }
    capitalize = (s) => {
        if (typeof s !== 'string') return ''
        return s.charAt(0).toUpperCase() + s.slice(1)
      }
    toggle () {
        this.setState({
            modal: !this.state.modal,
            isOpen: !this.state.isOpen
        });
    }
    showOrganization = (o) =>{
        if (o != null && typeof o != 'undefined') return o.name
        else return <p>Sin organización</p>
    }
    confirmId = (o) => {console.log(o)
        if (o != null && typeof o != 'undefined') return o.id
        else return 0
    }
    handlePosition = (e) => {
        this.setState({position: e.target.value})
    }
    handleOrganization = (e) => {
        this.setState({organization: this.showOrganization(e.target.value), orgId: e.target.value})
    }
    handleOrgAdmin = (e) => {
        this.setState({orgAdmin: e.target.value})
    }
    handleVerified = (e) => {
        this.setState({verified: e.target.value})
    }
    handleUserType = (e) => {
        this.setState({type: e.target.value})
    }

    editForm = (organizations) =>{
        if(this.state.rendermode == 1){
            return(
                <form>
                <MDBRow>
                    <MDBCol size="3">
                        Ocupación:
                        <br/>
                        <input type="text"
                            className="h-30p"
                            onChange={this.handlePosition}
                            placeholder={this.state.position}
                            value={this.state.position}
                        />
                    </MDBCol>
                    <MDBCol size="3">
                        Organización:
                        <br/><br/>
                        <select onChange={this.handleOrganization} className="w-100" defaultValue={this.confirmId(this.state.user.organization)}>
                            <option value="0">Sin organización</option>
                            {organizations.map((org) => {
                                return(<option key={org.id} value={org.id} defaultValue={org.id}>{org.name}</option>);
                            })}
                        </select>
                    </MDBCol>
                    <MDBCol size="2">
                        Org. admin:
                        <br/><br/>
                        <select onChange={this.handleOrgAdmin} defaultValue={this.state.orgAdmin}>
                            <option value="yes">Sí</option>
                            <option value="no">No</option>
                        </select>
                    </MDBCol>
                    <MDBCol size="1">
                        Verificado:
                        <br/><br/>
                        <select name="verified" id="verified" onChange={this.handleVerified} defaultValue={this.state.verified}>
                            <option value="yes">Sí</option>
                            <option value="no" >No</option>
                        </select>
                    </MDBCol>
                    <MDBCol size="2">
                        Tipo de usuario:
                        <br/><br/>
                        <select name="user_type" id="user_type" onChange={this.handleUserType} defaultValue={this.state.type}>
                            <option value="admin">Admin</option>
                            <option value="minsal">Minsal</option>
                            <option value="general">General</option>
                        </select>
                    </MDBCol>
                    <MDBCol size="1">
                        <br/><br/>
                        <Mutation mutation = {DELETE_USER} update = {this.updateDelete}>
                            {deleteUser => <button onClick = {
                                (e) => {
                                    e.preventDefault()
                                    if (window.confirm('¿Realmente desea eliminar este usuario?')) {
                                        deleteUser({variables: {id: this.state.user.id}})
                                        this.toggle()
                                    }
                                }
                            }>Eliminar</button>}
                        </Mutation>
                    </MDBCol>
                </MDBRow>
            </form>
            )
        }

        if(this.state.rendermode == 2){
            return (
                <form className="w-100">
                    <MDBRow className="border border-input">
                        <MDBCol size="3">
                            Organización:
                            <br/><br/>
                            <select name="organizations" onChange={this.handleOrganization} className="w-100" value={this.state.organization}>
                                <option value="0" >Ninguna</option>
                                {organizations.map((org,index)=>{
                                    return(<option key={index} value={org.id}>{org.name}</option>);

                                })}
                            </select>
                        </MDBCol>
                        <MDBCol size="2">
                            Org. admin:
                            <br/><br/>
                            <select onChange={this.handleOrgAdmin} value={this.state_orgAdmin}>
                                <option value="yes">Sí</option>
                                <option value="no">No</option>
                            </select>
                        </MDBCol>
                        <MDBCol size="1">
                            Verificado:
                            <br/><br/>
                            <select name="verified" id="verified" onChange={this.handleVerified} value={this.state_verified}>
                                <option value="yes">Sí</option>
                                <option value="no" >No</option>
                            </select>
                        </MDBCol>

                        <MDBCol size="2">
                            Tipo de usuario
                            <br/><br/>
                            <select name="user_type" id="user_type" onChange={this.handleUserType}>
                                <option value="minsal">Minsal</option>
                                <option value="general">General</option>
                            </select>
                        </MDBCol>
                        <MDBCol size = "3"></MDBCol>
                        <MDBCol size="1">
                            <br/><br/>
                            <Mutation mutation = {DELETE_USER} update = {this.updateDelete}>
                                {deleteUser => <button onClick = {
                                    (e) => {
                                        e.preventDefault()
                                        if (window.confirm('¿Realmente desea eliminar este usuario?')) {
                                            deleteUser({variables: {id: this.state.user.id}})
                                            this.toggle()
                                        }
                                    }
                                }>Eliminar</button>}
                            </Mutation>
                        </MDBCol>
                    </MDBRow>
                </form>
        )}
        if(this.state.rendermode == 3 || this.state.rendermode == 4){
            return(
                <form>
                <MDBRow>
                    <MDBCol size="3">
                        Ocupación:
                        <br/>
                        {this.state_position}
                    </MDBCol>
                    <MDBCol size="3">
                        Organización:
                        <br/><br/>
                        {this.showOrganization(this.state.organization.id)}
                    </MDBCol>
                    <MDBCol size="2">
                            Org. admin:
                        <br/><br/>
                            <select onChange={this.handleOrgAdmin} value={this.state.orgAdmin}>
                                <option value="yes">Sí</option>
                                <option value="no">No</option>
                            </select>
                    </MDBCol>
                    <MDBCol size="1">
                        Verificado:
                        <br/><br/>
                            <select name="verified" id="verified" onChange={this.handleVerified} value={this.state.verified}>
                                <option value="yes">Sí</option>
                                <option value="no" >No</option>
                            </select>
                    </MDBCol>
                    <MDBCol size="2">
                        {this.state.type}
                    </MDBCol>
                </MDBRow>
                </form>
            )
        }
    }

    render() {
        return (
            <Query query = {ORGANIZATIONS_PAGE}>
                {({loading, error, data: {organizations}}) => {
                    if (loading) return <Loading/>
                    if (error) return <div>Error</div>

                    organizations = organizations.data

                    return (
                        <MDBContainer>
                            <MDBBtn color="primary" onClick={this.toggle}>Editar</MDBBtn>
                            <MDBModal isOpen={this.state.modal} toggle={this.toggle} size="xl" centered>
                                <MDBModalHeader toggle={this.toggle}>Editar usuario</MDBModalHeader>
                                <MDBModalBody>
                                    {this.state.isOpen && this.editForm(organizations)}
                                </MDBModalBody>
                                <MDBModalFooter>
                                    <MDBBtn color="secondary" onClick={this.toggle}>Cerrar</MDBBtn>
                                    <Mutation mutation = {EDIT_USER} update = {this.updateEdit}>
                                        {editUser => <MDBBtn color="primary" onClick = {
                                            (e) => {
                                                e.preventDefault()
                                                let id = this.state.user.id
                                                let organization_id = this.state.orgId
                                                let position = this.state.position
                                                let verified = this.state.verified
                                                let org_admin = this.state.orgAdmin
                                                let type = this.state.type
                                                let data = {id}
                                                if (typeof organization_id != "undefined" && organization_id != 0 && organization_id != '0') data["organization_id"] = organization_id
                                                if (position != "") data["position"] = position
                                                if (verified != "") data["verified"] = verified
                                                if (org_admin != "") data["org_admin"] = org_admin
                                                if (type != "") data["type"] = type
                                                editUser({variables: data})
                                                this.toggle()
                                            }
                                        }>Guardar Cambios</MDBBtn>}
                                    </Mutation>
                                </MDBModalFooter>
                            </MDBModal>
                        </MDBContainer>
                    )
                }}
            </Query>
        )
    }
}

export default EditPopup;
