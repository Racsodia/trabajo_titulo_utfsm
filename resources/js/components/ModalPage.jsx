import React from 'react';
import { Container, Button, Modal, ModalBody, ModalHeader, ModalFooter, MDBContainer,MDBCol,MDBRow} from 'mdbreact';
import '../../sass/ModalPage.css';

const paddingTop = 0;
const paddingBottom = 0;
class ModalPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      modal: false,
      isGoing: false,
      conditions:false,
    };
  }

  handleInputChange = e =>{

      this.setState({
          isGoing: !this.state.isGoing,
          conditions: false,
      })
  }
  handleGoogle = e =>{
      e.preventDefault()
      if(this.state.isGoing){
          window.location='/auth/google'
      }
      else{
        this.setState({
            conditions: true,
        })
      }
  }

  handleFacebook = e =>{
    e.preventDefault()
    if(this.state.isGoing){
        window.location='/auth/facebook'
    }
    else{
        this.setState({
            conditions: true,
        })
    }
  }

  toggle = () => {
    this.setState({
      modal: !this.state.modal,
      conditions: false,
      isGoing: false,
    });
  }

  render() {
   // console.log(this.state)
    return (

      <Container style={{padding: paddingTop + 'px',padding: paddingBottom + 'px'}}>
        <Button className="btn-login" onClick={this.toggle}>Ingresar</Button>
        <Modal isOpen={this.state.modal} toggle={this.toggle} className="modal-login" >
          <ModalHeader className="bg05" toggle={this.toggle}>Regresaste a <b>Salud Mejor</b></ModalHeader>
          <ModalBody>
            <MDBContainer>
                <MDBRow>
                    <MDBCol md="12">
                    <MDBContainer className="text-center">
                    <MDBRow>
                    <MDBCol size="sm-12">
                    <h5 className="text-center">Ingresa con tus redes sociales:</h5>
                    </MDBCol>
                    <MDBContainer></MDBContainer>
                    </MDBRow>

                    <MDBRow>
                        <MDBCol size="sm-12">
                        <a onClick={this.handleGoogle} className="btn google-btn "><img src="https://images.hu-production.be/static/img/google-logo.svg" width="24" height="24"></img> Google</a>
                        </MDBCol>
                    </MDBRow>
                    <MDBRow>
                        <MDBCol size="sm-12">
                        <a onClick={this.handleFacebook} className="btn facebook-btn"><i className="fab fa-facebook fa-1x"></i> Facebook</a>
                        </MDBCol>
                    </MDBRow>

                    <MDBRow>
                    <MDBContainer>
                        <form>
                            <input
                            type="checkbox"
                            name="isGoing"
                            checked={this.state.isGoing}
                            onChange={this.handleInputChange}
                            />
                            Aceptar los <a href="/terminos-de-servicio">Términos y condiciones</a>
                        </form>
                        {this.state.conditions && <p className="danger-color-dark white">Debes aceptar los términos y condiciones</p>}
                    </MDBContainer>
                    <MDBCol size="sm-12">
                    <a onClick={this.toggle} className="btn close-btn">Cerrar</a>
                    </MDBCol>

                    </MDBRow>

                      {/* <a href="/auth/twitter" className="btn"><i className="fab fa-twitter"></i> Twitter</a> */}
                    </MDBContainer>
                    </MDBCol>
                </MDBRow>
            </MDBContainer>
          </ModalBody>
        </Modal>
      </Container>
    );
  }
}

export default ModalPage;
