import React from 'react';
// import PropTypes from 'prop-types';
import {MDBContainer} from 'mdbreact';
import ChallengesButton from './ChallengesButton.jsx';

import { Query } from "react-apollo";
import { MOST_COMMENT_CHALLENGES } from '../queries';

class MostCommentChallenges extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            rendermode: props.rendermode,
        };
    }

    render() {
        return (
            <Query query = {MOST_COMMENT_CHALLENGES}>
                {({loading, error, data: {challenges}}) => {
                    if (loading) return 'loading...'
                    if (error) return 'Error'

                    return(
                        <MDBContainer className="w-100">
                            {
                            challenges.data.map((ch)=>{
                                return(
                                    <ChallengesButton key={ch.id} challenge={ch} likesCount={ch.likes_count} user_id = {ch.user.id} rendermode={this.state.rendermode}></ChallengesButton>
                                );
                            })}
                        </MDBContainer>
                    )
                }}
            </Query>
        );
    }
}

MostCommentChallenges.propTypes = {};

export default MostCommentChallenges;
