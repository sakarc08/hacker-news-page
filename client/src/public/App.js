import '@babel/polyfill'
import React, { useEffect } from 'react'
import PropTypes from 'prop-types'
import { Provider } from 'react-redux';
import { Route, Router, Switch, StaticRouter, BrowserRouter } from 'react-router-dom'
import store from './store'
import Signup from './components/Signup';
import StoryBoardRoute from './components/StoryBoardRoute';
import Login from './components/Login';
import { createMemoryHistory } from 'history';
import PrivateRoute from './routing/PrivateRoute'
import Landing from './components/Landing';
import { loadUser } from './actions/Login';
import setToken from './utils/setToken'

const history = createMemoryHistory();

const App = props => {
    useEffect(() => {
        if(typeof window !== 'undefined' && window.localStorage.token) setToken(window.localStorage.token);
        store.dispatch(loadUser())
    }, [])
    return (
        <Provider store={store}>
            <Router history={history}>
                <Route exact path="/" component={Landing}></Route>
                <Switch>
                    <Route exact path="/login" component={Login}></Route>
                    <Route exact path="/signup" component={Signup}></Route>
                    <PrivateRoute exact path="/storyboard" Component={StoryBoardRoute} />
                </Switch>
            </Router>
        </Provider>
    )
}

App.propTypes = {

}

export default App
