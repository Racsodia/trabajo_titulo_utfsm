import React from 'react';
import {MDBJumbotron,MDBContainer,MDBRow,MDBCol} from 'mdbreact';

import KnowledgeAlbum from '../components/KnowledgeAlbum';
import MostCommentedPublications from '../components/MostCommentedPublications';
import ArticlesAlbum from '../components/ArticlesAlbum';
import ModalCreateKnowledge from '../components/ModalCreateKnowledge';

import { Query } from "react-apollo";
import { ARTICLES_ALBUM, GET_USER } from '../queries';
import Loading from '../components/Loading';

import '../../sass/SaludMejor.css'

class Knowledge extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            newPublication: props.newPublication,
            publicationKey: props.publicationKey,
            isAlowed: false,
        };
    }

    /* static getDerivedStateFromError(error) {
        var delayInMilliseconds = 100
        setTimeout(function() {
            window.location.href = window.location.href
        }, delayInMilliseconds)
    } */

    componentWillMount(){
        if(typeof this.state.publicationKey == 'undefined'){
            if( localStorage.getItem("org") == "yes"    ||
                localStorage.getItem("uTP") == "minsal" ||
                localStorage.getItem("uTP") == "admin"  ||
                localStorage.getItem("uTP") == "super_admin" ||
                localStorage.getItem("vrf") == "yes"){
                this.setState({
                    publicationKey: localStorage.getItem("publicationID"),
                    isAlowed : true
                })
            }
            else{
                this.setState({
                    publicationKey: localStorage.getItem("publicationID")
                })
            }
        }
    }
    setNewPublication = (e) =>{
        this.setState({newPublication: e, publicationKey: e.id})
    }
    componentDidUpdate(prevProps){
        if(this.props.newPublication !== prevProps.newPublication){
            this.setState({newPublication: typeof 'undefined'})
        }
    }
    render() {
        let id = document.getElementById('app').dataset.user != "null" ? parseInt(document.getElementById('app').dataset.user) : 0
        return (
            <MDBContainer fluid className="p-0">
                <MDBJumbotron>
                    <MDBContainer >
                        <MDBRow>
                            <MDBCol size="sm-7">
                                {this.state.isAlowed && <ModalCreateKnowledge/>}
                                <hr className="hr-bar w-100"></hr>
                                <h5 className="text-center"><b>Publicaciones recientes</b></h5>
                                <hr className="hr-bar w-100"></hr>
                                {id != 0 && <Query query = {GET_USER} variables = {{id}}>
                                    {({loading, error, data: {users}}) => {
                                        if (loading) return <Loading/>
                                        if (error) return 'Error'

                                        users = users.data[0]
                                        return <KnowledgeAlbum rendermode={1} user = {users}/>
                                    }}
                                </Query>}
                                {id == 0 && <KnowledgeAlbum rendermode={1} user = {null}/>}
                            </MDBCol>
                            <MDBCol size="sm-5" className="d-flex flex-column">
                                <hr className="hr-bar w-75"></hr>
                                <h5 className="text-center"><b>Explora las publicaciones</b></h5>
                                <hr className="hr-bar w-75"></hr>
                                <Query query = {ARTICLES_ALBUM}>
                                    {({ loading, error, data: {articles} }) => {
                                        if (loading) return ('Loading...');
                                        if (error) return `Error! ${error.message}`;

                                        return <ArticlesAlbum rendermode={2} articles = {articles.data} link_type="publication"/>
                                    }}
                                </Query>
                                <MDBContainer >
                                    <hr className="hr-bar w-75"></hr>
                                    <h5 className="text-center"><b>Publicaciones más comentadas</b></h5>
                                    <hr className="hr-bar w-75"></hr>
                                    <MostCommentedPublications rendermode={2}/>
                                </MDBContainer>
                            </MDBCol>
                        </MDBRow>
                    </MDBContainer>
                </MDBJumbotron>
            </MDBContainer>
        );
    }
}

export default Knowledge;
