import React from 'react';
import ChallengesButton from './ChallengesButton';
import Loading from './Loading';

import { Query } from "react-apollo";
import { ALL_CHALLENGES_ALBUM, CHALLENGE_ARTICLE, CHALLENGE_PROJECT } from '../queries.js';

import '../../sass/ChallengesAlbum.css';

class ChallengesAlbum extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            rendermode: props.rendermode,
            filter: props.filter,
            query: ALL_CHALLENGES_ALBUM,
            id: props.id,
            type: null,
        };
    }

    componentWillMount () {
        if (this.state.filter != 'all') {
            if (this.state.filter == 'articles') this.setState({query: CHALLENGE_ARTICLE, type: 'App\\Article'})
            else if (this.state.filter == 'projects') this.setState({query: CHALLENGE_ARTICLE, type: 'App\\Project'})
        }
    }

    render() {
        let challengeable_id = this.state.id
        let challengeable_type = this.state.type
        let query = this.state.query
        let data = {}
        if (challengeable_id != null && typeof challengeable_id != 'undefined') data['challengeable_id'] = challengeable_id
        if (challengeable_type != null && typeof challengeable_type != 'undefined') data['challengeable_type'] = challengeable_type

        return (
            <Query query = {query} variables = {data}>
                {({loading, error, data}) => {
                    if (loading) return <Loading/>
                    if (error) return <div>Error</div>

                    return (
                        data.challenges.data.map((pb)=>{
                            return <ChallengesButton key={pb.id} challenge={pb} rendermode={this.state.rendermode}/>
                        })
                    )
                }}
                {/* {challenges.has_more_pages && <MDBBtn onClick={this.showMoreChallenges}>Mostrar más</MDBBtn>} */}
            </Query>
        )
    }
}

export default ChallengesAlbum;
