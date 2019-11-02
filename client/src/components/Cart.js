import React, { Component } from 'react';
import CartItem from './CartItem';
import withUserItems from './HOC/withUserItems';

class Cart extends Component {
  constructor(props) {
    super(props);
    if (!localStorage.getItem('token')) {
      this.props.history.push('/login', {
        message: 'You need to login first to access your cart.',
      });
    }
  }

  increaseQuantity = itemId => {
    this.props.increaseQuantity(itemId);
  };

  decreaseQuantity = itemId => {
    this.props.decreaseQuantity(itemId);
  };

  removeItem = itemId => {
    this.props.removeItem(itemId);
  };

  render() {
    const { isLoading, userItems, itemsNum, totalPrice } = this.props;

    if (isLoading) {
      return (
        <div className="container">
          <h3 className="text-center">Loading cart products...</h3>
        </div>
      );
    }

    if (userItems.length === 0) {
      return (
        <div className="container">
          <h3 className="text-center">There are no products in your cart</h3>
        </div>
      );
    }

    const itemsComponents = userItems.map(item => {
      return (
        <CartItem
          id={item.id}
          key={item.id}
          name={item.name}
          description={item.description}
          price={item.price}
          imageUrl={item.imageUrl}
          quantity={item.quantity}
          increaseQuantity={this.increaseQuantity}
          decreaseQuantity={this.decreaseQuantity}
          removeItem={this.removeItem}
        />
      );
    });

    return (
      <div className="container">
        <h3 className="mb-3">Your shopping cart ({itemsNum})</h3>

        <div className="row">
          <div className="col-md-8">{itemsComponents}</div>
          <div className="col-md-4">
            <h2>Total: ${totalPrice}</h2>
            <input
              type="text"
              className="form-control mb-2"
              placeholder="Enter your copoun here"
              onFocus={e => e.target.removeAttribute('readOnly')}
              onBlur={e => e.target.setAttribute('readOnly', true)}
              readOnly
            />
            <button className="btn btn-success btn-block btn-lg mb-3">
              Go to checkout
            </button>
          </div>
        </div>
      </div>
    );
  }
}

export default withUserItems(Cart);
