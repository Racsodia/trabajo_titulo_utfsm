/**
 * Archivo principal de JavaScript que importa toda la aplicación de Salud Mejor.
 * FrameWork: ReactJS
 * Version: 16.8.6 - Ver archivo package.json
 * Copyright (c) 2019
 * Kauel - INVENCIONES TECNOLOGICAS
 * Autor: Óscar Aguilera
 *
 * Compiler: npm Version 6.4.1
 */

import React, { Component, useReducer } from 'react'
import ReactDOM from 'react-dom'
import { BrowserRouter as Router, Switch, Route } from "react-router-dom"

import Home from '../Pages/Home'
import Explore from '../Pages/Explore'

import ChallengesPage from '../Pages/ChallengesPage'
import ChallengeArticle from '../Pages/ChallengeArticle'
import ChallengeProject from '../Pages/ChallengeProjects'

import PublicationsPage from '../Pages/PublicationsPage'
import PublicationArticle from '../Pages/PublicationArticle'

import ProjectsPage from '../Pages/ProjectsPage'
import ProjectsArticle from '../Pages/ProjectsArticle'
import ProjectsCreate from '../Pages/ProjectsCreate'

import Profile from '../Pages/Profile'
import WallPage from '../Pages/WallPage'
import UsersList from '../Pages/UsersList'
import ArticleCreate from '../Pages/ArticleCreate'
import OrganizationsPage from '../Pages/OrganizationsPage'
import OrganizationProfile from '../Pages/OrganizationProfile'

import {ApolloProvider} from "react-apollo"
import ApolloClient from "apollo-client"
import { createHttpLink } from 'apollo-link-http'
import { setContext } from 'apollo-link-context'
import { InMemoryCache } from 'apollo-cache-inmemory'

import 'bootstrap-css-only/css/bootstrap.min.css'
import 'mdbreact/dist/css/mdb.css'

import { Query } from "react-apollo"
import { GET_USER } from '../queries'
import Loading from '../components/Loading'

const httpLink = createHttpLink({
    uri: '/graphql',
})

const client = new ApolloClient({
    link: httpLink,
    cache: new InMemoryCache()
})

const authLink = setContext((_, { headers }) => {
    const token = localStorage.getItem('tk');
    return {
        headers: {
            ...headers,
            authorization: token ? `Bearer ${token}` : "",
        }
    }
})
const mutationLink = createHttpLink({
    uri: '/graphql/authenticated'
})
const mutationClient = new ApolloClient({
    link: authLink.concat(mutationLink),
    cache: new InMemoryCache()
})
export default class App extends Component {
    constructor(props) {
        super(props)
        this.state = {}
    }

    render() {
        let id = document.getElementById('app').dataset.user
        let chosenClient
        if (id == 'null') {
            id = 0
            chosenClient = client
        }
        else {
            id = parseInt(id)
            chosenClient = mutationClient
        }
        return (
            <ApolloProvider client = {chosenClient}>
                <Query query = {GET_USER} variables = {{id: id}}>
                    {({loading, error, data: {users}}) => {
                        if (loading) return <Loading/>
                        if (error) return <div>Error</div>

                        let user = users.data[0]
                        let orgs = "-"
                        if (typeof user != 'undefined') {
                            localStorage.setItem("uID", user.id)
                            if (user.organization != null) localStorage.setItem("oID", user.organization.id)
                            localStorage.setItem("uTP", user.type)
                            localStorage.setItem("org", user.org_admin)
                            localStorage.setItem("vrf", user.verified)
                            if (user != []) user.organizationsfollowing.map(o => { orgs += o.id+"-" })
                        }
                        return(
                            <Router>
                                <React.Fragment>
                                    <div id = 'of' data-orgs = {orgs}></div>
                                    <Route exact path="/" component = {Home} user = {user}/>
                                    <Route path="/home/" component = {Home}/>
                                    <Route path="/explorar/:id" component = {Explore} />
                                    <Route path="/desafios" component ={ChallengesPage}/>
                                    <Route path="/desafios-tematica/:id" component ={ChallengeArticle}/>
                                    <Route path="/desafios-proyecto/:id" component ={ChallengeProject}/>
                                    <Route path="/conocimientos" component ={PublicationsPage} />
                                    <Route path="/conocimientos-tematica/:id" component={PublicationArticle}/>
                                    <Route exact path ="/proyectos" component ={ProjectsPage} />
                                    <Route path="/proyectos/:id" component={ProjectsArticle}/>
                                    <Route path="/perfil" component = {Profile} />
                                    <Route path="/gestionar-usuarios" component={UsersList}/>
                                    <Route path="/gestionar-tematicas" component={ArticleCreate}/>
                                    <Route path="/lista-organizaciones" component={OrganizationsPage}/>
                                    <Route path="/organizaciones/:id" component={OrganizationProfile}/>
                                    <Route path="/gestionar-proyectos" component={ProjectsCreate}/>
                                    <Route path="/muro" component={WallPage} user = {user}/>
                                </React.Fragment>
                            </Router>
                        )
                    }}
                </Query>
            </ApolloProvider>
        );
    }
}

if (document.getElementById('content')) ReactDOM.render(<App />, document.getElementById('content'))
