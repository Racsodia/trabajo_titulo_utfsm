import React from 'react';
import PropTypes from 'prop-types';

class UserComments extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            user_id: props.user_id,
            response: props.response,
            rendermode: props.rendermode,
            comments: [],
            isOpen: false
        };
    }

    render() {
        return (
            <div></div>
        );
    }
}

UserComments.propTypes = {};

export default UserComments;

