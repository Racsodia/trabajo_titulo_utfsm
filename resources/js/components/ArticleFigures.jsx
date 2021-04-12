import React from 'react';
//import PropTypes from 'prop-types';
import {MDBContainer,Fa} from 'mdbreact';
import '../../sass/ArticleFigures.css'
class ArticleFigures extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            figures: props.figures,
        };
    }

    render() {
        return (
            <MDBContainer className="figure-container col-md-4">
                <MDBContainer className="p-0">
                    <h4 className="text-center title-figure-padding"> {this.state.figures.figure} </h4>         
                </MDBContainer>
                <hr className="mt-0 mb-0"></hr>
                <MDBContainer className="text-justify p-0 ">
                    {this.state.figures.context}
                </MDBContainer>
            </MDBContainer>
        );      
    }
}

ArticleFigures.propTypes = {};

export default ArticleFigures;