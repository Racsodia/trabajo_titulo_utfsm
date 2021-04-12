import React from 'react';
import {MDBBtn} from 'mdbreact';
import WallButton from './WallButton';

class WallAlbum extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            wallItems: props.wallItems
        };
    }

    render() {
            return (
                <div>
                    {this.state.wallItems.map((i,index)=>{
                        return(
                            <WallButton key={index} wallElement={i}/>
                        );
                    })}
                    {/*this.state.response.next_page_url && <MDBBtn onClick={this.showMoreItems}>Mostrar más</MDBBtn>*/}
                </div>
            );
    }
}

export default WallAlbum;
