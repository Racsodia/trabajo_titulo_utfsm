import React from 'react';
import ReactDOM from 'react-dom';


class GetToken extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            user:[],
            token: props.token
        };
    }    render() {
        localStorage.setItem("tk",this.state.token);
        console.log(localStorage.getItem("tk"))
        return null;
    }
}

if (document.getElementById('getToken')) {
    const element = document.getElementById('getToken')

    const props = Object.assign({},element.dataset)
    ReactDOM.render(<GetToken {...props}/>,element)
}

export default(GetToken);
