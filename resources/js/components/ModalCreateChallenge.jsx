import React from 'react';
import { MDBContainer,Fa, MDBModal, MDBModalBody, MDBModalHeader, ModalHeader, ModalBody,MDBRow,MDBCol } from 'mdbreact';
import axios from 'axios';
import urls from '../../js/URLs.js';
import '../../sass/ModalPublication.css'
import '../../sass/SaludMejor.css'

import Loading from './Loading'

import { Query, Mutation} from "react-apollo";
import { MODAL_CREATE_CHALLENGE, ALL_CHALLENGES_ALBUM, CHALLENGE_ARTICLE, CHALLENGE_PROJECT } from '../queries';
import { CREATE_CHALLENGE } from '../mutations.js';

function validURL(str) {
    var pattern = new RegExp('^(https?:\\/\\/)?'+ // protocol
        '((([a-z\\d]([a-z\\d-]*[a-z\\d])*)\\.)+[a-z]{2,}|'+ // domain name
        '((\\d{1,3}\\.){3}\\d{1,3}))'+ // OR ip (v4) address
        '(\\:\\d+)?(\\/[-a-z\\d%_.~+]*)*'+ // port and path
        '(\\?[;&a-z\\d%_.~+=-]*)?'+ // query string
        '(\\#[-a-z\\d_]*)?$','i'); // fragment locator
    return !!pattern.test(str);
}

const updateCacheAll = (cache, {data: {newChallenge}}) => {
    const {challenges} = cache.readQuery({query: ALL_CHALLENGES_ALBUM})
    cache.writeQuery({
        query: ALL_CHALLENGES_ALBUM,
        data: {
            challenges: {data: [newChallenge].concat(challenges.data), __typename: "challengesPagination"}
        }
    })
}
const updateCacheArticles = (cache, {data: {newChallenge}}) => {
    let challengeable_type = 'App\\Article'
    let challengeable_id = window.location.pathname.split('/').pop()
    const {challenges} = cache.readQuery({query: CHALLENGE_ARTICLE, variables: {challengeable_type, challengeable_id}})
    cache.writeQuery({
        query: CHALLENGE_ARTICLE,
        variables: {challengeable_type, challengeable_id},
        data: {
            challenges: {data: [newChallenge].concat(challenges.data), __typename: "articlePagination"}
        }
    })
}
const updateCacheProjects = (cache, {data: {newChallenge}}) => {
    let challengeable_type = 'App\\Project'
    let challengeable_id = window.location.pathname.split('/').pop()
    const {challenges} = cache.readQuery({query: CHALLENGE_ARTICLE, variables: {challengeable_type, challengeable_id}})
    cache.writeQuery({
        query: CHALLENGE_ARTICLE,
        variables: {challengeable_type, challengeable_id},
        data: {
            challenges: {data: [newChallenge].concat(challenges.data), __typename: "articlePagination"}
        }
    })
}

