import ReactDOM from 'react-dom';
import React from 'react';
import { Provider } from 'react-redux';
import App from './containers/App';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.min.js';
import 'jquery';
import 'popper.js/dist/popper.min.js';

import configureStore from './redux/configStore';

const store = configureStore();

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('root'),
);
