import React from 'react';
import {MDBRow,MDBCol,Fa,MDBContainer} from 'mdbreact';
import CommentsButton from './CommentsButton';
import TextareaAutosize from 'react-autosize-textarea';
import User from './User';
import axios from 'axios';
import urls from '../URLs';
import '../../sass/SaludMejor.css';
import Loading from './Loading';
import { GET_COMMENTS } from '../queries';

import { Query, Mutation } from "react-apollo";
import { CREATE_COMMENT } from '../mutations';

const instance = axios.create({
    baseURL: window.location.hostname+"/api",
    headers: {"authorization": "basic"+localStorage.getItem("tk")}
})
class CommentBox extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            commentable_id: props.commentable_id,
            commentable_type: props.commentable_type,
            comment: '',
            response: props.response,
            user: props.user,
            comments: [],
            rendermode: props.rendermode,
            isOpen: false,
            file_url: '',
            loadingDoc: false
        };
    }

    updateCacheComment = (cache, {data: {newComment}}) => {
        let type = 'App\\'+this.state.commentable_type
        let id = this.state.commentable_id
        const {comments} = cache.readQuery({query: GET_COMMENTS, variables: {type, id}})
        cache.writeQuery({
            query: GET_COMMENTS,
            variables: {type, id},
            data: {
                comments: { data: comments.data.concat(newComment), __typename: "commentPagination" }
            }
        })
    }

    handleChange = e => {
        this.setState({comment: e.target.value});
    }
    handleFile = e => {
        e.preventDefault()
        let formdata = new FormData()
        formdata.append('file',e.target.files[0])
        this.setState({loadingDoc: true})
        axios.post(urls.prefix + urls.docsCreate, formdata, { headers: { Authorization: `Bearer ${localStorage.getItem("tk")}`}})
        .then(response =>{
            this.setState({file_url: response.data.uri, loadingDoc: false})
        })
        .catch(error =>{console.log(error)})
    }

    render() {
        let type = 'App\\'+this.state.commentable_type
        let id = this.state.commentable_id
        if(this.state.rendermode == 1) {
            return (
                <MDBContainer>
                    <Query query = {GET_COMMENTS} variables = {{type, id}}>
                        {({loading, error, data: {comments}}) => {
                            if (loading) return <Loading/>
                            if (error) return 'Error'
                            return (
                                <React.Fragment>
                                    <MDBRow className="ml-3" >
                                        {comments.data.map((cm)=>{
                                            return <CommentsButton key={cm.id} type = {this.state.commentable_type} comment ={cm} rendermode={this.state.rendermode}/>
                                        })}
                                    </MDBRow>
                                    <MDBRow>{comments.has_more_pages && <a className="pl-4" onClick = {this.showMoreComments}>Ver más comentarios</a>}</MDBRow>
                                </React.Fragment>
                            )
                        }}
                    </Query>
                    {this.state.user !== null &&
                        <MDBRow className="mt-1">
                            <MDBCol size="sm-1" className="pr-0">
                                <User user={this.state.user} rendermode={4} />
                            </MDBCol>
                            <MDBCol size="sm-10" className="comment-text ml-3">
                                <form>
                                    <label htmlFor="content">
                                        <TextareaAutosize className="text-area" value={this.state.comment} onChange={this.handleChange} maxLength="2000" placeholder='Escribe un comentario...'/>
                                    </label>
                                    <input id="comment-input" name ="content" type="text" value={this.state.comment || ''} onChange={this.handleChange} />
                                    <label className="file-btn black-text">
                                        <Fa icon="far fa-file" />
                                        <input type="file" onChange={this.handleFile}/>
                                    </label>
                                    {!this.state.loadingDoc && <Mutation mutation = {CREATE_COMMENT} update = {this.updateCacheComment}>
                                        {newComment => <button onClick = {
                                            (e) => {
                                                e.preventDefault()
                                                let content = this.state.comment
                                                if (content == '') return alert('Debe Agregar un comentario')
                                                let access_token = localStorage.getItem("tk")
                                                let type = 'App\\'+this.state.commentable_type
                                                let id = this.state.commentable_id
                                                let doc_uri = this.state.file_url
                                                let data = {access_token, type, id, content}
                                                if (doc_uri != '') data['doc_uri'] = doc_uri
                                                newComment({variables: data})
                                                this.setState({comment: ''})
                                            }
                                        } className="ml-5 file-btn black-text"> Publica <Fa icon="far fa-arrow-alt-circle-up"/></button> }
                                    </Mutation>}
                                    {this.state.loadingDoc && <Loading/>}
                                </form>
                            </MDBCol>
                        </MDBRow>
                    }
                </MDBContainer>
            )
        }
        if(this.state.rendermode == 2){
            return (
                <MDBContainer>
                    <Query query = {GET_COMMENTS} variables = {{type, id}}>
                        {({loading, error, data: {comments}}) => {
                            if (loading) return <Loading/>
                            if (error) return 'Error'
                            return (
                                <React.Fragment>
                                    <MDBRow className="ml-3" >
                                        {comments.data.map((cm)=>{
                                            return(<CommentsButton key={cm.id} type = {this.state.commentable_type} comment ={cm} rendermode={this.state.rendermode}/>);
                                        })}
                                    </MDBRow>
                                    <MDBRow>{comments.has_more_pages && <a className="pl-4" onClick = {this.showMoreComments}>Ver más comentarios</a>}</MDBRow>
                                </React.Fragment>
                            )
                        }}
                    </Query>
                    <MDBRow className="mt-1">
                        <MDBCol size="sm-1" className="pr-0">
                            <User user={this.state.user} rendermode={4} />
                        </MDBCol>
                        <MDBCol size="sm-10" className="ml-3">
                            <form>
                                <label htmlFor="content">
                                    <TextareaAutosize className="text-area-2" value={this.state.comment} onChange={this.handleChange} maxLength="2000" placeholder='Comenta...'/>
                                </label>
                                <input id="comment-input" name ="content" type="text" value={this.state.comment || ''} onChange={this.handleChange} />
                                <label className="file-btn black-text">
                                    <Fa icon="far fa-file" />
                                    <input type="file" onChange={this.handleFile}/>
                                </label>
                                {!this.state.loadingDoc && <Mutation mutation = {CREATE_COMMENT} update = {this.updateCacheComment}>
                                    {newComment => <button onClick = {
                                        (e) => {
                                            e.preventDefault()
                                            let content = this.state.comment
                                            if (content == '') return alert('Debe Agregar un comentario')
                                            let access_token = localStorage.getItem("tk")
                                            let type = 'App\\'+this.state.commentable_type
                                            let id = this.state.commentable_id
                                            let doc_uri = this.state.file_url
                                            let data = {access_token, type, id, content}
                                            if (doc_uri != '') data['doc_uri'] = doc_uri
                                            newComment({variables: data})
                                            this.setState({comment: ''})
                                        }
                                    } className="ml-5 file-btn black-text"> Publica <Fa icon="far fa-arrow-alt-circle-up"/></button> }
                                </Mutation>}
                                {this.state.loadingDoc && <Loading/>}
                            </form>
                        </MDBCol>
                    </MDBRow>
                </MDBContainer>
            );
        }
        if(this.state.rendermode == 3){
            return (
                <MDBContainer>
                    <Query query = {GET_COMMENTS} variables = {{type, id}}>
                        {({loading, error, data: {comments}}) => {
                            if (loading) return <Loading/>
                            if (error) return 'Error'
                            return (
                                <React.Fragment>
                                    <MDBRow className="ml-3" >
                                        {comments.data.map((cm)=>{
                                            return(<CommentsButton key={cm.id} type = {this.state.commentable_type} comment ={cm} commentable_user_id = {this.state.user.id} rendermode={this.state.rendermode} commentDeleted={this.commentDeleted}/>);
                                        })}
                                    </MDBRow>
                                    <MDBRow>{comments.has_more_pages && <a className="pl-4" onClick = {this.showMoreComments}>Ver más comentarios</a>}</MDBRow>
                                </React.Fragment>
                            )
                        }}
                    </Query>
                    <MDBRow className="mt-1">
                        <MDBCol size="sm-1" className="pr-0">
                            <User user={this.state.user} rendermode={4} />
                        </MDBCol>
                        <MDBCol size="sm-10" className="comment-text ml-3">
                            <form>
                                <label htmlFor="content">
                                    <TextareaAutosize className="text-area-2" value={this.state.comment} onChange={this.handleChange} maxLength="2000" placeholder='Escribe un comentario...'/>
                                </label>
                                <input id="comment-input" name ="content" type="text" value={this.state.comment || ''} onChange={this.handleChange} />
                                <label className="file-btn black-text">
                                    <Fa icon="far fa-file" />
                                    <input type="file" onChange={this.handleFile}/>
                                </label>
                                {!this.state.loadingDoc && <Mutation mutation = {CREATE_COMMENT} update = {this.updateCacheComment}>
                                    {newComment => <button onClick = {
                                        (e) => {
                                            e.preventDefault()
                                            let content = this.state.comment
                                            if (content == '') return alert('Debe Agregar un comentario')
                                            let access_token = localStorage.getItem("tk")
                                            let type = 'App\\'+this.state.commentable_type
                                            let id = this.state.commentable_id
                                            let doc_uri = this.state.file_url
                                            let data = {access_token, type, id, content}
                                            if (doc_uri != '') data['doc_uri'] = doc_uri
                                            newComment({variables: data})
                                            this.setState({comment: ''})
                                        }
                                    } className="ml-5 file-btn black-text"> Publica <Fa icon="far fa-arrow-alt-circle-up"/></button> }
                                </Mutation>}
                                {this.state.loadingDoc && <Loading/>}
                            </form>
                        </MDBCol>
                    </MDBRow>
                </MDBContainer>
            );
        }
    }
}

export default CommentBox;

