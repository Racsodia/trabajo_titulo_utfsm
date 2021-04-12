import React from 'react';
import {MDBContainer,MDBRow,MDBCol, MDBBtn} from 'mdbreact';
import ReadMoreReact from 'read-more-react/dist/components/ReadMoreReact';
import { Mutation } from 'react-apollo';
import { DELETE_ORG, EDIT_ORG } from '../mutations';
import { ORGANIZATIONS_PAGE } from '../queries';
import ModalEditOrganization from './ModalEditOrganization';
import '../../sass/SaludMejor.css'
class OrganizationButton extends React.Component {
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
            webpage: ""
        };
    }
    updateCache = (cache, {data: {deleteOrganization}}) => {
        const {organizations} = cache.readQuery({query: ORGANIZATIONS_PAGE})
        cache.writeQuery({
            query: ORGANIZATIONS_PAGE,
            data: {
                organizations: {data: organizations.data.filter(o => o.id != deleteOrganization), __typename: "organizationPagination"}
            }
        })
        this.setState({organizations: cache.readQuery({query: ORGANIZATIONS_PAGE}).organizations.data})
    }
    deleteOrganization = () =>{
        if(window.confirm("Antes de eliminar una organización debes asegurarte de que ningún usuario esté asociado a esta. ¿Deseas eliminar la organización?")){
            return true
        }
        return false
    }
    updateBtn = (o) => {
        this.setState({organization: o})
    }

    render() {
        if(this.state.rendermode == 1 && this.state.organization.id !== null){
            return(
                <MDBContainer>
                    <MDBRow>
                        <MDBCol size="sm-1"><a href={"../organizaciones/"+this.state.organization.id}>{this.state.organization.id}</a></MDBCol>
                        <MDBCol size="sm-2"><a href={"../organizaciones/"+this.state.organization.id}><img id = {"orgImg"+this.state.organization.id} src={this.state.organization.photo_uri} alt="logo" className="h-100p"/></a></MDBCol>
                        <MDBCol size="sm-2"><a id = {"orgName"+this.state.organization.id} href={"../organizaciones/"+this.state.organization.id}>{this.state.organization.name}</a></MDBCol>
                        <MDBCol id = {"orgDesc"+this.state.organization.id} size="sm-4"><ReadMoreReact text={this.state.organization.description} readMoreText ="Leer más"/></MDBCol>
                        <MDBCol id = {"orgWeb"+this.state.organization.id} size="sm-1"><a href={this.state.organization.webpage}>Web</a></MDBCol>
                        <Mutation mutation = {DELETE_ORG} update = {this.updateCache}>
                            {deleteOrganization => <MDBCol size="sm-1"><MDBBtn onClick={
                                () => {
                                    if (this.deleteOrganization()) deleteOrganization({variables: {id: this.state.organization.id}})
                                }
                            }>Eliminar</MDBBtn></MDBCol>}
                        </Mutation>
                        <MDBCol size="sm-1"><ModalEditOrganization organization = {this.state.organization} updateBtn = {this.updateBtn}/></MDBCol>
                    </MDBRow>
                </MDBContainer>
            )
        }
        if(this.state.rendermode == 2 && this.state.organization.id !== null){
            return (
                <MDBContainer>
                    <p>{this.state.organization.name}</p>
                </MDBContainer>
            )
        }
        if(this.state.org_id == null){
            return(
                <MDBContainer><p>Sin organizaciones</p></MDBContainer>
            )
        }
    }
}

export default OrganizationButton;
