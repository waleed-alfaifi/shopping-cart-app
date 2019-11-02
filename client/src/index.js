import React from 'react';
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
} from '@fortawesome/free-solid-svg-icons';

library.add(
  fab,
  faShoppingCart,
  faStore,
  faPlus,
  faMinus,
  faCartPlus,
  faCheck,
  faTrash
);

ReactDOM.render(<App />, document.getElementById('root'));
