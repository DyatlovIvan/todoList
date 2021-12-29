import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import {App} from './App/App';
import * as serviceWorker from './serviceWorker';
import {Provider} from "react-redux";
import {store} from "./App/store";
import {Login} from "./features/Login/Login";

ReactDOM.render(
    <Provider store={store}>
        <Login/>
        <App/>
    </Provider>, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
