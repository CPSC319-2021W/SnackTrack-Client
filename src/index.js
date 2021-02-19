import { Provider } from 'react-redux';
import React from 'react';
import ReactDOM from 'react-dom';
import Root from './containers/Root';
import { BrowserRouter as Router } from 'react-router-dom';
import Store from './redux/store';

ReactDOM.render(
  <Provider store={Store}>
    <React.StrictMode>
      <Router>
        <Root />
      </Router>
    </React.StrictMode>
  </Provider>,
  document.getElementById('root')
);
