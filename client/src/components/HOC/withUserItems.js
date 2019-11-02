import React, { Component } from 'react';

export default function withUserItems(WrappedComponent) {
  return class extends Component {
    _isMounted = false;
    constructor(props) {
      super(props);
      this.state = {
        userItems: [],
        totalPrice: 0,
        isLoading: false,
      };
    }

    componentDidMount() {
      this._isMounted = true;
      this.retrieveUserItems();
    }

    componentWillUnmount() {
      this._isMounted = false;
    }

    retrieveUserItems = () => {
      if (localStorage.getItem('token')) {
        this.setState({ isLoading: true });
        this.getData('/user/items')
          .then(data => {
            if (this._isMounted) {
              this.setState({
                userItems: data.items,
                totalPrice: data.totalPrice,
                isLoading: false,
              });
            }
          })
          .catch(err => console.error(err));
      }
    };

    increaseQuantity = async itemId => {
      try {
        const data = await this.postData('/items/add', { itemId });
        if (data.userItems) {
          if (this._isMounted) {
            this.setState({
              userItems: data.userItems,
              totalPrice: data.totalPrice,
            });
          }
        } else {
          console.error('Cannot increase quantity.');
        }
      } catch (error) {
        console.error(error);
      }
    };

    decreaseQuantity = async itemId => {
      try {
        const data = await this.postData('/items/remove', {
          itemId,
          removeItem: false,
        });

        if (data.userItems) {
          if (this._isMounted) {
            this.setState({
              userItems: data.userItems,
              totalPrice: data.totalPrice,
            });
          }
        } else {
          console.error('Cannot decrease quantity.');
        }
      } catch (error) {
        console.error(error);
      }
    };

    removeItem = async itemId => {
      try {
        const data = await this.postData('/items/remove', {
          itemId,
          removeItem: true,
        });

        if (data.userItems) {
          if (this._isMounted) {
            this.setState({
              userItems: data.userItems,
              totalPrice: data.totalPrice,
            });
          }
        } else {
          console.error('Cannot remove product.');
        }
      } catch (error) {
        console.error(error);
      }
    };

    /*--- Helper methods START ---*/
    getData = async url => {
      const response = await fetch(url, {
        headers: { Authorization: localStorage.getItem('token') },
      });
      return await response.json();
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
      return (
        <WrappedComponent
          isLoading={this.state.isLoading}
          userItems={this.state.userItems}
          itemsNum={this.state.userItems.length}
          totalPrice={this.state.totalPrice}
          increaseQuantity={this.increaseQuantity}
          decreaseQuantity={this.decreaseQuantity}
          removeItem={this.removeItem}
          {...this.props}
        />
      );
    }
  };
}
