import React from 'react';
import {MDBContainer} from 'mdbreact'

class ArticlesFollowed extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            articles: props.articles
        };
    }

    render() {
        return (
            <MDBContainer className="mb-0">
                <span><b>Temáticas que sigues:</b></span>
                <ul>
                    {this.state.articles.map((e,index)=>{
                        return <li key={index}> <a href={"/explorar/"+e.id} className="a-grey">{e.title}</a> </li>
                    })}
                </ul>
            </MDBContainer>
        );
    }
}

export default ArticlesFollowed;
