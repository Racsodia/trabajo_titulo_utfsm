import React from 'react';
// import PropTypes from 'prop-types';
import {MDBContainer,MDBIcon,MDBBtn,MDBRow,MDBCol,Fa} from 'mdbreact';
import ReadMoreReact from 'read-more-react';
import User from './User';
import CommentBox from './CommentBox';
import '../../sass/SaludMejor.css'

import { Query, Mutation } from "react-apollo";
import { USERS, PUBLICATIONS_PAGE } from '../queries';
import Loading from './Loading';
import { DELETE_PUBLICATION, TOGGLE_LIKE } from '../mutations';

var moment = require('moment')

class KnowledgeButton extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            publication: props.publication,
            rendermode: props.rendermode,
            likesCount: props.publication.likes_count,
            commentsBox: false,
            user: props.user,
            query: props.query,
            onDelete: false
        }
        this.commentsButton = this.commentsButton.bind(this);
    }

    updateCache = (cache, {data: {deletePublication}}) => {
        /* const {publications} = cache.readQuery({query: this.state.query})
        cache.writeQuery({
            query: PUBLICATIONS_PAGE,
            data: {
                publications: {data: publications.data.filter(p => p.id != this.state.publication.id), __typename: "publicationPagination"}
            }
        }) */
        this.setState({onDelete: true})
    }

    updateCacheLike = (cache, {data: {toggleLike}}) => {
        this.setState({likesCount: toggleLike})
    }
    renderFile(){
        if (this.state.publication.doc_uri == null){
            return(<div></div>)
        }
        else if(this.state.publication.doc_uri !== null &&  (this.state.publication.doc_uri.indexOf(".jpg")>0 ||this.state.publication.doc_uri.indexOf(".jpeg")>0 || this.state.publication.doc_uri.indexOf(".png")>0)){
            return(
                <img className="img-max-width" src={this.state.publication.doc_uri} alt="img"/>
            )
        }
        else{
            return(
                <a href={this.state.publication.doc_uri}>Documento</a>
            )
        }
    }

    commentsButton (e) {
        e.preventDefault();
        this.setState({commentsBox: !this.state.commentsBox});
    }

    render() {
        var utcTime = moment.utc(this.state.publication.created_at)
        var localTime = utcTime.local().format('DD-MMM-YYYY hh:mm:ss A' )
        let id = this.state.publication.user.id
        if (this.state.onDelete) return null
        return (
            <Query query = {USERS} variables = {{id}}>
                {({loading, error, data: {users}}) => {
                    if (loading) return(<Loading/>)
                    if (error) return <div>Error</div>

                    let access_token = localStorage.getItem("tk")
                    let id = this.state.publication.id
                    let type = 'App\\Publication'

                    if(this.state.rendermode == 1){
                        return(
                            <MDBContainer className="w-100 shadow-container mt-3">
                                <MDBRow className="padding-text text-justify w-100">
                                { (localStorage.getItem("uTP")=="admin" || localStorage.getItem("uTP") == "super_admin")?(
                                    <MDBContainer className="w-100">
                                        <MDBRow className="w-100 ">
                                            <MDBCol size="sm-12">
                                                <User rendermode={1} user={users.data[0]}/>
                                            </MDBCol>
                                        </MDBRow>
                                        <MDBRow className="w-100 ">
                                            <MDBCol size="sm-6">
                                                <h6 className=" pt-2 h6-size ml-2">{localTime}</h6>
                                            </MDBCol>
                                            <MDBCol size="sm-6">
                                                <Mutation mutation = {DELETE_PUBLICATION} update = {this.updateCache}>
                                                    { deletePublication => <a onClick = {
                                                        () => {
                                                            if (window.confirm("¿Desea eliminar esta publicación?"))
                                                                deletePublication({ variables: {access_token, id} })
                                                        }
                                                    } className="grey-text">Eliminar publicación</a>}
                                                </Mutation>
                                            </MDBCol>
                                        </MDBRow>
                                    </MDBContainer>
                                ):(
                                    <MDBCol size="sm-12">
                                        <User rendermode={1} user={users.data[0]}/>
                                        <h6 className=" pt-2 h6-size ml-2">{localTime}</h6>
                                    </MDBCol>
                                )}
                                </MDBRow>
                                <MDBRow className="padding-text text-justify w-100">
                                    <p className=" pl-3"><b>{this.state.publication.title}</b></p>
                                </MDBRow>
                                <MDBRow className="padding-text text-justify w-100">
                                    <a className=" pl-3"><ReadMoreReact text = {this.state.publication.content} readMoreText ="Leer más"/></a>
                                </MDBRow>
                                <MDBRow className="pl-5">
                                    {this.renderFile()}
                                </MDBRow>
                                <MDBRow className="padding-text text-justify w-100">
                                    <Mutation mutation = {TOGGLE_LIKE} update = {this.updateCacheLike}>
                                        { toggleLike => <MDBBtn type="button" className="btn-comments mr-1" onClick = { () => { if (access_token != null) toggleLike({ variables: {access_token, type, id}}) } }> <Fa color="white" icon="fas fa-thumbs-up"/> {this.state.likesCount} </MDBBtn> }
                                    </Mutation>
                                    <MDBBtn type="button" className="btn-comments mr-1" onClick={this.commentsButton}> <Fa icon="fas fa-comments"/> {this.state.publication.comments_count}</MDBBtn>
                                    <MDBBtn type="button" className="btn-public-item"   onClick={this.commentsButton}> <MDBIcon icon="arrow-right"/> Comenta </MDBBtn>
                                </MDBRow>
                                {this.state.commentsBox && <CommentBox rendermode={1} commentable_id={this.state.publication.id} commentable_type="Publication"/>}
                            </MDBContainer>
                        );
                    }
                    if(this.state.rendermode == 2){
                        return(
                            <MDBRow className="mt-4">
                                <MDBRow className="padding-text text-justify w-100">
                                { (localStorage.getItem("uTP")=="admin" || localStorage.getItem("uTP") == "super_admin")?(
                                    <MDBCol size="sm-10">
                                        <User rendermode={1} user={users.data[0]}/>
                                        <h6 className=" pt-2 h6-size ml-2">{localTime}</h6>
                                        <Mutation mutation = {DELETE_PUBLICATION} update = {this.updateCache}>
                                                    { deletePublication => <a onClick = {
                                                        () => {
                                                            if (window.confirm("¿Desea eliminar esta publicación?"))
                                                                deletePublication({ variables: {access_token, id} })
                                                        }
                                                    } className="grey-text">Eliminar</a>}
                                                </Mutation>
                                        {/* <button onClick={this.deleteKnowledge}>Eliminar</button> */}
                                    </MDBCol>
                                ):(
                                    <MDBCol size="sm-12">
                                        <User rendermode={1} user={users.data[0]}/>
                                        <h6 className=" pt-2 h6-size ml-2">{localTime}</h6>
                                    </MDBCol>
                                )}
                                </MDBRow>
                                <MDBRow className="padding-text text-justify w-100">
                                    <p className=" mt-3"><b>{this.state.publication.title}</b></p>
                                </MDBRow>
                                <MDBRow className="padding-text text-justify w-100">
                                    <a className=" mt-3"><ReadMoreReact text={this.state.publication.content} readMoreText ="Leer más"/></a>
                                </MDBRow>
                                <MDBRow className="ml-3">
                                    {this.renderFile()}
                                </MDBRow>
                                <MDBRow className="padding-text text-justify w-100">
                                    <Mutation mutation = {TOGGLE_LIKE} update = {this.updateCacheLike}>
                                        { toggleLike => <MDBBtn type="button" className="btn-comments mr-1" onClick = { () => { if (access_token != null) toggleLike({ variables: {access_token, type, id}}) } }> <Fa color="white" icon="fas fa-thumbs-up"/> {this.state.likesCount} </MDBBtn> }
                                    </Mutation>
                                    <MDBBtn type="button" className="btn-comments mr-1" onClick={this.commentsButton}> <Fa icon="fas fa-comments"/> {this.state.publication.comments_count}</MDBBtn>
                                    <MDBBtn type="button" className="btn-public-item"   onClick={this.commentsButton}> Comenta <MDBIcon icon="arrow-right"/> </MDBBtn>
                                </MDBRow>
                                {this.state.commentsBox && <CommentBox rendermode={1} commentable_id={this.state.publication.id} commentable_type="Publication"/>}
                            </MDBRow>
                        );
                    }
                }}
            </Query>
        )
    }
}

export default KnowledgeButton;
