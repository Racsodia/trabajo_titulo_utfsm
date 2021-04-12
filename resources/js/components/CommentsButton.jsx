import React from 'react';
import {MDBRow,MDBCol} from 'mdbreact'
import User from './User';
import '../../sass/CommentBox.css';
import { Query, Mutation } from 'react-apollo';
import { USERS, GET_COMMENTS } from '../queries';
import Loading from './Loading';
import { DELETE_COMMENT } from '../mutations';

var moment = require('moment')
class CommentsButton extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            comment: props.comment,
            rendermode: props.rendermode,
            showDelete: false,
            type: props.type
        };
        this.showDeleteButton = this.showDeleteButton.bind(this);
        this.renderFile = this.renderFile.bind(this);
    }

    updateCacheComment = (cache, {data: {deleteComment}}) => {
        let type = 'App\\'+this.state.type
        let id = this.state.comment.commentable_id
        const {comments} = cache.readQuery({query: GET_COMMENTS, variables: {type, id}})
        cache.writeQuery({
            query: GET_COMMENTS,
            variables: {type, id},
            data: {
                comments: {data: comments.data.filter(c => c.id != deleteComment), __typename: "commentPagination"}
            }
        })
    }

    showDeleteButton(){
        if(this.state.comment.user.id == localStorage.getItem("uID") || localStorage.getItem("uTP") == "admin" || localStorage.getItem("uTP") == "super_admin") return true
        return false
    }

    renderFile(){
        if (this.state.comment.doc_uri == null) return null
        else if (this.state.comment.doc_uri !== null &&  (this.state.comment.doc_uri.indexOf(".jpg")>0 ||this.state.comment.doc_uri.indexOf(".jpeg")>0 || this.state.comment.doc_uri.indexOf(".png")>0))
            return <img src={this.state.comment.doc_uri} alt="img"/>
        else return <a href={this.state.comment.doc_uri}>Documento</a>
    }

    render() {
        var utcTime = moment.utc(this.state.comment.created_at)
        var localTime = utcTime.local().format('DD-MMM-YYYY hh:mm:ss A' )
        let id = this.state.comment.user.id
        return (
            <Query query = {USERS} variables = {{id}}>
                {({loading, error, data: {users}}) => {
                    if (loading) return <Loading/>

                    let access_token = localStorage.getItem("tk")
                    let id = this.state.comment.id

                    if(this.state.rendermode == 1){
                        return (
                            <MDBRow className="mt-1 comment-bg w-100">
                                <MDBRow className="w-100 ml-2">
                                    <User rendermode={3} user = {users.data[0]}/>
                                </MDBRow>
                                <MDBRow className="w-100 ml-2">
                                    <MDBCol>
                                        <p className="comment-date-1">{localTime}</p>
                                    </MDBCol>
                                    <MDBCol className="text-end">
                                        {this.showDeleteButton() &&
                                            <Mutation mutation = {DELETE_COMMENT} update = {this.updateCacheComment}>
                                                { deleteComment => <a onClick = { () => {
                                                    if (window.confirm("¿Desea eliminar este comentario?")) deleteComment({variables: {id}})
                                                } } className="grey-text">Eliminar comentario</a>}
                                            </Mutation>
                                        }
                                    </MDBCol>
                                </MDBRow>
                                <MDBRow className="w-100 ml-2">
                                    <MDBCol>
                                        <p className="comment-font">{this.state.comment.content}</p>
                                    </MDBCol>
                                </MDBRow>
                                <MDBRow className="w-100 ml-4">
                                    {this.renderFile()}
                                </MDBRow>
                            </MDBRow>
                        )
                    }
                    if(this.state.rendermode == 2){
                        return (
                            <MDBRow className="mt-1 comment-bg w-100">
                                <MDBRow className="ml-2 w-100">
                                    <User rendermode={3} user = {users.data[0]}/>
                                </MDBRow>
                                <MDBRow className="comment-date-2">
                                    <p>{localTime}</p>
                                    {this.showDeleteButton() &&
                                        <Mutation mutation = {DELETE_COMMENT} update = {this.updateCacheComment}>
                                            { deleteComment => <a onClick = { () => {
                                                if (window.confirm("¿Desea eliminar este comentario?")) deleteComment({variables: {id}})
                                            } } className="grey-text">Eliminar comentario</a>}
                                        </Mutation>
                                    }
                                </MDBRow>
                                <p className="pl-5 comment-font">{this.state.comment.content}</p>
                                <MDBRow className="ml-5">
                                    {this.renderFile()}
                                </MDBRow>
                            </MDBRow>
                        )
                    }
                }}
            </Query>
        )
    }
}

export default CommentsButton;
