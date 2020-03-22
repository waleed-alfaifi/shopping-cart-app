import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { addItemToCart } from '../redux/actions/cart';

class Item extends Component {
  addItemToCart = () => {
    if (!localStorage.getItem('token')) {
      const { id } = this.props;
      this.props.history.push('/login', {
        message: 'Login to add products to your cart.',
        itemId: id,
      });
    } else {
      const { id, dispatch } = this.props;
      dispatch(addItemToCart(id));
    }
  };

  render() {
    const { name, description, price, imageUrl, isInCart } = this.props;

    return (
      <React.Fragment>
        {/* card - start */}
        <div className="card text-center mb-3">
          <img className="card-img-top" src={imageUrl} alt={`${name} item`} />
          <div className="card-body">
            <h3 className="card-title">{name}</h3>
            <p className="card-text">
              {description && description.substring(0, 70) + '...'}
            </p>
            <em>${price}</em>
          </div>

          {/* Card links - start */}
          <ul className="list-group list-group-flush">
            <li className="list-group-item">
              {isInCart ? (
                <FontAwesomeIcon
                  icon="check"
                  className="text-dark"
                  data-toggle="tooltip"
                  title="In cart"
                />
              ) : (
                <button className="btn" onClick={this.addItemToCart}>
                  <FontAwesomeIcon
                    icon="cart-plus"
                    className="text-dark"
                    data-toggle="tooltip"
                    title="Add to cart"
                  />
                </button>
              )}
            </li>
          </ul>
          {/* Card links - end */}
        </div>
        {/* card - END */}
      </React.Fragment>
    );
  }
}

export default connect()(withRouter(Item));
