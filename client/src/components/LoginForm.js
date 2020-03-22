import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { validateLogin } from '../helpers/validators';
import { addItemToCart } from '../redux/actions/cart';

class LoginForm extends Component {
  constructor(props) {
    super(props);
    const { state } = props.history.location;
    this.state = {
      email: 'demo@test.com',
      password: '11111111',
      passedMessage: state ? state.message : undefined,
      messageType: state
        ? state.type
          ? state.type
          : 'secondary'
        : 'secondary',
      redirectTo: state ? (state.from ? state.from : '/') : '/',
    };

    if (localStorage.getItem('token')) {
      this.props.history.push('/');
    }
  }

  saveUserInput = e => {
    const { name, value } = e.target;

    // Code for removing validation classes when the user is typing.
    if (name) {
      const inputElement = document.querySelector(`[name=${name}]`);
      const msgElement = document.querySelector(`.${name}`);
      if (inputElement && msgElement) {
        inputElement.classList.remove('is-invalid');
        inputElement.classList.remove('is-valid');
        msgElement.innerHTML = '';
      }
    }

    // Store user input in state.
    this.setState({
      [name]: value,
    });
  };

  redirectUser = () => {
    const { redirectTo } = this.state;
    this.props.history.push(redirectTo);
  };

  submitUserInput = e => {
    e.preventDefault();
    const { email, password } = this.state;

    let allValid = true;

    if (!validateLogin(email, password)) {
      allValid = false;
    }

    if (allValid) {
      const jsonResponse = this.postData('/user/signin', {
        email,
        password,
      });

      jsonResponse.then(data => {
        if (data.error) {
          this.showServerResponseMessage(data.error, true);
        }

        if (data.token) {
          localStorage.setItem('token', data.token);
          localStorage.setItem('name', data.name);

          // In case there is a pending item
          const { state } = this.props.location;
          const { dispatch } = this.props;

          const { itemId } = state || {};

          if (itemId) {
            this.setState({
              redirectTo: '/user/cart',
            });

            dispatch(addItemToCart(itemId));
            setTimeout(() => this.redirectUser(), 1000);
          } else {
            this.redirectUser();
          }
        }
      });
    }
  };

  /*---------- Helper methods - start ----------*/
  showServerResponseMessage = (message = '', isError = false) => {
    if (isError) {
      // Fill error message element and show it.
      document.querySelector('#errorResponse').innerHTML = message;
      document
        .querySelector('#errorResponse')
        .classList.replace('d-none', 'd-block');
    } else {
      document
        .querySelector('#errorResponse')
        .classList.replace('d-block', 'd-none');
    }
  };

  postData = async (url, data = {}) => {
    const response = await fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    });
    return await response.json();
  };
  /*---------- Helper methods - end ----------*/

  render() {
    return (
      <div className="container">
        {this.state.passedMessage && (
          <div className={`alert alert-${this.state.messageType}`}>
            {this.state.passedMessage}
          </div>
        )}
        <form noValidate>
          <div className="alert alert-danger d-none" id="errorResponse" />
          <fieldset>
            <legend className="text-center text-info">
              Login to your account
            </legend>

            <div className="form-group">
              <label htmlFor="emailInput" className="form-control-label">
                Email <span className="text-danger">*</span>
              </label>
              <input
                type="email"
                name="email"
                id="emailInput"
                className="form-control"
                placeholder="Email"
                required
                value={this.state.email}
                onChange={this.saveUserInput}
              />
              <small className="text-danger email" />
            </div>

            <div className="form-group">
              <label htmlFor="passwordInput" className="form-control-label">
                Password <span className="text-danger">*</span>
              </label>
              <input
                type="password"
                name="password"
                id="passwordInput"
                className="form-control"
                placeholder="Password"
                required
                value={this.state.password}
                onChange={this.saveUserInput}
              />
              <small className="text-danger password" />
            </div>

            <div className="custom-control custom-checkbox mb-3">
              <input
                type="checkbox"
                name="keep_signed"
                id="keepme"
                className="custom-control-input"
                checked
                disabled
              />
              <label htmlFor="keepme" className="custom-control-label">
                Stay signed in
              </label>
            </div>
            <div className="form-group">
              <input
                type="submit"
                value="Login"
                className="btn btn-primary"
                onClick={this.submitUserInput}
              />
            </div>
            <div className="text-muted">
              Don't have an account yet?
              <Link className="ml-1" to="/register">
                Register here
              </Link>
            </div>
          </fieldset>
        </form>
      </div>
    );
  }
}

export default connect()(LoginForm);
