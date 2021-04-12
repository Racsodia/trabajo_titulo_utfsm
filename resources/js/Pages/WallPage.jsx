import React from 'react';
import {MDBContainer, MDBRow,MDBCol} from 'mdbreact';
import WallAlbum from '../components/WallAlbum'
import User from '../components/User';
import '../../sass/SaludMejor.css'
import ModalCreateChallenge from '../components/ModalCreateChallenge';
import ArticlesAlbum from '../components/ArticlesAlbum';
import ArticlesFollowed from '../components/ArticlesFollowed';
import FollowOrganizations from '../components/FollowOrganizations';

import { Query } from "react-apollo";
import { WALL_PAGE, GET_USER } from '../queries';
import Loading from '../components/Loading';

class WallPage extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            token: localStorage.getItem('tk')
        }
    }
    /* static getDerivedStateFromError(error) {
        var delayInMilliseconds = 100
        setTimeout(function() {
            window.location.href = window.location.href
        }, delayInMilliseconds)
    } */

    render() {
        let id = document.getElementById('app').dataset.user
        id = id == 'null' ? 0 : id
        if (id == 0) return null
        return (
            <Query query = {GET_USER} variables = {{id}}>
                {({loading, error, data: {users, projects, articles}}) => {
                    if (loading) return <Loading/>
                    if (error) return <div>Error</div>

                    let user = users.data[0]
                    let articlesfollowing = user.articlesfollowing
                    let organizationsfollowing = user.organizationsfollowing

                    var itemsArray = []

                    articlesfollowing.map(el => {
                        el.publications.map(el => { itemsArray.push(el) })
                        el.challenges.map(el => { itemsArray.push(el) })
                        el.projects.map(el => { itemsArray.push(el) })
                    })
                    organizationsfollowing.map(el => {
                        el.projects.map(pj => { itemsArray.push(pj) })
                    })
                    itemsArray.sort((a,b) => { return new Date(b.updated_at) - new Date(a.updated_at) })

                    return (
                        <div className="pt-5">
                            <MDBContainer className="pt-5 pl-0 pr-0">
                                <MDBRow className="p-0 m-0">
                                    <MDBCol size="sm-3">
                                        <User user = {user} rendermode ={2}/>
                                        <div className={"w-100 modal-shadow mt-3"}>
                                            <ArticlesFollowed articles = {articlesfollowing}/>
                                            <FollowOrganizations organizations = {organizationsfollowing || []}/>
                                            {/* <OrganizationsAlbum rendermode={3} organizations = {organizationsfollowing}></OrganizationsAlbum> */}
                                        </div>
                                    </MDBCol>
                                    <MDBCol size="sm-6">
                                        <ModalCreateChallenge articles = {articles} projects = {projects} newChallenge={this.setNewChallenge} userId = {user.id} rendermode={1}/>
                                        <WallAlbum wallItems = {itemsArray}/>
                                    </MDBCol>
                                    <MDBCol size="sm-3">
                                        <hr className="hr-bar w-100"></hr>
                                        <h5 className="text-center"><b>Temáticas</b></h5>
                                        <hr className="hr-bar w-100"></hr>
                                        {articlesfollowing != null && <ArticlesAlbum rendermode={3} link_type="challenge" articles = {articlesfollowing}/>}
                                    </MDBCol>
                                </MDBRow>
                            </MDBContainer>
                        </div>
                    )
                }}
            </Query>
        )
    }
}

export default WallPage;
