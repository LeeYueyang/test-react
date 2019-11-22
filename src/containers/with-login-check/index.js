import React, { Component } from "react";
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';

const loginCheck = WrappedComponent => {
    return connect(
        state => ({ token: state.user.token }), null
    )(
        class extends Component {
            static displayName = `LoginCheck(${WrappedComponent.displayName || WrappedComponent.name || 'Component'})`;
            render() {
                const { token, location, ...rest } = this.props;
                if (token) {
                    if (location.pathname === '/login') {
                        return <Redirect to="/" />;
                    }
                } else {
                    if (location.pathname !== '/login') {
                        return <Redirect to="/login" />
                    }
                }
                return <WrappedComponent {...rest} location={location}/>;
            }
        }
    )
}

export default loginCheck;