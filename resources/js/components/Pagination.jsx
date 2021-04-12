import React from 'react';
// import PropTypes from 'prop-types';
import {MDBPagination, MDBPageItem, MDBPageNav,MDBRow} from 'mdbreact';

class Pagination extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            total: props.total,
            first_page= props.first_page,
            last_page: props.last_page,
            last: props.last
        };
    }

    render() {
        return (
            <MDBRow>
                
            </MDBRow>
        );
    }
}

Pagination.propTypes = {};

export default Pagination;
