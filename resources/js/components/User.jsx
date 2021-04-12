import React from 'react';
import {MDBContainer, MDBRow, MDBCol} from 'mdbreact';
import '../../sass/SaludMejor.css';

class User extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            user: props.user,
            organization: props.organization,
            rendermode: props.rendermode,
        };
    }

    render() {
        if (this.state.user === null || typeof this.state.user == 'undefined') return(null)

        let fullname = this.state.user.name
        let photo_uri = this.state.user.photo_uri
        let position = this.state.user.position
        let organization = this.state.organization == null ? 'Sin organización' : this.state.organization

        if(this.state.rendermode == 1){
            return (
                <MDBRow className="w-100">
                    <MDBCol size="sm-2">
                        <img className="img-size img-border" src={photo_uri} alt="Perfil"/>
                    </MDBCol>
                    <MDBCol size="sm-10">
                        <b>{fullname}</b>
                        <p>{position}</p>
                    </MDBCol>
                    <hr/>
                </MDBRow>
            );
        }
        if(this.state.rendermode == 2){
            return (
                <div className="w-100 modal-shadow ">
                    <div className="bg02 h-60p w-100"></div>
                    <div className="w-100 text-center">
                        <img src={photo_uri} alt="perfil" className="profile-card"/>
                    </div>
                    <div className=" text-center w-100">
                        <b>{fullname}</b>
                    </div>
                    <div className="text-center w-100">
                        {position}
                    </div>
                    <div className="text-center w-100">
                        {organization}
                    </div>
                </div>
            )
        }
        if(this.state.rendermode == 3){
            return (
                <div className="pl-1 mt-2 w-100">
                    <div className="w-100"><img className="img-size img-border" src={photo_uri} alt="Perfil"/><b>{fullname}</b> <br/><p className="pl-5 grey-text">{position}</p> </div>
                </div>
            );
        }
        if(this.state.rendermode == 4){
            return (
                <div className="pl-1 mt-2 w-100">
                    <div className="w-100 text-right"><img className="img-size img-border" src={photo_uri} alt="Perfil"/> </div>
                </div>
            );
        }
    }
}

export default User
