import React from 'react';
import {MDBRow,MDBCol,MDBContainer} from 'mdbreact';
import ReadMoreReact from 'read-more-react';
import '../../sass/SaludMejor.css';

import ModalDeleteProject from './ModalDeleteProject'
import ModalEditProject from './ModalEditProject';
class ProjectButton extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            project: props.project,
            rendermode: props.rendermode,
            readmore: props.readmore,
            delete: false
        };
    }
    delete = () => {
        this.setState({delete: true})
    }
    edit = (p) => {
        this.setState({project: p})
    }
    render() {
        if(this.state.rendermode == 1){
            let organization = this.state.project.organization
            return (
                <MDBContainer className="border-project mt-2 mb-2 ">
                    <a href = {'/proyectos/'+this.state.project.id}>
                        <MDBRow>
                            <MDBCol size="4" className="pl-2 pr-2 ">
                                <img src={organization.photo_uri} alt="Organization_icon" className="h-100p" />
                            </MDBCol>
                            <MDBCol size="8">
                                <p className="text-uppercase">{organization.name}</p>
                                <b>{this.state.project.name}</b>
                            </MDBCol>
                        </MDBRow>
                    </a>
                    <hr className="hr-bar"></hr>
                    <MDBRow className="pl-2 pr-2">
                        <img src={this.state.project.photo_uri} alt="project_img" className="project-box-img"/>
                    </MDBRow>
                    <MDBRow>
                        {this.state.readmore != false && <a className="text-justify pl-2 pr-2"><ReadMoreReact  text={this.state.project.context} readMoreText ="Leer más"/></a>}
                        {this.state.readmore == false && <a className="text-justify pl-2 pr-2">{this.state.project.context}</a>}
                    </MDBRow>
                </MDBContainer>
            )
        }

        if(this.state.rendermode == 2){
            return(
                <MDBRow className="justify-content-center">
                    <MDBCol size="8"  className=" text-center bg10 mt-2 ">
                        <a className="a-link"  href={"/desafios-proyecto/" + this.state.project.id} >
                            <h5 className="mt-2">{this.state.project.name}</h5>
                        </a>
                    </MDBCol>
                </MDBRow>
            )
        }
        if(this.state.rendermode == 3){
            if (!this.state.delete) {
                let organization = this.state.project.organization
                return(
                    <MDBRow className="mt-2">
                        <MDBCol size="sm-1">{this.state.project.id} </MDBCol>
                        <MDBCol size="sm-3">{this.state.project.name} </MDBCol>
                        <MDBCol size="sm-2">{organization.name}</MDBCol>
                        <MDBCol size="sm-2">{this.state.project.status} </MDBCol>
                        <MDBCol size="sm-3"><ReadMoreReact text={this.state.project.context} readMoreText ="Leer más"/></MDBCol>
                        <MDBCol size="sm-1" >
                            <MDBRow>
                                <ModalDeleteProject id = {this.state.project.id} name = {this.state.project.name} org = {this.state.project.organization.name} update = {this.delete}/>
                            </MDBRow>
                            <MDBRow>
                                <ModalEditProject pj = {this.state.project} update = {this.edit}>Editar</ModalEditProject>
                            </MDBRow>
                        </MDBCol>
                    </MDBRow>
                )
            } else return null
        }
        if(this.state.rendermode == 4){
            return(
                <MDBRow className="justify-content-center text-center bg10 mt-2">
                    <a className="a-link"  href={"/desafios-proyecto/" + this.state.project.id} >
                        <h5 className="mt-2">
                            {this.state.project.name}
                        </h5>
                    </a>
                </MDBRow>
            )
        }
    }
}

export default ProjectButton;
