import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

class Item extends Component {
  _isMounted = false;

  state = {
    isInCart: false,
  };

  componentDidMount() {
    this._isMounted = true;

    this.userHasItem(this.props.id);
  }

  componentWillUnmount() {
    this._isMounted = false;
  }

  userHasItem = itemId => {
    if (localStorage.getItem('token')) {
      fetch(`/user/items/${itemId}`, {
        headers: {
          Authorization: localStorage.getItem('token'),
        },
      })
        .then(response => response.json())
        .then(data => {
          if (data.item) {
            if (this._isMounted) {
              this.setState({
                isInCart: true,
              });
            }
          }
        });
    }
  };

  addItemToCart = async () => {
    if (!localStorage.getItem('token')) {
      this.props.history.push('/login', {
        message: 'Login to add products to your cart.',
      });
    } else {
      const { id } = this.props;
      const data = await this.postData('/items/add', { itemId: id });

      // If the item is added successfully.
      if (data.userItems) {
        this.showAlertMessage(
          `Product ${this.props.name} was added to the cart. `
        );
        this.setState({
          isInCart: true,
        });
      }
    }
  };

  /*--- Helper methods START ---*/
  showAlertMessage = message => {
    const alertDiv = document.getElementById('addConfirmAlert');
    const messageNode = document.createTextNode(message);

    if (alertDiv) {
      alertDiv.innerHTML = '';
      alertDiv.appendChild(messageNode);

      alertDiv.classList.replace('d-none', 'd-block');
    }
  };

  postData = async (url, data = {}) => {
    const response = await fetch(url, {
      method: 'POST',
      headers: {
        Authorization: localStorage.getItem('token'),
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    });
    return await response.json();
  };
  /*--- Helper methods END ---*/

  render() {
    const { name, description, price, imageUrl } = this.props;
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
              {this.state.isInCart ? (
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

export default withRouter(Item);
