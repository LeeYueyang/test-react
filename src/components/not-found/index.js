import React, { Component } from 'react'
import loginCheck from '../../containers/with-login-check';

@loginCheck
class NotFound extends Component {
    render() {
        return (
            <div>
                404.
            </div>
        )
    }
}

export default NotFound;