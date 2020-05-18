import React from 'react'
import PropTypes from 'prop-types'
import { Provider } from 'react-redux';
import { Route, Router, Switch } from 'react-router-dom'
import store from './store'
import Signup from './components/Signup';
import Login from './components/Login';
import { createMemoryHistory } from 'history';

const history = createMemoryHistory();

const App = props => {
    return (
        <Provider store={store}>
            <Router history={history}>
                <Switch>
                    <Route exact path="/" component={Signup}></Route>
                    <Route path="/login" component={Login}></Route>
                </Switch>
            </Router>
        </Provider>
    )
}

App.propTypes = {

}

export default App
