import React from 'react';
// import PropTypes from 'prop-types';
import {MDBContainer,MDBJumbotron,MDBBtn} from "mdbreact";
import ArticleFiguresAlbum from '../components/ArticleFiguresAlbum';

import { Query, Mutation } from "react-apollo";
import { EXPLORE } from '../queries';
import Loading from '../components/Loading';

import '../../sass/Explore.css';
import '../../sass/SaludMejor.css';
import { FOLLOW_MUTATION } from '../mutations';

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

    /* static getDerivedStateFromError(error) {
        var delayInMilliseconds = 100
        setTimeout(function() {
            window.location.href = window.location.href
        }, delayInMilliseconds)
    } */

    render() {
        let id = this.props.match.params.id
        let idu = localStorage.getItem("uID")

        return(
            <React.Fragment>
                <Query query = {EXPLORE} variables = {{id, idu}}>
                    {({ loading, error, data: {articles, users, figures} }) => {
                        if (loading) return <Loading/>
                        if (error) return `Error! ${error.message}`

                        articles = articles.data[0]
                        let following = users.data[0].articlesfollowing
                        var follow = this.state.isFollowing
                        var colorClass = "align-content-center "+articles.color+" title-container";

                        colorClass += (idu == null) ? "-logout" : '';

                        if (typeof following != 'undefined')
                            for (let i = 0; i < following.length; i++)
                                if (following[i].id == this.props.match.params.id)
                                    follow = true

                        return (
                            <MDBContainer fluid className="pl-0 pr-0">
                                <div className={colorClass}>
                                    <div className="container-text">
                                        <img className="icon-size-box" src={articles.icon_uri} alt="icon" />
                                        <h5 className="title-align">
                                            {articles.title}
                                        </h5>
                                        <Mutation mutation = {FOLLOW_MUTATION} variables = {{id}}>
                                            {(followMutation, {data}) => {
                                                if (loading) return 'Loading'
                                                if (error) return 'Error'

                                                if (typeof data != 'undefined') follow = data.toggleArticleFollow

                                                return (
                                                    <React.Fragment>
                                                        {idu != null && follow && <MDBBtn className="follow-btn" onClick={followMutation}>Siguiendo</MDBBtn>}
                                                        {idu != null && !follow && <MDBBtn className="follow-btn unliked" onClick={followMutation}>Seguir</MDBBtn>}
                                                    </React.Fragment>
                                                )
                                            }}
                                        </Mutation>
                                    </div>
                                </div>
                                <img className="w-100 imgbanner"src={articles.photo_uri}></img>
                                <MDBJumbotron fluid >
                                    <MDBContainer className="text-justify content-bg">
                                        <div className="" dangerouslySetInnerHTML={{__html:articles.content}}/>
                                    </MDBContainer>
                                </MDBJumbotron>
                                <MDBJumbotron className="jumbo-figures">
                                    <MDBContainer className="content-bg mt-0">
                                        <h4 className="figure-title">CIFRAS</h4>
                                        <ArticleFiguresAlbum  figures={figures.data} figuresCount={articles.figures_count}></ArticleFiguresAlbum>
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
                                                <a href={"/desafios-tematica/"+articles.id}> <div className="desafio"></div></a>
                                                    <h5>Desafíos</h5>
                                                </MDBContainer>
                                            </MDBContainer>
                                        </MDBContainer>
                                        <MDBContainer className="col-example ">
                                            <MDBContainer className="text-center">
                                                <MDBContainer className="text-center shadow-container">
                                                    <a href={"/conocimientos-tematica/"+articles.id}> <div className="conocimiento"></div></a>
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
                    }}
                </Query>
            </React.Fragment>
        )
    }
}

export default Explore;
