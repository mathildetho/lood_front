import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';
import { BrowserRouter as Router } from 'react-router-dom';

import {Provider} from 'react-redux';
import {createStore, applyMiddleware, compose} from 'redux';
import thunk from 'redux-thunk';
import rootReducer from './reducers';

const store = createStore(rootReducer, compose(
  applyMiddleware(thunk),
  window.devToolsExtension ? window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__() : f => f
));

ReactDOM.render(
  <Provider store={store} >
  <React.StrictMode>
    <Router>
      <App />
    </Router>
  </React.StrictMode>
  </Provider>,
  document.getElementById('root')
);

serviceWorker.unregister();
