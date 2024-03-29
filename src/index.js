import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from '../src/containers/App';
import {Provider} from 'react-redux';
import {createStore, applyMiddleware, combineReducers} from 'redux';
import thunkMiddleware from 'redux-thunk'
import {searchRobots, requestRobots} from './reducers'
import {createLogger} from 'redux-logger';
import * as serviceWorker from './serviceWorker';
import 'tachyons';


// create a logger middleware:
const logger = createLogger();

const rootReducer = combineReducers({searchRobots,requestRobots})
// create the main store
const store = createStore(rootReducer, applyMiddleware(thunkMiddleware, logger))



ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById("root")
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
