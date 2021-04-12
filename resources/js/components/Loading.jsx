import React from 'react'

class Loading extends React.Component {
    render() {
        return(
            <div className="justify-content-center text-center pt-5">
                <div className="pt-5">
                    <div className="spinner-border" role="status">
                        <span className="sr-only">Loading...</span>
                    </div>
                </div>
            </div>
        );
    }
}

export default Loading;
