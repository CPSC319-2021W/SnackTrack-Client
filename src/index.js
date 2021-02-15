import { Provider } from 'react-redux';
import React from 'react';
import ReactDOM from 'react-dom';
import Root from './containers/Root';
import Store from './redux/store';

ReactDOM.render(
  <Provider store={Store}>
    <React.StrictMode>
      <Root />
    </React.StrictMode>
  </Provider>,
  document.getElementById('root')
);
