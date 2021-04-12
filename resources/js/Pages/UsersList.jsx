import React from 'react'
import {MDBJumbotron,MDBRow,MDBCol,MDBBtn} from 'mdbreact';
import '../../sass/SaludMejor.css'

import DatatablePage from '../components/DataTablePage';
import EditPopup from '../components/EditPopup'
import { Query } from 'react-apollo';
import Loading from '../components/Loading';
import { GET_USER, ALL_USERS } from '../queries';

class UsersList extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            users: [],
            organizations:[],
            user: props.user,
            columns: [
                    { label: 'ID:', field: 'id', sort: 'asc'},
                    { label: 'Foto:', field: 'foto', sort: 'asc' },
                    { label: 'Nombre:', field: 'nombre', sort: 'asc' },
                    { label: 'Ocupación:', field: 'ocupacion', sort: 'asc' },
                    { label: 'Institución:', field: 'institucion', sort: 'asc' },
                    { label: 'Verificado:', field: 'verificado', sort: 'asc' },
                    { label: 'Rango:', field: 'rango', sort: 'asc' },
                    { label: '', field: 'boton', },
                ],
            rows: [],
            total: 0,
            page: 1,
            more: true,
        }
    }

    showMoreElements (current_page, a) {
        if (a == "forward") this.setState({page: current_page + 1})
        else if (a == "backward") this.setState({page: current_page - 1})
    }
    showOrganization = (o) => {
        if (o != null) return o.name
        else return <p>Sin organización</p>
    }
    delete = (id) => {
        window.location.reload()
        /* this.setState({rows: this.state.rows.filter(u => {return u.id != id})}) */
    }

    render() {
        let id = parseInt(document.getElementById('app').dataset.user)
        return (
            <Query query = {GET_USER} variables = {{id}}>
                {({loading, error, data: {users}}) => {
                    if (loading) return <Loading/>
                    if (error) return 'Error'

                    let user = users.data[0]

                    return (
                        <Query query = {ALL_USERS} variables = {{page: parseInt(this.state.page)}}>
                            {({loading, error, data: {users}}) => {
                                if (loading) return <Loading/>
                                if (error) return 'Error'

                                let has_more_pages = users.has_more_pages
                                let current_page = users.current_page
                                users = users.data

                                if(user.type == "super_admin"){
                                    var rendermode = 1
                                }
                                else if(user.type == "admin"){
                                    var rendermode = 2
                                }
                                else if(user.type=="minsal"){
                                    var rendermode = 3
                                }
                                else if(user.type == "general" && user.org_admin=="yes"){
                                    var rendermode  = 4
                                    users = []

                                    for(let i=0; i<this.state.users.length; i++){
                                        if(this.state.user.organization.id == this.state.users[i].organization.id ){
                                            users.push(this.state.users[i])
                                        }
                                    }
                                } else return(window.location = '/')

                                let rows = []
                                users.map(us => {
                                    rows.push (
                                        {
                                            id: us.id,
                                            foto: <img className="br-50 img-size" src = {us.photo_uri} alt = 'foto'/>,
                                            nombre: us.name,
                                            ocupacion: <div id = {'position'+us.id}>{us.position}</div>,
                                            institucion: <div id = {'organization'+us.id}>{this.showOrganization(us.organization)}</div>,
                                            verificado: <div id = {'verified'+us.id}>{us.verified == "yes"?"Sí":"No"}</div>,
                                            rango: <div id = {'type'+us.id}>{us.type}</div>,
                                            boton: <EditPopup
                                                    user = {us}
                                                    organizations = {this.state.organizations}
                                                    page = {parseInt(this.state.page)}
                                                    rendermode = {rendermode}
                                                    update = {this.delete}
                                                    />
                                        }
                                    )
                                })

                                return (
                                    <MDBJumbotron  className="pt-5">
                                        <MDBJumbotron  className="pt-5">
                                            <MDBRow> <h4>Lista de usuarios</h4> </MDBRow>
                                            <hr/>
                                            <DatatablePage key = {current_page} data = {{'columns': this.state.columns, 'rows': rows}}/>
                                            <MDBRow>
                                                <MDBCol size = "2">
                                                    {current_page > 1 && <MDBBtn onClick = {
                                                        () => { this.showMoreElements(current_page, "backward") }
                                                    }>Anterior</MDBBtn>}
                                                </MDBCol>
                                                <MDBCol size = "8"></MDBCol>
                                                <MDBCol size = "2">
                                                    {has_more_pages && <MDBBtn onClick = {
                                                        () => { this.showMoreElements(current_page, "forward") }
                                                    }>Siguiente</MDBBtn>}
                                                </MDBCol>
                                            </MDBRow>
                                        </MDBJumbotron>
                                    </MDBJumbotron>
                                )
                            }}
                        </Query>
                    )
                }}
            </Query>
        )
    }
}

export default UsersList;
