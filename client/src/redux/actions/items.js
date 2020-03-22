import {
  FETCH_ITEMS_SUCCESS,
  FETCH_ITEMS_START,
  FETCH_ITEMS_FAILURE,
} from '../actionTypes';

export const fetchItemsStart = () => {
  return {
    type: FETCH_ITEMS_START,
  };
};

export const fetchItemsSuccess = items => {
  return {
    type: FETCH_ITEMS_SUCCESS,
    payload: items,
  };
};

export const fetchItemsFailure = error => {
  return {
    type: FETCH_ITEMS_FAILURE,
    payload: error,
  };
};

export const fetchItems = () => {
  return dispatch => {
    dispatch(fetchItemsStart());
    fetch('/items')
      .then(response => response.json())
      .then(data => {
        const { items } = data;
        dispatch(fetchItemsSuccess(items));
      })
      .catch(error => {
        dispatch(fetchItemsFailure(error.message));
      });
  };
};
