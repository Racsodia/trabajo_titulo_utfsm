import React from 'react';
import ChallengesButton from './ChallengesButton';
import ProjectButton from './ProjectButton'
import KnowledgeButton from './KnowledgeButton'
class WallButton extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            wallElement: props.wallElement,
        };
    }

    render() {
        let type = this.state.wallElement.__typename
        if(type == 'ChallengeType'){
            return (
                <ChallengesButton key={this.state.wallElement.id} challenge={this.state.wallElement} likesCount={this.state.wallElement.likes_count} user_id = {this.state.wallElement.user.id} rendermode={1}/>
            );
        }
        if(type == 'OrganizationType' || type == 'ProjectType'){
            return(
                <ProjectButton key={this.state.wallElement.id} project ={this.state.wallElement} rendermode={1}/>
            );
        }
        if(type == 'PublicationType'){
            return(
                <KnowledgeButton key={this.state.wallElement.id} publication={this.state.wallElement} likesCount={this.state.wallElement.likesCount} rendermode={1}/>
            )
        }
    }
}

WallButton.propTypes = {};

export default WallButton;
