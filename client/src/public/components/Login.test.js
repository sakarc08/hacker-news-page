import React from 'react';
import ReactDOM from 'react-dom';
import { Router } from 'react-router-dom';
import {Login} from './Login';
import renderer from 'react-test-renderer';
import { shallow, mount, render } from 'enzyme';
import { createMemoryHistory } from 'history';

describe('Login Component render', () => {
    const props = {
        isLoggedIn: false,
        loginUser: () => {},
        alerts: []
    }
    const history = createMemoryHistory();
    it('renders Login correctly', () => {
        const tree = renderer.create(<Router history={history}><Login {...props}></Login></Router>).toJSON();
        expect(tree).toMatchSnapshot();
    })

    it('returns null if user is loggedin', () => {
        props.isLoggedIn = true;
        const tree = renderer.create(<Router history={history}><Login {...props}></Login></Router>).toJSON();
        expect(tree).toBe(null);
    })
})