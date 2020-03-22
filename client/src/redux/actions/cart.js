import getData from '../../helpers/getData';
import postData from '../../helpers/postData';
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

export const fetchUserItemsStart = () => {
  return {
    type: FETCH_CART_ITEMS_START,
  };
};

export const fetchUserItemsSuccess = (userItems, totalPrice) => {
  return {
    type: FETCH_CART_ITEMS_SUCCESS,
    payload: {
      userItems,
      totalPrice,
    },
  };
};

export const fetchUserItemsFailure = error => {
  return {
    type: FETCH_CART_ITEMS_FAILURE,
    payload: error,
  };
};

export const increaseQuantitySuccess = (userItems, totalPrice) => {
  return {
    type: INCREASE_CART_ITEM_QUANTITY_SUCCESS,
    payload: {
      userItems,
      totalPrice,
    },
  };
};

export const decreaseQuantitySuccess = (userItems, totalPrice) => {
  return {
    type: DECREASE_CART_ITEM_QUANTITY_SUCCESS,
    payload: {
      userItems,
      totalPrice,
    },
  };
};

export const increaseQuantityFailure = error => {
  return {
    type: INCREASE_CART_ITEM_QUANTITY_FAILURE,
    payload: error,
  };
};

export const addItemToCartSuccess = (userItems, totalPrice) => {
  return {
    type: ADD_ITEM_TO_CART_SUCCESS,
    payload: {
      userItems,
      totalPrice,
    },
  };
};

export const removeItemFromCartSuccess = (userItems, totalPrice) => {
  return {
    type: REMOVE_ITEM_FROM_CART_SUCCESS,
    payload: {
      userItems,
      totalPrice,
    },
  };
};

export const fetchUserItems = () => {
  return dispatch => {
    if (localStorage.getItem('token')) {
      dispatch(fetchUserItemsStart());
      getData('/user/items')
        .then(data => {
          const { items, totalPrice } = data;
          dispatch(fetchUserItemsSuccess(items, totalPrice));
        })
        .catch(error => {
          dispatch(fetchUserItemsFailure(error.message));
        });
    }
  };
};

export const increaseQuantity = itemId => {
  return dispatch => {
    const increase = async () => {
      try {
        const data = await postData('/items/add', { itemId });
        if (data.userItems) {
          const { userItems, totalPrice } = data;
          dispatch(increaseQuantitySuccess(userItems, totalPrice));
        } else {
          console.error('Cannot increase quantity.');
          dispatch(increaseQuantityFailure('Cannot increase quantity.'));
        }
      } catch (error) {
        dispatch(increaseQuantityFailure(error));
      }
    };

    increase();
  };
};

export const decreaseQuantity = itemId => {
  return dispatch => {
    const decrease = async () => {
      try {
        const data = await postData('/items/remove', {
          itemId,
          removeItem: false,
        });

        const { userItems, totalPrice } = data;

        if (userItems) {
          dispatch(decreaseQuantitySuccess(userItems, totalPrice));
        } else {
          console.error('Cannot decrease quantity.');
        }
      } catch (error) {
        console.error(error);
      }
    };

    decrease();
  };
};

export const addItemToCart = itemId => {
  return dispatch => {
    const addItem = async () => {
      const data = await postData('/items/add', { itemId });
      console.log('data', data);
      const { userItems, totalPrice } = data;
      dispatch(addItemToCartSuccess(userItems, totalPrice));
    };

    addItem();
  };
};

export const removeItemFromCart = itemId => {
  return dispatch => {
    const removeItem = async () => {
      try {
        const data = await postData('/items/remove', {
          itemId,
          removeItem: true,
        });
        const { userItems, totalPrice } = data;
        if (userItems) {
          dispatch(removeItemFromCartSuccess(userItems, totalPrice));
        } else {
          console.error('Cannot remove product.');
        }
      } catch (error) {
        console.error(error);
      }
    };

    removeItem();
  };
};
