import React from 'react';
import { MDBDataTable } from 'mdbreact';

class DatatablePage extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            data: props.data
        }
    }

    render () {
        return(
            <MDBDataTable
                striped
                bordered
                small
                data = {this.state.data}
                paging = {false}
                paginationLabel = {['Anterior', 'Siguiente']}
                responsive
                entriesLabel = 'Usuarios por página '
                entriesOptions = {[20]}
                infoLabel = {['Mostrando', 'a', 'de', 'entradas']}
                sortable = {false}
                fixed
                searching = {false}
            />
        )
    }
}

export default DatatablePage;
