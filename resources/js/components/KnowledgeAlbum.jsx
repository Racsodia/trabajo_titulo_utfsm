import React from 'react'
import {MDBRow,MDBBtn} from 'mdbreact'
import KnowledgeButton from './KnowledgeButton.jsx'
import Loading from '../components/Loading'

import { Query } from "react-apollo"
import { PUBLICATIONS_PAGE, PUBLICATIONS_ARTICLE } from '../queries.js'

class KnowledgeAlbum extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            rendermode: props.rendermode,
            user: props.user,
            filter: props.filter,
            query: PUBLICATIONS_PAGE,
            aId: props.aId
        };
    }

    componentWillMount() {
        if (this.state.filter == 'article') this.setState({query: PUBLICATIONS_ARTICLE})
    }

    render() {
        return (
            <Query query = {this.state.query} variables = {{article_id: this.state.aId}}>
                {({loading, error, data: {publications}}) => {
                    if (loading) return <Loading/>
                    if (error) return null

                    return (
                        <MDBRow>
                            {publications.data.map((pb)=>{
                                return (
                                    <KnowledgeButton key={pb.id} publication={pb} rendermode={this.state.rendermode} query = {this.state.query} user = {this.state.user} />
                                )
                            })}
                            {/* {<MDBBtn onClick={this.showMorePublications}>Mostrar más</MDBBtn>} */}
                        </MDBRow>
                    )
                }}
            </Query>
        )
    }
}

export default KnowledgeAlbum;
