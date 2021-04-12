import React from 'react';
import { MDBContainer,Fa, MDBModal, MDBModalBody, MDBModalHeader, ModalHeader, ModalBody,MDBRow,MDBCol } from 'mdbreact';
import axios from 'axios';
import urls from '../../js/URLs.js';

import '../../sass/SaludMejor.css'

import Loading from './Loading'

import { Query, Mutation } from "react-apollo";
import { PUBLICATIONS_PAGE, ARTICLES_ALBUM } from '../queries';
import {CREATE_KNOWLEDGE} from '../mutations';
import { argumentsObjectFromField } from 'apollo-utilities';

function validURL(str) {
    var pattern = new RegExp('^(https?:\\/\\/)?'+ // protocol
        '((([a-z\\d]([a-z\\d-]*[a-z\\d])*)\\.)+[a-z]{2,}|'+ // domain name
        '((\\d{1,3}\\.){3}\\d{1,3}))'+ // OR ip (v4) address
        '(\\:\\d+)?(\\/[-a-z\\d%_.~+]*)*'+ // port and path
        '(\\?[;&a-z\\d%_.~+=-]*)?'+ // query string
        '(\\#[-a-z\\d_]*)?$','i'); // fragment locator
    return !!pattern.test(str);
}

const updateCache = (cache, {data: {newPublication}}) => {
    const {publications} = cache.readQuery({query: PUBLICATIONS_PAGE})
    cache.writeQuery({
        query: PUBLICATIONS_PAGE,
        data: {
            publications: {data: [newPublication].concat(publications.data), __typename: "publicationPagination"}
        }
    })

}

