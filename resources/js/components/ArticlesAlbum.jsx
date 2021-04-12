import React from 'react';
import {MDBBtnGroup, MDBContainer} from "mdbreact";
import ArticleButton from './ArticleButton.jsx';

class ArticlesAlbum extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            articles: props.articles,
            rendermode: props.rendermode,
            link_type: props.link_type,
        };
    }

    render() {
        if (this.state.rendermode == 1) {
            return (
                <MDBContainer className="article-container text-center">
                    <MDBBtnGroup className="flex-wrap justify-content-center">
                        {this.state.articles.map((ar)=>{
                            return <ArticleButton key={ar.id} article={ar} rendermode={this.state.rendermode} link_type = {this.state.link_type}/>
                        })}
                    </MDBBtnGroup>
                </MDBContainer>
            );
        }
        if(this.state.rendermode == 2 || this.state.rendermode==3) {
            return(
                <div>
                    {this.state.articles.map((ar)=>{
                        return <ArticleButton key={ar.id} article={ar} rendermode={this.state.rendermode} link_type = {this.state.link_type}/>
                    })}
                </div>
            )
        }
    }
}

export default ArticlesAlbum;
