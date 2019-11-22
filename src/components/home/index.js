import React, { Component } from 'react';
import loginCheck from '../../containers/with-login-check';

@loginCheck
class Home extends Component {
    render() {
        return (
            <div>
                Home.
            </div>
        )
    }
}

export default Home;