class ModalCreateKnowledge extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            content:'',
            title:'',
            type:'',
            selectedOptionArticle: 0,
            file_url: '',
            modal: false,
            data: props.data,
            query: this.props.query
        };
    }

    handleContentChange = e => {
        e.preventDefault();
        this.setState({content: e.target.value});
    }

    handleTitle = e =>{
        e.preventDefault()
        this.setState({title: e.target.value})
    }

    handleArticleSelect = e =>{
        e.preventDefault();
        this.setState({challengeable_id: e.target.value , type : "Article",selectedOptionArticle: e.target.value })
    }

    handleFile = e =>{
        e.preventDefault()
        let formdata = new FormData()
        formdata.append('file',e.target.files[0])

        axios.post(urls.prefix + urls.docsCreate, formdata, { headers: { Authorization: `Bearer ${localStorage.getItem("tk")}`}})
        .then(response =>{
            this.setState({file_url: response.data.uri})
        })
        .catch(error =>{console.log(error)})
    }

    handleSubmit = () => {
        if( localStorage.getItem("tk") == null){
             this.setState({
                 content: '',
                 title: '',
                 selectedOptionArticle: 0,
                 doc_uri: ''
             })
             alert("Debes ingresar para publicar")
             return false
         }

        if(this.state.challengeable_id == 0 || typeof this.state.challengeable_id == 'undefined'){
            alert("Debes selecionar un artículo de la lista");
            return false
        }
        return true
    }
    toggle = () => {
        this.setState({
          modal: !this.state.modal
        });
    }
    validateFields () {
        for (let i = 0; i < arguments.length; i++)
            if (arguments[i] == null || arguments[i] == '' || typeof arguments[i] == 'undefined')
                return false
        return true
    }
    render() {
        return (
            <Query query = {ARTICLES_ALBUM}>
                {({loading, error, data: {articles}}) => {
                    if (loading) return <Loading/>
                    if (error) return null

                    articles = articles.data
                    return(
                        <MDBContainer>
                            <MDBRow>
                                <a onClick={this.toggle} className="modal-shadow">
                                    <MDBRow className="new-challenge ml-0">
                                        <MDBCol size="sm-8" className="border-container">
                                            <MDBContainer>
                                                <h5><b><Fa icon="far fa-edit fa-1x"/> Compartir conocimiento</b></h5>
                                            </MDBContainer>
                                        </MDBCol>
                                        <MDBCol size="sm-2" className="border-container text-center">
                                            <MDBContainer>
                                                <Fa icon="fas fa-file-image fa-2x"/>
                                            </MDBContainer>
                                        </MDBCol>
                                        <MDBCol size="sm-2" className="border-container text-center">
                                            <MDBContainer>
                                                    <Fa icon="far fa-file-alt fa-2x"/>
                                            </MDBContainer>
                                        </MDBCol>
                                    </MDBRow>
                                </a>
                            </MDBRow>

                            <MDBModal isOpen={this.state.modal} toggle={this.toggle} className="modal-position">
                                <MDBModalHeader className="bg05" toggle={this.toggle}>Comparte conocimientos en <b>Salud Mejor</b></MDBModalHeader>
                                <ModalBody className="modal-size">
                                    <Mutation mutation = {CREATE_KNOWLEDGE} update = {updateCache}>
                                        {newPublication => {
                                            return (
                                                <form
                                                    onSubmit = {e => {
                                                        e.preventDefault()
                                                        let title = this.state.title
                                                        let content = this.state.content
                                                        let article_id = this.state.selectedOptionArticle
                                                        let doc_uri = this.state.file_url
                                                        let data = {}
                                                        
                                                        if (this.validateFields(title,content,article_id)) {
                                                            data = {title,content,article_id}
                                                            if (validURL(doc_uri)) data.push(doc_uri)
                                                            newPublication ({ variables: data })
                                                            this.setState({
                                                                content: '',
                                                                title: '',
                                                                selectedOptionArticle: 0,
                                                                doc_uri: '',
                                                                modal: false,
                                                            })
                                                        }
                                                        else alert('Tanto el título como el texto son campos obligatorios')
                                                }}>
                                                    <MDBRow>
                                                        <MDBCol size="sm-5">
                                                        <input
                                                            type="text"
                                                            placeholder="Título"
                                                            className="title"
                                                            maxLength="191"
                                                            value={this.state.title}
                                                            onChange={this.handleTitle}
                                                        ></input>
                                                        <br/><br/>
                                                        <select value = {this.state.selectedOptionArticle} className="article_select mr-2" name="challengeable_id" onChange={this.handleArticleSelect}>
                                                            <option value="0">Selecciona un artículo</option>
                                                            {articles.map((ar)=>{
                                                                return (<option key={ar.id} value={ar.id} >
                                                                    {ar.title}
                                                                </option>);
                                                            })}
                                                        </select>
                                                        <br/><br/>
                                                        <label className="file-btn-1 bg00" >
                                                            <Fa icon="far fa-file" />
                                                            <input type="file" onChange={this.handleFile}/>
                                                        </label>
                                                        <p className="pl-2">(.doc .docx .pdf .jpg .jpeg .png)</p>
                                                        </MDBCol>
                                                        <MDBCol size="sm-7">
                                                            <textarea
                                                                className="form-control resize-area"
                                                                id="content"
                                                                rows="4"
                                                                placeholder="Resumen de la publicación"
                                                                value={this.state.content}
                                                                maxLength="10000"
                                                                onChange={this.handleContentChange}
                                                            />
                                                            <br/>
                                                            <MDBRow>
                                                                <MDBCol size = 'sm-8'></MDBCol>
                                                                <MDBCol size = 'sm-4'>
                                                                    <input className="btn-public-item" type="submit" value="Publicar"></input>
                                                                </MDBCol>
                                                            </MDBRow>
                                                        </MDBCol>
                                                    </MDBRow>
                                                </form>
                                            )
                                        }}
                                    </Mutation>
                                </ModalBody>
                            </MDBModal>
                        </MDBContainer>
                    )
                }}
            </Query>
        );
    }
}

ModalCreateKnowledge.propTypes = {};

export default ModalCreateKnowledge;
