import React, { Component } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

export default class CartItem extends Component {
  constructor(props) {
    super(props);
    this.state = {
      quantity: props.quantity,
    };
  }

  saveQuantityInput = e => {
    const { value } = e.target;

    this.setState({
      quantity: value,
    });
  };

  render() {
    const { id, name, description, price, imageUrl, quantity } = this.props;
    return (
      <div>
        <div className="card shadow-sm rounded-0 mb-3">
          <div className="row">
            <div className="col-4 col-sm-3">
              <img
                className="card-img ml-2 my-2"
                src={imageUrl}
                alt={`${name} item`}
              />
            </div>
            <div className="card-body col-8 col-sm-9">
              <h3 className="card-title">{name}</h3>
              <span className="text-danger">${price}</span>
              <p className="card-text">
                {description && description.substring(0, 70) + '...'}
              </p>
              <div className="d-flex">
                <button
                  className="btn btn-sm btn-outline-dark rounded-0"
                  onClick={this.props.increaseQuantity.bind(this, id)}
                >
                  <FontAwesomeIcon
                    icon="plus"
                    data-toggle="tooltip"
                    title="Increase product quantity"
                  />
                </button>
                <input
                  className="form-control rounded-0 text-center"
                  type="text"
                  name="quantity"
                  value={quantity}
                  readOnly
                  style={{ maxWidth: '60px' }}
                />
                <button
                  className="btn btn-sm btn-outline-dark rounded-0"
                  onClick={this.props.decreaseQuantity.bind(this, id)}
                >
                  <FontAwesomeIcon
                    icon="minus"
                    data-toggle="tooltip"
                    title="Decrease product quantity"
                  />
                </button>
                <button
                  className="btn btn-sm btn-outline-danger rounded-0 ml-1"
                  onClick={this.props.removeItem.bind(this, id)}
                >
                  <FontAwesomeIcon
                    icon="trash"
                    data-toggle="tooltip"
                    title="Delete product"
                  />
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
