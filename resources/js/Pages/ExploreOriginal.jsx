import React from 'react';
// import PropTypes from 'prop-types';
import {MDBContainer,MDBJumbotron,MDBBtn} from "mdbreact";
import ArticleFiguresAlbum from '../components/ArticleFiguresAlbum';
import axios from 'axios'
import urls from '../URLs.js';

import '../../sass/Explore.css';
import '../../sass/SaludMejor.css'

class Explore extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            article: [],
            isOpen: false,
            isFollowing: false,
            isLogin: false,
        };
    }

    static getDerivedStateFromError(error) {
        var delayInMilliseconds = 100; //1 second

        setTimeout(function() {
            window.location.href = window.location.href
        }, delayInMilliseconds);
    }

    componentDidMount() {
        if(localStorage.getItem("uID") == null){
            //console.log("uID = null")
            //console.log("Artice get url: ",urls.prefix + urls.articles + this.props.match.params.id)
            axios.get(urls.prefix + urls.articles + this.props.match.params.id)
            .then(response =>{
                //console.log("Article: ",response)
                this.setState({
                    article : response.data,
                    isOpen: true
                })
            })
            .catch(error=>{console.log(error)})
        }
        else{
            //console.log("Artice get url: ",urls.prefix + urls.articles + this.props.match.params.id)
            axios.get(urls.prefix + urls.articles + this.props.match.params.id)
            .then(response =>{
                //console.log("Article",response);
                var article = response.data
                if(localStorage.getItem("uID") != null || typeof localStorage.getItem("uID") !='undefined'  ){
                    return axios.get(urls.prefix + urls.users + localStorage.getItem("uID") + urls.articlesFollowingIndex)
                    .then(response =>{
                        //console.log("response",response)
                        let following = response.data.data
                            for(let i=0; i<following.length;i++){
                                if(following[i].id == this.props.match.params.id){
                                    this.setState({
                                        article : article,
                                        isFollowing : true,
                                        isLogin: true,
                                        isOpen: true
                                    })
                                }
                                else{
                                    this.setState({
                                        article : article,
                                        isFollowing : false,
                                        isLogin: true,
                                        isOpen: true
                                    })
                                }
                            }

                    })
                    .catch(error=>{console.error(error)});
                }
                else{
                    console.log("El usuario no está definido");
                }
            })
        }

    }

    followArticle = (e) =>{
        e.preventDefault()
        let formData = new FormData()
        formData.append('access_token',localStorage.getItem("tk"))
        axios.post(urls.prefix + urls.articles + this.state.article.id + urls.follow,formData)
        .then(response =>{
            this.setState({
                isFollowing: true,
            })
        })
        .catch(error=>{console.log(error)})
    }

    render() {
        //console.log("State",this.state)
        //console.log("Props",this.props)
        if(this.state.isOpen){
            if(this.state.isLogin){
                var colorClass = "title-container align-content-center" + " " +this.state.article.color;
            }else{
                var colorClass = "title-container-logout align-content-center" + " " +this.state.article.color;
            }

            return (
                <MDBContainer fluid className="pl-0 pr-0"  >
                    <div className={colorClass}>
                        <div className="container-text" >
                            <img className="icon-size-box" src={this.state.article.icon_uri} alt="icon" />
                            <h5 className="title-align">
                                {this.state.article.title}
                            </h5>
                            {!this.state.isFollowing && this.state.isLogin && <MDBBtn className="follow-btn" onClick={this.followArticle}>Seguir</MDBBtn>}
                            {this.state.isFollowing && this.state.isLogin && <MDBBtn className="follow-btn" onClick={this.followArticle}>Siguiendo</MDBBtn>}
                        </div>
                    </div>
                    <img className="w-100 imgbanner"src={this.state.article.photo_uri}></img>

                    <MDBJumbotron fluid >
                        <MDBContainer className="text-justify content-bg">
                            <div className="" dangerouslySetInnerHTML={{__html:this.state.article.content}}/>
                        </MDBContainer>
                    </MDBJumbotron>

                    <MDBJumbotron className="jumbo-figures">
                        <MDBContainer className="content-bg mt-0">
                            <h4 className="figure-title">CIFRAS</h4>
                            <ArticleFiguresAlbum  articleID={this.state.article.id} figuresCount={this.state.article.figures_count}></ArticleFiguresAlbum>
                        </MDBContainer>
                    </MDBJumbotron>

                    <MDBJumbotron>

                        <MDBContainer>
                            <h3 className="text-center">Explora los aportes a esta temática</h3>
                        </MDBContainer>

                        <MDBContainer  className="d-flex wrap-size justify-content-center">
                            <MDBContainer className="col-example ">
                                <MDBContainer className="text-center">
                                    <MDBContainer className="text-center shadow-container">
                                    <a href={"/desafios-tematica/"+this.state.article.id}> <div className="desafio"></div></a>
                                        <h5>Desafíos</h5>
                                    </MDBContainer>
                                </MDBContainer>
                            </MDBContainer>

                            <MDBContainer className="col-example ">
                                <MDBContainer className="text-center">
                                    <MDBContainer className="text-center shadow-container">
                                        <a href={"/conocimientos-tematica/"+this.state.article.id}> <div className="conocimiento"></div></a>
                                        <h5>Conocimientos</h5>
                                    </MDBContainer>
                                </MDBContainer>
                            </MDBContainer>

                            <MDBContainer className="col-example ">
                                <MDBContainer className="text-center">
                                    <MDBContainer className="text-center shadow-container">
                                        <a href={"/proyectos"}> <div className="proyecto"></div></a>
                                        <h5>Proyectos</h5>
                                    </MDBContainer>
                                </MDBContainer>
                            </MDBContainer>

                        </MDBContainer>
                    </MDBJumbotron>
                </MDBContainer>
              );
        }
        else{
            return(
                <div className="justify-content-center text-center">
                    <div className="spinner-border" role="status">
                        <span className="sr-only">Loading...</span>
                    </div>
                </div>
            );
        }
    }
}

Explore.propTypes = {};

export default Explore;
