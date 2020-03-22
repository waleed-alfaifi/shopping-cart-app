import React, { Component } from 'react';
import { connect } from 'react-redux';
import Item from './Item';
import { fetchUserItems } from '../redux/actions/cart';
import { fetchItems } from '../redux/actions/items';

class ItemsList extends Component {
  componentDidMount() {
    const { dispatch, items } = this.props;
    dispatch(fetchUserItems());
    if (items.length === 0) {
      dispatch(fetchItems());
    }
  }

  render() {
    const { loadingItems, items, userItems } = this.props;

    if (loadingItems) {
      return <h3 className="text-center">Loading proudcts...</h3>;
    }

    if (items.length > 0) {
      const itemComponents = items.map(item => {
        const { name, description, price, imageUrl } = item;

        const isInCart = userItems.find(userItem => userItem.id === item._id);

        return (
          <Item
            key={item._id}
            id={item._id}
            name={name}
            description={description}
            price={price}
            imageUrl={imageUrl}
            isInCart={isInCart ? true : false}
          />
        );
      });

      return (
        <React.Fragment>
          <div
            className="container-fluid text-center alert alert-success d-none"
            id="addConfirmAlert"
          />
          <h1 className="text-center my-3 text-danger">Our Products</h1>
          <div className="container-fluid  grid-container">
            {itemComponents}
          </div>
        </React.Fragment>
      );
    }

    return <h3 className="text-center">There are no products currently</h3>;
  }
}

const mapStateToProps = state => {
  const { items, isLoadingItems, error } = state.items;
  const { userItems } = state.cart;

  return {
    items,
    loadingItems: isLoadingItems,
    error,
    userItems,
  };
};

export default connect(mapStateToProps)(ItemsList);
