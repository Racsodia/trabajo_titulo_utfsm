import React from 'react';
import {MDBContainer,MDBJumbotron} from 'mdbreact';
import '../../sass/Explore.css';
import '../../sass/SaludMejor.css'
class ExplorePreview extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            article: props.article,
        };
    }

    render() {
        let colorClass = "title-container align-content-center" + " " +this.state.article.color;
            return (
                <MDBContainer fluid className="pl-0 pr-0" >
                  <div className={colorClass}>
                      <div className="container-text">
                            <img className="icon-size-box" src={this.state.article.icon_uri} alt="icon" />
                            <h5 className="title-align">
                                {this.state.article.title}
                            </h5>
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
                            <MDBContainer className="d-flex flex-wrap figure-container">
                            {this.state.article.figures.map((e,index) =>{
                                return(
                                    <MDBContainer key={index} className="figure-container col-sm-4">
                                        <MDBContainer className="p-0">
                                            <h4 className="text-center title-figure-padding"> {e.figure} </h4>         
                                        </MDBContainer>
                                        <hr className="mt-0 mb-0"></hr>
                                        <MDBContainer className="text-justify p-0 ">
                                          <p>  {e.context}</p>
                                        </MDBContainer>
                                    </MDBContainer>  
                                )
                            })}
                            </MDBContainer>
                        </MDBContainer>
                    </MDBJumbotron>
                </MDBContainer>
              );
    }
}

ExplorePreview.propTypes = {};

export default ExplorePreview;
