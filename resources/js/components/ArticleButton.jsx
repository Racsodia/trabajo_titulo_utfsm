import React from 'react';
import {Link} from 'react-router-dom';
import {MDBRow} from "mdbreact";
import '../../sass/ArticleButton.css';

class ArticleButton extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            article: props.article,
            link_type: props.link_type,
            rendermode: props.rendermode,
        };

    }

    render() {
        if(this.state.rendermode == 1){
            let CustomStyle = "p-0 col-md-3 btn-article mb-2 ml-3 mr-3" +" "+ this.state.article.color;
            return (
                <Link className={CustomStyle} to={"/explorar/" + this.state.article.id} >
                    <img className="icon-size margin-icon" src={this.state.article.icon_uri} alt="icono" />
                    <h5>{this.state.article.title}</h5>
                </Link>
            )
        }
        if(this.state.rendermode == 2){
            let CustomStyle = "col-md-10 btn-article-2 mb-2" +" "+ this.state.article.color;
            if(this.state.link_type == "challenge"){
                return(
                    <MDBRow className="justify-content-center">
                        <a className={CustomStyle} href={"/desafios-tematica/"+this.state.article.id}>
                            <h5 className="text-uppercase mt-1">{this.state.article.title}</h5>
                        </a>
                    </MDBRow>
                )
            }
            if(this.state.link_type == "publication"){
                return(
                    <MDBRow className="justify-content-center">
                        <a className={CustomStyle} href={"/conocimientos-tematica/" + this.state.article.id}>
                            <h5 className="text-uppercase mt-1">{this.state.article.title}</h5>
                        </a>
                    </MDBRow>
                )
            }
        }
        if(this.state.rendermode == 3){
            let CustomStyle = "col-md-10 btn-article-3 mb-2" +" "+ this.state.article.color;
            if(this.state.link_type == "challenge"){
                return(
                    <MDBRow className="justify-content-center">
                        <a className={CustomStyle} href={"/desafios-tematica/"+this.state.article.id}>
                            <h5 className="text-uppercase mt-1">{this.state.article.title}</h5>
                        </a>
                    </MDBRow>
                )
            }
            if(this.state.link_type == "publication"){
                return(
                    <MDBRow className="justify-content-center">
                        <a className={CustomStyle} href={"/conocimientos-tematica/" + this.state.article.id}>
                            <h5 className="text-uppercase mt-1">{this.state.article.title}</h5>
                        </a>
                    </MDBRow>
                )
            }
        }
    }
}

export default ArticleButton;
