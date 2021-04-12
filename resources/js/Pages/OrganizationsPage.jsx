import React from 'react';
import {MDBContainer,MDBJumbotron} from 'mdbreact'
import OrganizationsAlbum from '../components/OrganizationsAlbum';
import Loading from '../components/Loading'

import { Query } from "react-apollo";
import { ORGANIZATIONS_PAGE } from '../queries';

class OrganizationsPage extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
        };
    }

    render() {
        return (
            <Query query = {ORGANIZATIONS_PAGE}>
                {({loading, error, data: {organizations}}) => {
                    if (loading) return <Loading/>
                    if (error) return <div>Error</div>

                    let d = new Date()
                    let key = d.getTime()

                    return (
                        <MDBContainer className="pt-5">
                            <MDBJumbotron className="pt-5 w-100">
                                <OrganizationsAlbum key = {key} rendermode = {1} organizations = {organizations.data}/>
                            </MDBJumbotron>
                        </MDBContainer>
                    )
                }}
            </Query>
        );
    }
}

export default OrganizationsPage;
