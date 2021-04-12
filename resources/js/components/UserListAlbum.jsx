import React from 'react';
import {MDBContainer, MDBRow,MDBCol,MDBBtn,Fa} from 'mdbreact';
import axios from 'axios'
import urls from '../URLs'

import '../../sass/SaludMejor.css'

class UserListAlbum extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            user: props.user,
            organizations: props.organizations,
            rendermode: props.rendermode,
            user_organization: '',
            user_position: '',
            user_type: '',
            user_verified: '',
            user_orgAdmin: '',
            isEdit: false,
        };
    }

    handleOrganization = (e) =>{
        e.preventDefault();
        console.log("user_organization",e)
        this.setState({user_organization: e.target.value})
    }

    handlePosition = (e) =>{
        e.preventDefault();
        console.log("user_position",e)
        this.setState({user_position: e.target.value})
    }

    handleUserType = (e)=>{
        e.preventDefault();
        console.log("user_type",e)
        this.setState({user_type: e.target.value})
    }

    handleVerified = (e) =>{
        e.preventDefault();
        console.log("user_verified",e)
        this.setState({user_verified: e.target.value})
    }
    handleOrgAdmin = e =>{
        e.preventDefault()
        console.log("user_orgAdmin: ",e)
        this.setState({user_orgAdmin: e.target.value})
    }

    editUser = (e) =>{
        e.preventDefault();
        if(this.state.user.organization_id == null){
            this.setState({
                user_organization: '0',
                user_position: this.state.user.position,
                user_type: this.state.user.type,
                user_verified: this.state.user.verified,
                user_orgAdmin: this.state.user.org_admin,
                isEdit: !this.state.isEdit
            })
        }else{
            this.setState({
                user_organization: this.state.user.organization_id,
                user_position: this.state.user.position,
                user_type: this.state.user.type,
                user_verified: this.state.user.verified,
                user_orgAdmin: this.state.user.org_admin,
                isEdit: !this.state.isEdit
            })
        }
    }

    showOrganization = (id) =>{
        if(id != null){
            const organization = this.state.organizations.filter((index,j) => id == j+1)
            if(typeof organization[0] != 'undefined'){
                return(
                    organization[0].name
                )
            }
            else{
                return (
                    <p>Sin organización</p>
                )
            }

        }
        else{
            return (
                <p>Sin organización</p>
            )
        }
    }
    deleteUser = e =>{
        e.preventDefault()
        if(window.confirm("¿Desea eliminar al usuario "+this.state.user.name+"?")){
            axios.delete(urls.prefix + urls.users + this.state.user.id,
                {
                    params:{
                        'access_token' : localStorage.getItem("tk")
                    }
                })
                .then(response =>{
                    window.location.reload();
                })
                .catch(error => {console.log(error)})
        }
    }
    handleSubmit = e =>{
        e.preventDefault()
            if(window.confirm("¿Confirmas la edición del usuario?")){
                if(localStorage.getItem("uTP") == "super_admin"){
                    axios.post(urls.prefix + urls.users + this.state.user.id + urls.edit, {
                        'access_token' : localStorage.getItem("tk"),
                        'organization_id' : this.state.user_organization,
                        'postition': this.state.user_position,
                        'type': 'super_admin',
                    })
                        .then(response =>{
                            console.log("Edit org y postition",response)
                            return axios.post(urls.prefix + urls.users + this.state.user.id + urls.make,{
                                'access_token': localStorage.getItem("tk"),
                                'type'  : this.state.user_type
                            })
                                .then(response =>{
                                    console.log( "edito type",response)

                                    if(this.state.user_verified == "yes"){
                                        return axios.post(urls.prefix + urls.users + this.state.user.id + urls.verifyOrg,
                                            {
                                                'access_token' : localStorage.getItem("tk")
                                            })
                                            .then(response =>{
                                                console.log("toggle verified",response)

                                                if(this.state.user_orgAdmin == "yes"){
                                                    return axios.post(urls.prefix + urls.users + this.state.user.id + urls.make + urls.orgAdmin,{
                                                        'access_token' : localStorage.getItem("tk")
                                                    })
                                                        .then(response =>{

                                                            console.log("toggle admin",response)
                                                        })
                                                }
                                            })
                                    }
                                })
                        })

                }
                else if(localStorage.getItem("uTP") == "admin"){
                    console.log("editando")
                    let formData = new FormData()
                    formData.append('access_token',localStorage.getItem("tk"))
                    formData.append('organization_id',this.state.user_organization)
                    formData.append('postition',this.state.user_position)
                    formData.append('type',this.state.user_type)
                    console.log(formData)
                    axios.post(urls.prefix + urls.users + this.state.user.id + urls.edit, formData)
                        .then(response =>{
                           console.log(response)
                            return axios.post(urls.prefix + urls.users + this.state.user.id + urls.make,{
                                'access_token': localStorage.getItem("tk"),
                                'type'  : this.state.user_type
                            })
                                .then(response =>{
                                    console.log(response)

                                    if(this.state.user_verified == "yes"){
                                        return axios.post(urls.prefix + urls.users + this.state.user.id + urls.verifyOrg,
                                            {
                                                'access_token' : localStorage.getItem("tk")
                                            })
                                            .then(response =>{
                                                console.log(response)

                                                if(this.state.user_orgAdmin == "yes"){
                                                    return axios.post(urls.prefix + urls.users + this.state.user.id + urls.make + urls.orgAdmin,{
                                                        'access_token' : localStorage.getItem("tk")
                                                    })
                                                        .then(response =>{
                                                            window.location.reload()
                                                        }).catch(error=>{console.log(error)})
                                                }
                                            })
                                    }
                                })
                        })

                }
                else if(localStorage.getItem("uTP") == "minsal"){
                    if(this.state.user_verified == "yes"){
                        axios.post(urls.prefix + urls.users + this.state.user.id + urls.verifyOrg,
                            {
                                'access_token' : localStorage.getItem("tk")
                            })
                            .then(response =>{
                                if(this.state.user_orgAdmin == "yes"){
                                    return axios.post(urls.prefix + urls.users + this.state.user.id + urls.make + urls.orgAdmin,{
                                        'access_token' : localStorage.getItem("tk")
                                    })
                                        .then(response =>{
                                        })
                                        .catch(error=>{console.log(error)})
                                }
                            }).catch(error=>{console.log(error)})
                    }
                }else{
                    return alert("No tienes permiso para realizar esta acción")
                }
            }
        }

    editForm = () =>{
        if(this.state.rendermode == 1){
            return(
                <form onSubmit={this.handleSubmit}>
                <MDBRow>
                    <MDBCol size="1"></MDBCol>
                    <MDBCol size="1"></MDBCol>
                    <MDBCol size="3">
                    Ocupación:
                    <input type="text"
                    className="h-30p"
                    onChange={this.handlePosition}
                    placeholder={this.state.user.position}
                    value={this.state.user_position}
                    />
                    </MDBCol>
                    <MDBCol size="2">
                        <MDBContainer>
                        Organización:
                            <select onChange={this.handleOrganization} className="w-100" value={this.state.user_organization}>
                                <option value="0">Sin organización</option>
                                {this.state.organizations.map((org,index)=>{
                                    return(<option key={index} value={org.id}>{org.name}</option>);
                                })}
                            </select>
                        </MDBContainer>
                    </MDBCol>
                    <MDBCol size="2">
                        <MDBContainer>
                            Org. admin:
                            <select onChange={this.handleOrgAdmin} value={this.state.user_orgAdmin}>
                                <option value="yes">Sí</option>
                                <option value="no">No</option>
                            </select>
                        </MDBContainer>
                    </MDBCol>
                    <MDBCol size="1">
                        <MDBContainer>
                        Verificado:
                            <select name="verified" id="verified" onChange={this.handleVerified} value={this.state.user_verified}>

                                <option value="yes">Sí</option>
                                <option value="no" >No</option>
                            </select>
                        </MDBContainer>
                    </MDBCol>
                    <MDBCol size="1">
                        <MDBContainer>
                        Tipo de usuario:
                            <select name="user_type" id="user_type" onChange={this.handleUserType} value={this.state.user_type}>
                                <option value="admin">Admin</option>
                                <option value="minsal">Minsal</option>
                                <option value="general">General</option>
                            </select>
                        </MDBContainer>
                    </MDBCol>
                    <MDBCol size="1"><MDBContainer><input type="submit" value="Enviar cambios"/>
                                                <button onClick={this.deleteUser}>Eliminar</button></MDBContainer></MDBCol>
                </MDBRow>
            </form>
            )
        }

        if(this.state.rendermode == 2){
            return(
                <form onSubmit={this.handleSubmit} className="w-100">
                <MDBRow className="border border-input">

                    <MDBCol size="sm-3">
                        <MDBContainer>
                        Organización:
                            <select name="organizations" onChange={this.handleOrganization} className="w-100" value={this.state.user_organization}>
                                <option value="0" >Ninguna</option>
                                {this.state.organizations.map((org,index)=>{
                                    return(<option key={index} value={org.id}>{org.name}</option>);

                                })}
                            </select>
                        </MDBContainer>
                    </MDBCol>
                    <MDBCol size="sm-2">
                        <MDBContainer>
                            Org. admin:
                            <br/>
                            <select onChange={this.handleOrgAdmin} value={this.state.user_orgAdmin}>
                                <option value="yes">Sí</option>
                                <option value="no">No</option>
                            </select>
                        </MDBContainer>
                    </MDBCol>
                    <MDBCol size="sm-2">
                        <MDBContainer>
                        Verificado:
                        <br/>
                            <select name="verified" id="verified" onChange={this.handleVerified} value={this.state.user_verified}>
                                <option value="yes">Sí</option>
                                <option value="no" >No</option>
                            </select>
                        </MDBContainer>
                    </MDBCol>

                    <MDBCol size="sm-2">
                        <MDBContainer>
                        Tipo de usuario
                            <select name="user_type" id="user_type" onChange={this.handleUserType}>
                                <option value="minsal">Minsal</option>
                                <option value="general">General</option>
                            </select>
                        </MDBContainer>
                    </MDBCol>
                    <MDBCol size="sm-2">
                        <MDBContainer>
                            <input type="submit" value="Enviar cambios"/>
                        </MDBContainer>
                    </MDBCol>
                    <MDBCol size="sm-1">
                        <MDBContainer>
                            <button onClick={this.deleteUser}>Eliminar</button>
                        </MDBContainer>
                    </MDBCol>
                </MDBRow>
                </form>
        )}
        if(this.state.rendermode == 3 || this.state.rendermode == 4){
            return(
                <form onSubmit={this.handleSubmit}>
                <MDBRow>
                    <MDBCol size="1"></MDBCol>

                    <MDBCol size="3"><MDBContainer>{this.state.user.position}</MDBContainer></MDBCol>
                    <MDBCol size="2"><MDBContainer>{this.showOrganization(this.state.user.organization_id)}</MDBContainer>
                    </MDBCol>
                    <MDBCol size="3">
                        <MDBContainer>
                            Org. admin:
                            <select onChange={this.handleOrgAdmin} value={this.state.user_orgAdmin}>
                                <option value="yes">Sí</option>
                                <option value="no">No</option>
                            </select>
                        </MDBContainer>
                    </MDBCol>
                    <MDBCol size="1">
                        <MDBContainer>
                            <select name="verified" id="verified" onChange={this.handleVerified} value={this.state.user_verified}>
                                <option value="yes">Sí</option>
                                <option value="no" >No</option>
                            </select>
                        </MDBContainer>
                    </MDBCol>
                    <MDBCol size="1">
                        <MDBContainer>{this.state.user.type}</MDBContainer>
                    </MDBCol>
                    <MDBCol size="1"><MDBContainer><input type="submit" value="Enviar cambios"/></MDBContainer></MDBCol>
                </MDBRow>
                </form>
            )
        }
    }
    render() {
        return (
                <MDBRow className="text-left border-bottom">
                <MDBCol size="1"><MDBContainer>{this.state.user.id}</MDBContainer></MDBCol>
                <MDBCol size="1"><MDBContainer><img className="img-size" src={this.state.user.photo_uri} alt="foto"/></MDBContainer></MDBCol>
                <MDBCol size="2"><MDBContainer>{this.state.user.name}</MDBContainer></MDBCol>
                <MDBCol size="2"><MDBContainer>{this.state.user.position}</MDBContainer></MDBCol>
                <MDBCol size="2"><MDBContainer>{this.showOrganization(this.state.user.organization_id)} </MDBContainer></MDBCol>
                <MDBCol size="1"><MDBContainer>{(this.state.user.verified == "yes")?"Sí":"No"}</MDBContainer></MDBCol>
                <MDBCol size="2"><MDBContainer>{this.state.user.type}<MDBBtn onClick={this.editUser}>Editar</MDBBtn></MDBContainer></MDBCol>
                {this.state.isEdit && this.editForm()}
                </MDBRow>
        );
    }
}

UserListAlbum.propTypes = {};

export default UserListAlbum;

