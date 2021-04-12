import React from 'react';
//import PropTypes from 'prop-types';
import {MDBContainer} from 'mdbreact';
import ArticleFigures from './ArticleFigures.jsx';
import '../../sass/ArticleFigures.css'
class ArticleFiguresAlbum extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            figuresCount: props.figuresCount,
            figures: props.figures
        };
    }
    
    render() {
        return(
            <MDBContainer className="d-flex flex-wrap figure-container">
                {this.state.figures.map((pb)=>{
                    return <ArticleFigures key={pb.id} figures={pb}/>;
                })}
            </MDBContainer>
        );
    }
}

ArticleFiguresAlbum.propTypes = {};

export default ArticleFiguresAlbum;
