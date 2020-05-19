import '@babel/polyfill'
import React, { useEffect } from 'react'
import PropTypes from 'prop-types'
import { Provider } from 'react-redux';
import { Route, Router, Switch } from 'react-router-dom'
import store from './store'
import Signup from './components/Signup';
import StoryBoardRoute from './components/StoryBoardRoute';
import Login from './components/Login';
import { createMemoryHistory } from 'history';
import setToken from './utils/setToken';
import PrivateRoute from './routing/PrivateRoute'
import Landing from './components/Landing';
import { loadUser } from './actions/Login';

const history = createMemoryHistory();


const App = props => {
    useEffect(() => {
        if(localStorage.token) setToken(localStorage.token);
        store.dispatch(loadUser())
    }, [loadUser])

    return (
        <Provider store={store}>
            <Router history={history}>
                <Switch>
                    <Route exact path="/" component={Landing}></Route>
                    <Route exact path="/login" component={Login}></Route>
                    <Route path="/signUp" component={Signup}></Route>
                    <PrivateRoute path="/storyboard" Component={StoryBoardRoute} />
                </Switch>
            </Router>
        </Provider>
    )
}

App.propTypes = {

}

export default App
