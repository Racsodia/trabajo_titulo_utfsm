import React from 'react';
import {MDBContainer,MDBBtn,MDBRow,MDBCol,Fa} from 'mdbreact';
import ReadMoreReact from 'read-more-react';
import CommentBox from './CommentBox';
import User from './User';

import { Query, Mutation } from "react-apollo";
import { USERS } from '../queries';
import Loading from '../components/Loading';
import { DELETE_CHALLENGE, TOGGLE_LIKE } from '../mutations';

import '../../sass/ChallengesButton.css';
import '../../sass/SaludMejor.css'

var moment = require('moment')

const updateCache = (cache, {data: {deleteChallenge}}) => {
    window.location.reload() // TODO: agregar el código comentado una vez que la query devuelva el id del registro eliminado
    const  {publications}  = cache.readQuery({query: PUBLICATIONS_PAGE})
    cache.writeQuery({
        query: PUBLICATIONS_PAGE,
        data: {
            publications: {data: [newPublication].concat(publications.data), __typename: "publicationPagination"}
        }
    })
}

class ChallengesButton extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            challenge: props.challenge,
            likesCount: props.challenge.likes_count,
            commentsCount: props.challenge.comments_count,
            user_id: props.challenge.user.id,
            rendermode: props.rendermode,
            commentsBox: false,
        };

        this.commentsButton = this.commentsButton.bind(this);
        this.renderFile = this.renderFile.bind(this);
    }
    updateCacheLike = (cache, {data: {toggleLike}}) => {
        this.setState({likesCount: toggleLike})
    }
    commentsButton (e) {
        e.preventDefault();
        this.setState({commentsBox: !this.state.commentsBox});
    }

    renderFile(){
        if (this.state.challenge.doc_uri == null) return null
        else if(this.state.challenge.doc_uri !== null &&  (this.state.challenge.doc_uri.indexOf(".jpg") > 0 || this.state.challenge.doc_uri.indexOf(".jpeg") > 0 || this.state.challenge.doc_uri.indexOf(".png") > 0))
            return <img className="img-max-width" src={this.state.challenge.doc_uri} alt="img"/>
        else return <a href={this.state.challenge.doc_uri}>{this.state.challenge.doc_uri}</a>
    }
    updateCommentCount = e => { this.setState({ commentsCount: e }) }

    render() {
        var utcTime = moment.utc(this.state.challenge.created_at)
        var localTime = utcTime.local().format('DD-MMM-YYYY hh:mm:ss A')
        let id = parseInt(this.state.user_id)

        return (
            <Query query = {USERS} variables = {{id: id}}>
                {({loading, error, data: {users}}) => {
                    if (loading) return (<Loading/>)
                    if (error) return <div>Error</div>

                    let access_token = localStorage.getItem("tk")
                    let id = this.state.challenge.id
                    let type = 'App\\Challenge'

                    if (this.state.rendermode == 1){
                        return (
                            <MDBContainer className="w-100 shadow-container mt-3">
                                <MDBRow className="text-justify w-100">
                                    { (localStorage.getItem("uTP") == "admin" || localStorage.getItem("uTP") == "super_admin") ? (
                                        <MDBContainer className="w-100">
                                            <MDBRow className="w-100 ">
                                                <MDBCol size="sm-12">
                                                    <User rendermode={1} user = {users.data[0]}/>
                                                </MDBCol>
                                            </MDBRow>
                                            <MDBRow className="w-100 ">
                                                <MDBCol size="sm-6">
                                                    <h6 className=" pt-2 h6-size ml-2">{localTime}</h6>
                                                </MDBCol>
                                                <MDBCol size="sm-6">
                                                    <Mutation mutation = {DELETE_CHALLENGE} update = {updateCache}>
                                                        { deleteChallenge => <a onClick = {
                                                            () => { if (window.confirm("¿Desea eliminar este desafío?")) deleteChallenge({ variables: {access_token, id}}) }
                                                        }
                                                        className="grey-text">Eliminar desafío</a>}
                                                    </Mutation>
                                                </MDBCol>
                                            </MDBRow>
                                        </MDBContainer>
                                    ) : (
                                        <MDBCol size="sm-12">
                                            <User rendermode={1} user = {users.data[0]}/>
                                            <h6 className=" pt-2 h6-size ">{localTime}</h6><hr/>
                                        </MDBCol>
                                    )}
                                </MDBRow>
                                <MDBRow className="text-justify w-100">
                                    <MDBCol size="sm-12" >
                                    <hr/>
                                    <ReadMoreReact
                                        text={this.state.challenge.context}
                                        readMoreText ="Leer más"
                                    /> <br/>
                                    </MDBCol>
                                </MDBRow>
                                <MDBRow className="text-justify w-100">
                                    <MDBCol size="sm-12">
                                        <ReadMoreReact text={this.state.challenge.challenge} readMoreText ="Leer más"/>
                                    </MDBCol>
                                </MDBRow>
                                <MDBRow className="w-100">
                                    <MDBCol size="sm-12" className="ml-3">
                                        {this.renderFile()}
                                    </MDBCol>
                                </MDBRow>
                                <MDBRow className="text-justify w-100">
                                    <MDBCol sixe="sm-12" className="mt-3">
                                        <Mutation mutation = {TOGGLE_LIKE} update = {this.updateCacheLike}>
                                            { (toggleLike, {data}, loading) =>
                                            <MDBBtn className="btn-comments mr-1" type="comments-icon"
                                                onClick = { () => { toggleLike({ variables: {type, id}}) } }
                                            >
                                                <Fa color="white" icon="fas fa-thumbs-up"/> {this.state.likesCount}
                                            </MDBBtn>
                                            }
                                        </Mutation>
                                        <MDBBtn className="btn-comments mr-1" type="comments-icon" onClick={this.commentsButton}> <Fa icon="fas fa-comments"/> {this.state.commentsCount}</MDBBtn>
                                        <MDBBtn className="btn-public-item" onClick={this.commentsButton}> <Fa icon="far fa-comment-dots"/>Comenta  </MDBBtn>
                                    </MDBCol>
                                </MDBRow>
                                {this.state.commentsBox && <CommentBox commentable_id={this.state.challenge.id} commentable_type="Challenge" rendermode={1} updateCommentCount = {this.updateCommentCount} /> }
                            </MDBContainer>
                        );
                    }
                    if(this.state.rendermode ==2){
                        return(
                            <div>
                            <MDBRow className="w-100 contents">
                            { (localStorage.getItem("uTP")=="admin" || localStorage.getItem("uTP") == "super_admin")?(
                                <div className="w-100">
                                    <MDBRow className="w-100 ">
                                        <MDBCol size="sm-12">
                                            <User rendermode={3} user = {users.data[0]}/>
                                        </MDBCol>
                                    </MDBRow>
                                    <MDBRow className="w-100 ">
                                        <MDBCol size="sm-6">
                                            <h6 className="h6-size ">{localTime}</h6>
                                        </MDBCol>
                                        <MDBCol size="sm-6">
                                            <Mutation mutation = {DELETE_CHALLENGE} update = {updateCache}>
                                                { deleteChallenge => <a onClick = {
                                                    () => { if (window.confirm("¿Desea eliminar este desafío?")) deleteChallenge({ variables: {access_token, id}}) }
                                                }
                                                className="grey-text">Eliminar desafío</a>}
                                            </Mutation>
                                        </MDBCol>
                                    </MDBRow>
                                </div>

                                ):(
                                    <MDBCol size="sm-12">
                                        <User rendermode={1} user = {users.data[0]}/>
                                    </MDBCol>
                                )}

                                <MDBRow  className="ml-1 w-100">
                                    <MDBRow className="w-100">
                                    <MDBCol size="sm-12" className=" padding-text text-left w-100">
                                        <ReadMoreReact text={this.state.challenge.context} readMoreText ="Leer más"/> <br/>
                                    </MDBCol>

                                    </MDBRow>
                                    <MDBRow className="w-100">
                                    <MDBCol size="sm-12" className=" padding-text text-left w-100">
                                        <ReadMoreReact  text={this.state.challenge.challenge} readMoreText ="Leer más"/>
                                    </MDBCol>

                                    </MDBRow>
                                </MDBRow>
                                <MDBRow className="w-100">
                                    <MDBCol size="sm-12" className="ml-3">
                                    {this.renderFile()}
                                    </MDBCol>
                                </MDBRow>
                                <MDBRow className="ml-1 mt-3 w-100">
                                    <MDBCol size="sm-12">
                                        <Mutation mutation = {TOGGLE_LIKE} update = {this.updateCacheLike}>
                                            { (toggleLike, {data}, loading) =>
                                            <MDBBtn className="btn-comments mr-1" type="comments-icon"
                                                onClick = { () => { toggleLike({ variables: {type, id}}) } }
                                            >
                                                <Fa color="white" icon="fas fa-thumbs-up"/> {this.state.likesCount}
                                            </MDBBtn>
                                            }
                                        </Mutation>
                                        <MDBBtn className="btn-comments mr-1" type="comments-icon" onClick={this.commentsButton}> <Fa icon="fas fa-comments"/> {this.state.challenge.comments_count}</MDBBtn>
                                        <MDBBtn className="btn-public-item" onClick={this.commentsButton}> <Fa icon="far fa-comment-dots"/>Comenta  </MDBBtn>
                                    </MDBCol>
                                </MDBRow>
                            {this.state.commentsBox && <CommentBox commentable_id={this.state.challenge.id} commentable_type="Challenge" rendermode={2}/>}
                            </MDBRow>
                            </div>
                        );
                    }
                }}
            </Query>
        )
    }
}

export default ChallengesButton;
