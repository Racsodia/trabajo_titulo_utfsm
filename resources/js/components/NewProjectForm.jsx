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
            file_url:'',
        };
    }
    handleFile = e =>{
        e.preventDefault()
        let formdata = new FormData()
        formdata.append('file',e.target.files[0])

        axios.post(urls.prefix + urls.docsCreate, formdata, { headers: { Authorization: `Bearer ${localStorage.getItem("tk")}`}})
        .then(response =>{
            this.setState({photo_uri: response.data.uri})
            console.log(response.data.uri)
        })
        .catch(error =>{console.log(error)})
    }
    render() {
            {this.state.showCreate &&
                <Query query = {ORGANIZATIONS_PAGE}>
                    {({loading, error, data: {organizations}}) => {
                        if (loading) return <Loading/>
                        if (error) return <div>Error</div>

                        organizations = organizations.data

                        return (
                            <form>
                                <MDBRow>
                                    <MDBCol size="sm-4">
                                        <input type="text"
                                        placeholder="Nombre del proyecto"
                                        className="title w-100"
                                        value={this.state.name}
                                        onChange={this.handleName}
                                        />
                                    </MDBCol>
                                    <MDBCol size="sm-3">
                                        <select value={this.state.organization_id} name="organization_id" onChange={this.handleOrganization}>
                                            <option value="0">Selecciona organización</option>
                                            {
                                                organizations.map((pj,index)=>{
                                                    return <option key={index} value={pj.id}>{pj.name}</option>
                                                })
                                            }
                                        </select>
                                        <select value={this.state.status} onChange={this.handleStatus}>
                                            <option value="0">Estado del proyecto</option>
                                            <option value="construction">Construcción</option>
                                            <option value="development">Desarrollo</option>
                                            <option value="completed">Completado</option>
                                        </select>
                                    </MDBCol>
                                    <MDBCol size="sm-4"><textarea
                                    placeholder="Descripción del proyecto"
                                    className="form-control resize-area"
                                    rows="1"
                                    maxLength="10000"
                                    value={this.state.description}
                                    onChange={this.handleDescription}
                                    /></MDBCol>
                                    <MDBCol size="sm-1">
                                        <label className="file-btn-1 bg05" >
                                            <Fa icon="far fa-file"/>
                                            <input type="file" onChange={this.handleFile}/>
                                        </label>
                                    </MDBCol>
                                </MDBRow>
                                <MDBRow>
                                    <MDBCol size="sm-11">{this.state.photo_uri}</MDBCol>
                                    <MDBCol size="sm-1">
                                        <Mutation mutation = {CREATE_PROJECT} update = {this.state.update}>
                                            {(newProject) => <input onClick = {
                                                e => {
                                                    e.preventDefault()
                                                    if (this.state.name == '' || this.state.organization_id == '0' || this.state.context == '')
                                                        return alert("Faltan campos por completar, son todos obligatorios")
                                                    let tk = localStorage.getItem('tk')
                                                    let name = this.state.name
                                                    let org = this.state.organization_id
                                                    let context = this.state.description
                                                    let data = {tk, name, org, context}
                                                    let status = this.state.status
                                                    let article = this.state.article_id
                                                    let photo_uri = this.state.photo_uri
                                                    if (typeof status != undefined && status != '0') data['status'] = status
                                                    if (article != '0') data['article'] = article
                                                    if (photo_uri != '' && photo_uri != '0') data['photo_uri'] = photo_uri
                                                    newProject({variables: data})
                                                }
                                            } type="submit" className="btn" value="Crear"/> }
                                        </Mutation>
                                    </MDBCol>
                                </MDBRow>
                            </form>
                        )
                    }}
                </Query>
            }
    }
}

export default CommentBox;

