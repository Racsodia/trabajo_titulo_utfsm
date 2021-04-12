import React from 'react';
import {MDBContainer,MDBRow,MDBCol,MDBJumbotron} from 'mdbreact'
import axios from 'axios'
import urls from '../URLs'
import KnowledgeButton from '../components/KnowledgeButton';
import { Query, Mutation } from 'react-apollo';
import Loading from '../components/Loading';
import { ORGANIZATIONS_PROFILE } from '../queries';
import { TOGGLE_FOLLOW } from '../mutations';

var showElements = 10
class OrganizationProfile extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            organization: [],
            publications:[],
            isOrg: false,
            isFollowing: false,
        };
    }
    componentDidMount() {
        document.getElementById("of").dataset.orgs.split("-").map(o => {console.log(o)
            if (this.props.match.params.id == o) {
                this.setState({isFollowing: true})
            }
        })
    }
    editOrganization = e =>{
        e.preventDefault()
    }

    follow = e =>{
        this.setState({ isFollowing: !this.state.isFollowing })
    }
    render() {
        return (
            <Query query = {ORGANIZATIONS_PROFILE} variables = {{id: this.props.match.params.id}}>
                {({loading, error, data: {organizations}}) => {
                    if (loading) return <Loading/>
                    if (error) return 'Error'

                    let organization = organizations.data[0]

                    return (
                        <MDBContainer className="pt-5 pl-0 pr-0">
                            <MDBRow>
                                <MDBContainer className="pt-5 modal-shadow">
                                    <MDBRow>
                                        <MDBCol size="sm-6" className="text-center ">
                                            <h4>{organization.name}</h4>
                                            <img src={organization.photo_uri} alt="org_foto" className="w-75"/>
                                            <br/>
                                            {this.state.isOrg && <button className="btn" onClick={this.editOrganization}>Editar</button>}
                                            <br/>
                                            {!this.state.isOrg && !this.state.isFollowing &&
                                            <Mutation mutation = {TOGGLE_FOLLOW} update = {this.follow}>
                                                {(toggleFollow) => <button className="btn" onClick={() => toggleFollow({variables: {id: this.props.match.params.id}})}>Seguir</button>}
                                            </Mutation>}
                                            {!this.state.isOrg && this.state.isFollowing &&
                                            <Mutation mutation = {TOGGLE_FOLLOW} update = {this.follow}>
                                                {(toggleFollow) => <button className="btn" onClick={() => toggleFollow({variables: {id: this.props.match.params.id}})}>Siguiendo</button>}
                                            </Mutation>}
                                        </MDBCol>
                                        <MDBCol size="sm-6">
                                            <h5><b> Misión:</b></h5>
                                            <p className="text-justify w-75">{organization.mission}</p>
                                            <h5> <b> Visión:</b></h5>
                                            <p className="text-justify w-75">{organization.vision}</p>
                                            <h5> <b> Sobre nosotros:</b></h5>
                                            <p className="text-justify w-75">{organization.description}</p>
                                        </MDBCol>
                                    </MDBRow>
                                    <hr/>
                                    <MDBRow className="text-center">
                                        <MDBContainer className="w-75">
                                        <h4>Publicaciones de {organization.name}</h4>
                                            {
                                                this.state.publications.map((e,index)=>{
                                                    return(
                                                        <KnowledgeButton key={index} publication={e} likesCount={e.likes_count} rendermode={1}></KnowledgeButton>
                                                    )
                                                })
                                            }
                                        </MDBContainer>
                                    </MDBRow>
                                </MDBContainer>
                            </MDBRow>
                        </MDBContainer>
                    )
                }}
            </Query>
        )
    }
}

export default OrganizationProfile;