class ModalCreateChallenge extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            modal: false,
            type: '',
            article_id: '0',
            project_id: '0',
            context: '',
            challenge:'',
            challengeable_id: '0',
            file_url: '',
            userType: '0',
            target: '',
            name: null,
            evaluation: null,
            rendermode: this.props.rendermode,
            filter: props.filter,
            update: null,
            userId: props.userId
        };
    }

    componentWillMount () {
        if (this.state.filter != 'all') {
            if (this.state.filter == 'articles') this.setState({update: updateCacheArticles})
            else if (this.state.filter == 'projects') this.setState({update: updateCacheProjects})
        } else this.setState({update: updateCacheAll})
    }

    handleChallengeChange = e =>{
        this.setState({challenge: e.target.value});
    }

    handleContentChange = e => {
        this.setState({context: e.target.value});
    }

    handleTargetChange = e => {
        this.setState({target: e.target.value});
    }

    handleArticleSelect = e =>{
        e.preventDefault();
        if(this.state.type == 'Project' && this.state.challengeable_id!== "0"){
            this.setState({
                article_id: "0",
                project_id: "0",
                type : '',
            })
            return alert("Ya se ha seleccionado un proyecto")
        }
        else{
            this.setState({challengeable_id: e.target.value , type : "Article", article_id: e.target.value })
        }

    }

    handleProjectSelect = e =>{
        e.preventDefault();
        if(this.state.type == 'Article' && this.state.challengeable_id!== "0"){
            this.setState({
                article_id: "0",
                project_id: "0",
                type : '',
            })
            return alert("Ya se ha seleccionado un artículo")
        }
        else{
            this.setState({challengeable_id: e.target.value, type : "Project", project_id: e.target.value})
        }
    }

    handleUserTypeSelect = e =>{
        e.preventDefault();
        this.setState({userType: e.target.value})
    }

    handleFile = e =>{
        e.preventDefault()
        alert('Entra')
        let formdata = new FormData()
        formdata.append('file',e.target.files[0])
        axios.post(urls.prefix + urls.docsCreate, formdata, { headers: { Authorization: `Bearer ${localStorage.getItem("tk")}`}})
        .then(response =>{
            this.setState({file_url: response.data.uri})
        })
        .catch(error =>{console.log(error)})
    }

    toggle = () => {
        this.setState({
          modal: !this.state.modal
        });
    }

    render() {
        let access_token = localStorage.getItem("tk")

        return (
            <Query query = {MODAL_CREATE_CHALLENGE} variables = {{access_token}}>
                {({ loading, error, data: {articles, projects} }) => {
                    if (loading) return <Loading/>;
                    if (error) return `Error! ${error.message}`;

                    articles = articles.data
                    projects = projects.data
                    let userId = this.state.userId

                    if (this.state.rendermode == 1) {
                        return(
                            <div>
                                <div className="modal-shadow">
                                    <a onClick={this.toggle} >
                                        <MDBRow className="new-challenge ml-0">
                                            <MDBCol size="sm-8" className="border-container">
                                                <MDBContainer>
                                                    <h5><b><Fa icon="far fa-edit fa-1x"/> Publica un nuevo desafío</b></h5>
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
                                </div>

                                <MDBModal isOpen={this.state.modal} toggle={this.toggle} className="modal-position">
                                    <MDBModalHeader className="bg05" toggle={this.toggle}>Plantea un desafío en <b>Salud Mejor</b></MDBModalHeader>
                                    <ModalBody className="modal-size">
                                        <Mutation mutation = {CREATE_CHALLENGE} update = {this.state.update}>
                                            {newChallenge => {
                                                return (
                                                    <form onSubmit = {e => {
                                                        e.preventDefault()
                                                        if (localStorage.getItem("tk") == null){
                                                            this.setState({
                                                                article_id: '0',
                                                                project_id: '0',
                                                                context: '',
                                                                challenge:'',
                                                                challengeable_id: '0',
                                                                file_url: '',
                                                                target: '',
                                                                userType: '0',
                                                                name: null,
                                                                evaluation: null,
                                                            })
                                                            return alert("Debes ingresar para plantear desafíos")
                                                        }
                                                        if (this.state.challengeable_id == "0"|| typeof this.state.challengeable_id == 'undefined'){
                                                            return alert("Debes selecionar un artículo o proyecto de la lista");
                                                        }

                                                        let access_token = localStorage.getItem('tk')
                                                        let challengeable_type = 'App\\'+this.state.type
                                                        let challengeable_id = this.state.challengeable_id
                                                        let context = this.state.context
                                                        let challenge = this.state.challenge
                                                        let as_organization = this.state.userType == '0' ? false : true
                                                        let target = this.state.target
                                                        let name = this.state.name
                                                        let evaluation = this.state.evaluation
                                                        let doc_uri = this.state.file_url

                                                        let data = {access_token, challengeable_type, challengeable_id, context, challenge, as_organization, target}

                                                        if (name != null) data.push(name)
                                                        if (evaluation != null) data.push(evaluation)
                                                        if (validURL(doc_uri)) data.push(doc_uri)

                                                        newChallenge ({ variables: data })

                                                        this.setState({
                                                            modal: false,
                                                            article_id: '0',
                                                            project_id: '0',
                                                            context: '',
                                                            challenge:'',
                                                            challengeable_id: '0',
                                                            file_url: '',
                                                            target: '',
                                                            userType: '0',
                                                            name: null,
                                                            evaluation: null,
                                                        })

                                                    }}>
                                                        <MDBContainer>
                                                            <MDBRow>
                                                                <textarea
                                                                    className="form-control"
                                                                    rows="2"
                                                                    value = {this.state.challenge}
                                                                    placeholder="¿Cuál es el desafío?"
                                                                    maxLength = "10000"
                                                                    onChange={this.handleChallengeChange}
                                                                />
                                                            </MDBRow>
                                                            <MDBRow>
                                                                <textarea
                                                                    className="form-control"
                                                                    id="content"
                                                                    rows="2"
                                                                    value = {this.state.context}
                                                                    placeholder="¿Por qué planteas este desafío?"
                                                                    maxLength="2000"
                                                                    onChange={this.handleContentChange}
                                                                />
                                                            </MDBRow>
                                                            <MDBRow>
                                                                <textarea
                                                                    className="form-control"
                                                                    id="target"
                                                                    rows="2"
                                                                    value = {this.state.target}
                                                                    placeholder="¿Cúal es el público objetivo del desafío?"
                                                                    maxLength="1000"
                                                                    onChange={this.handleTargetChange}
                                                                />
                                                            </MDBRow>
                                                            <MDBRow className="w-100 pt-2">
                                                                <select value = {this.state.article_id} className="article_select mr-2" name="challengeable_id" onChange={this.handleArticleSelect}>
                                                                    <option value="0">Selecciona un artículo</option>
                                                                    {articles.map((ar,index)=>{
                                                                        return (<option key={index} value={ar.id} >
                                                                            {ar.title}
                                                                        </option>);
                                                                    })}
                                                                </select>
                                                                <p> ó </p>
                                                                <select value={this.state.project_id} className="article_select ml-2 " name="challengeable_id" onChange={this.handleProjectSelect}>
                                                                    <option value="0">Selecciona un proyecto</option>
                                                                    {projects.map((pr,index)=>{
                                                                        return (<option key={index} value={pr.id} >
                                                                            {pr.name}
                                                                        </option>);
                                                                    })}
                                                                </select>
                                                            </MDBRow>
                                                            <MDBRow>
                                                                <label className="file-btn-1 bg00" >
                                                                    <Fa icon="far fa-file" />
                                                                    <input
                                                                        type = "file"
                                                                        onChange = {this.handleFile}
                                                                        accept = ".doc, .docx, .pdf, .jpg, .jpeg, .png"
                                                                    />
                                                                </label>
                                                                &nbsp;&nbsp;
                                                                <label>Publicar como: </label>
                                                                <select value={this.state.userType} className="article_select ml-2 " name="user_type" onChange={this.handleUserTypeSelect}>
                                                                    <option value="0">Persona</option>
                                                                    <option value="1">Organización</option>
                                                                </select>
                                                            </MDBRow>
                                                            <MDBRow>
                                                                <MDBCol size = "sm-9">
                                                                </MDBCol>
                                                                <br/><br/>
                                                                <MDBCol size = "sm-3">
                                                                    <input className="btn-public-item ml-3" type="submit" value="Publicar"></input>
                                                                </MDBCol>
                                                            </MDBRow>
                                                        </MDBContainer>
                                                    </form>
                                                )
                                            }}
                                        </Mutation>
                                    </ModalBody>
                                </MDBModal>
                            </div>
                        )
                    }
                }}
            </Query>
        )
    }
}

export default ModalCreateChallenge;
