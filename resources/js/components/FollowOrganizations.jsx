import React from 'react';
import PropTypes from 'prop-types';
import {MDBContainer} from 'mdbreact';

class FollowOrganizations extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            organizations: props.organizations
        };
    }
    render() {
        return (
            <MDBContainer className="mb-0">
                <span><b>Organizaciones que sigues:</b></span>
                <ul>
                    {this.state.organizations.map((e,index)=>{
                        return <li key={index}> <a href={"/organizaciones/"+e.id} className="a-grey">{e.name}</a> </li>
                    })}
                </ul>
            </MDBContainer>
        );
    }
}

FollowOrganizations.propTypes = {};

export default FollowOrganizations;
