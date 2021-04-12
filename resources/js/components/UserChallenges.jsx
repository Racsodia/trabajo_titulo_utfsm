import React from 'react';
import {MDBRow,MDBBtn, MDBContainer} from 'mdbreact'
import ChallengesButton from './ChallengesButton'

var showElements = 6;

class UserChallenges extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            user_id: props.user_id,
            rendermode: props.rendermode,
            challenges: props.challenges
        };
    }

    render() {
        return (
            <MDBContainer>
                <MDBRow>
                    {this.state.challenges.map(pb => {
                        return <ChallengesButton key={pb.id} user_id = {this.state.user_id} challenge={pb} rendermode={this.state.rendermode}/>
                    })}
                        {/* this.state.response.next_page_url && <MDBBtn onClick={this.showMoreChallenges}>Mostrar más</MDBBtn> */}
                </MDBRow>
            </MDBContainer>
        )
    }
}

export default UserChallenges;
