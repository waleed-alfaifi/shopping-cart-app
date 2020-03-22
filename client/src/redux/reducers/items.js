import {
  FETCH_ITEMS_START,
  FETCH_ITEMS_SUCCESS,
  FETCH_ITEMS_FAILURE,
} from '../actionTypes';

const initial_state = {
  items: [],
  isLoadingItems: false,
  error: '',
};

export default (state = initial_state, action) => {
  switch (action.type) {
    case FETCH_ITEMS_START:
      return {
        ...state,
        isLoadingItems: true,
      };
    case FETCH_ITEMS_SUCCESS:
      return {
        ...state,
        isLoadingItems: false,
        items: action.payload,
      };
    case FETCH_ITEMS_FAILURE:
      return {
        ...state,
        isLoadingItems: false,
        error: action.payload,
      };
    default:
      return state;
  }
};
