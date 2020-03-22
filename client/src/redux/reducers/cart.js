import {
  FETCH_CART_ITEMS_START,
  FETCH_CART_ITEMS_SUCCESS,
  FETCH_CART_ITEMS_FAILURE,
  INCREASE_CART_ITEM_QUANTITY_SUCCESS,
  INCREASE_CART_ITEM_QUANTITY_FAILURE,
  ADD_ITEM_TO_CART_SUCCESS,
  REMOVE_ITEM_FROM_CART_SUCCESS,
  DECREASE_CART_ITEM_QUANTITY_SUCCESS,
} from '../actionTypes';

const initial_state = {
  userItems: [],
  totalPrice: 0,
  isLoadingUserItems: false,
  error: '',
};

export default (state = initial_state, action) => {
  const { userItems, totalPrice } = action.payload || {};

  switch (action.type) {
    case FETCH_CART_ITEMS_START:
      return {
        ...state,
        isLoadingUserItems: true,
      };
    case FETCH_CART_ITEMS_SUCCESS:
      return {
        ...state,
        isLoadingUserItems: false,
        userItems,
        totalPrice,
      };
    case FETCH_CART_ITEMS_FAILURE:
      return {
        ...state,
        isLoadingUserItems: false,
        error: action.payload,
      };
    case INCREASE_CART_ITEM_QUANTITY_SUCCESS:
      return {
        ...state,
        userItems,
        totalPrice,
      };
    case INCREASE_CART_ITEM_QUANTITY_FAILURE:
      return {
        ...state,
        error: action.payload,
      };
    case DECREASE_CART_ITEM_QUANTITY_SUCCESS:
      return {
        ...state,
        userItems,
        totalPrice,
      };
    case ADD_ITEM_TO_CART_SUCCESS:
      return {
        ...state,
        userItems,
        totalPrice,
      };
    case REMOVE_ITEM_FROM_CART_SUCCESS:
      return {
        ...state,
        userItems,
        totalPrice,
      };

    default:
      return state;
  }
};
