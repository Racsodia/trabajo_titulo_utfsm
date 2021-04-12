import React from 'react';
// import PropTypes from 'prop-types';
import {MDBJumbotron,MDBContainer,MDBRow,MDBCol} from 'mdbreact';

import KnowledgeAlbum from '../components/KnowledgeAlbum';
import MostCommentedPublications from '../components/MostCommentedPublications';
import ArticlesAlbum from '../components/ArticlesAlbum';
import ModalCreateKnowledge from '../components/ModalCreateKnowledge';
// import CreateKnowledge from '../components/CreateKnowledge';
import '../../sass/SaludMejor.css'

import { Query } from "react-apollo";
import { gql } from 'apollo-boost';
import { PUBLICATIONS_ARTICLE, ARTICLES_ALBUM } from '../queries';
import Loading from '../components/Loading';

class PublicationArticle extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            newPublication: props.newPublication,
            newPublicationKey: props.newPublicationsKey,
            isAlowed: false,
        };
    }

    componentWillMount(){
        if(typeof this.state.publicationKey == 'undefined'){
            if( localStorage.getItem("org") == "yes"    ||
                localStorage.getItem("uTP") == "minsal" ||
                localStorage.getItem("uTP") == "admin"  ||
                localStorage.getItem("uTP") == "super_admin" ||
                localStorage.getItem("vrf") == "yes"){
                    this.setState({
                    newPublicationKey: this.props.match.params.id,
                    isAlowed : true
                })
            }
            else{
                this.setState({
                    newPublicationKey: this.props.match.params.id
                })
            }
        }
    }
    setNewPublication = (e) =>{
        this.setState({newPublication: e, newPublicationKey: e.id})
    }
    componentDidUpdate(prevProps){
        if(this.props.newPublication !== prevProps.newPublication){
            this.setState({newPublication: typeof 'undefined'})
        }
    }
    render() {
        let article_id = this.props.match.params.id
        return (
            <MDBContainer fluid className="p-0">
                <MDBJumbotron>
                    <MDBContainer className="p-0">
                        <MDBRow>
                            <MDBCol size="sm-7">
                                {this.state.isAlowed && <ModalCreateKnowledge newPublication={this.setNewPublication}/>}
                                <hr className="hr-bar w-100"></hr>
                                <h5 className="text-center"><b>Publicaciones recientes</b></h5>
                                <hr className="hr-bar w-100"></hr>
                                <KnowledgeAlbum rendermode={1} key={this.state.publicationKey} filter = {'article'} aId = {article_id} newPublication={this.state.newPublication}/>
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
                                    <MostCommentedPublications rendermode={2}></MostCommentedPublications>
                                </MDBContainer>
                            </MDBCol>
                        </MDBRow>
                    </MDBContainer>
                </MDBJumbotron>
            </MDBContainer>

        )
    }
}

export default PublicationArticle;
