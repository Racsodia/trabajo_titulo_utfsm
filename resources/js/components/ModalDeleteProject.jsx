import React, { Component } from 'react';
import { MDBContainer, MDBBtn, MDBModal, MDBModalBody, MDBModalHeader, MDBModalFooter } from 'mdbreact';
import { Mutation } from 'react-apollo';
import { DELETE_PROJECT } from '../mutations';
import { PROJECTS_PAGE } from '../queries';

class ModalDeleteProject extends Component {
state = {
  modal: false,
  id: this.props.id,
  name: this.props.name,
  org: this.props.org,
  update: this.props.update
}

toggle = () => {
  this.setState({
    modal: !this.state.modal
  });
}

updateCacheDeleteProject = (cache, {data: {deleteProject}}) => {
    const {projects} = cache.readQuery({query: PROJECTS_PAGE})
    cache.writeQuery({
        query: PROJECTS_PAGE,
        data: {
            projects: {data: projects.data.filter(p => {return p.id != deleteProject}), __typename: 'projectPagination'}
        }
    })
    this.state.update()
}

render() {
  return (
    <MDBContainer>
      <MDBBtn onClick={this.toggle}>Eliminar</MDBBtn>
      <MDBModal isOpen={this.state.modal} toggle={this.toggle} centered size="sm">
        <MDBModalBody>
            {'¿Desea eliminar el proyecto '+this.state.name+', de "'+this.state.org+'"?'}
        </MDBModalBody>
        <MDBModalFooter>
            <MDBBtn color="secondary" onClick={this.toggle}>Cerrar</MDBBtn>
            <Mutation mutation = {DELETE_PROJECT} update = {this.updateCacheDeleteProject}>
                {(deleteProject) => <MDBBtn color="primary" onClick = {
                    () => {
                        let tk = localStorage.getItem('tk')
                        let id = this.state.id
                        let data = {tk, id}
                        deleteProject({variables: data})
                        alert('El proyecto ha sido eliminado exitosamente.')
                        this.setState({modal: false})
                    }
                }>Eliminar</MDBBtn>}
            </Mutation>
        </MDBModalFooter>
      </MDBModal>
    </MDBContainer>
    );
  }
}

export default ModalDeleteProject;
