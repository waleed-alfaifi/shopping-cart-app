import React, { Component } from 'react';
import Item from './Item';

class ItemsList extends Component {
  _isMounted = false;

  state = {
    items: [],
    loadingItems: false,
  };

  componentDidMount() {
    this._isMounted = true;

    this.setState({ loadingItems: true });
    fetch('/items')
      .then(response => response.json())
      .then(data => {
        if (this._isMounted) {
          this.setState({
            items: data.items,
            loadingItems: false,
          });
        }
      })
      .catch(() => {
        if (this._isMounted) {
          this.setState({
            loadingItems: false,
          });
        }
      });
  }

  componentWillUnmount() {
    this._isMounted = false;
  }

  render() {
    if (this.state.loadingItems) {
      return <h3 className="text-center">Loading proudcts...</h3>;
    }

    if (this.state.items.length > 0) {
      const itemComponents = this.state.items.map(item => {
        const { name, description, price, imageUrl } = item;
        return (
          <Item
            key={item._id}
            id={item._id}
            name={name}
            description={description}
            price={price}
            imageUrl={imageUrl}
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

export default ItemsList;
