import React from 'react'
//import PropTypes from 'prop-types'
import {MDBContainer} from 'mdbreact'
import urls from '../URLs.js'
import KnowledgeButton from './KnowledgeButton'
import Loading from './Loading'

import { Query } from "react-apollo"
import { MOST_COMMENTED_PUBLICATIONS } from '../queries.js';

class MostCommentedPublications extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            rendermode: props.rendermode,
        };
    }
    render() {
        return (
            <Query query = {MOST_COMMENTED_PUBLICATIONS}>
                {({loading, error, data: {publications}}) => {
                    if (loading) return <Loading/>
                    if (error) return null

                    publications = publications.data
                    return(
                        <MDBContainer className="w-100">
                            {
                            publications.map((pb)=>{
                                return(
                                    <KnowledgeButton key={pb.id} likesCount={pb.likes_count} publication={pb} rendermode={this.state.rendermode} query = {MOST_COMMENTED_PUBLICATIONS}></KnowledgeButton>
                                );
                            })}
                        </MDBContainer>
                    );
                }}
            </Query>
        )
    }
}

MostCommentedPublications.propTypes = {};

export default MostCommentedPublications;
