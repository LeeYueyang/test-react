import React, { Component } from 'react';
import {Route, Switch } from 'react-router-dom';
import {Router} from 'react-router';
import routes from './config/routes';
import history from './utils/history'

export default class App extends Component {
    render() {
        return (
            <Router history={history}>
                <Switch>
                    {
                        routes.map((route, index) => <Route {...route} key={index} />)
                    }
                </Switch>
            </Router>
        )
    }
}
