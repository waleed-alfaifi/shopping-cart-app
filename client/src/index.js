import React from 'react';
import { Provider } from 'react-redux';
import ReactDOM from 'react-dom';
import App from './App';
import { library } from '@fortawesome/fontawesome-svg-core';
import { fab } from '@fortawesome/free-brands-svg-icons';
import {
  faShoppingCart,
  faStore,
  faPlus,
  faMinus,
  faCartPlus,
  faCheck,
  faTrash,
  faSpinner,
} from '@fortawesome/free-solid-svg-icons';
import store from './redux/store';

library.add(
  fab,
  faShoppingCart,
  faStore,
  faPlus,
  faMinus,
  faCartPlus,
  faCheck,
  faTrash,
  faSpinner
);

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('root')
);
