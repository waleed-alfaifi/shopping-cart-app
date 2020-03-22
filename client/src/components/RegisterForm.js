import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import {
  validateRegisteration,
  validatePasswords,
} from '../helpers/validators';

export default class RegisterForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: '',
      email: '',
      password1: '',
      password2: '',
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

  submitUserInput = e => {
    const { name, email, password1, password2 } = this.state;
    e.preventDefault();

    let allValid = true;

    if (!validateRegisteration(name, email)) {
      allValid = false;
    }

    if (!validatePasswords(password1, password2)) {
      allValid = false;
    }

    if (allValid) {
      const jsonResponse = this.postData('/user/signup', {
        name,
        email,
        password: password1,
      });

      jsonResponse.then(data => {
        if (data.error) {
          this.showServerResponseMessage(data.error, true);
        }

        if (data.message) {
          this.showServerResponseMessage(data.message);
          this.props.history.push('/login', {
            message:
              'You account was created successfully. You can now log in.',
            type: 'success',
          });
          // this.setState({
          //   name: '',
          //   email: '',
          //   password1: '',
          //   password2: '',
          // });
        }
      });
    }
  };

  /*---------- Helper methods - start ----------*/
  showServerResponseMessage = (message = '', isError = false) => {
    if (isError) {
      // Hide success message element.
      document
        .querySelector('#successResponse')
        .classList.replace('d-block', 'd-none');

      // Fill error message element and show it.
      document.querySelector('#errorResponse').innerHTML = message;
      document
        .querySelector('#errorResponse')
        .classList.replace('d-none', 'd-block');
    } else {
      // Hide error message element.
      document
        .querySelector('#errorResponse')
        .classList.replace('d-block', 'd-none');

      // Fill success message element and show it.
      document.querySelector('#successResponse').innerHTML = message;
      document
        .querySelector('#successResponse')
        .classList.replace('d-none', 'd-block');
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
        <div className="alert alert-danger d-none" id="errorResponse" />
        <div className="alert alert-success d-none" id="successResponse" />
        <form
          className="needs-validation"
          id="registerationForm"
          method="POST"
          noValidate
        >
          <fieldset>
            <legend className="text-center text-info mb-3">
              Create a new account
            </legend>

            <div className="form-group">
              <label htmlFor="nameInput" className="form-control-label">
                Name <span className="text-danger">*</span>
              </label>
              <input
                type="text"
                name="name"
                id="nameInput"
                className="form-control"
                placeholder="Enter your name"
                minLength="5"
                required
                value={this.state.name}
                onChange={this.saveUserInput}
              />
              <small className="text-muted">
                Name must be 5 characters long or more.
              </small>
              <div>
                <small className="text-danger name" />
              </div>
            </div>
            <div className="form-group">
              <label htmlFor="emailInput" className="form-control-label">
                Email <span className="text-danger">*</span>
              </label>
              <input
                type="email"
                name="email"
                id="emailInput"
                className="form-control"
                placeholder="Enter your email"
                required
                value={this.state.email}
                onChange={this.saveUserInput}
                onInput={this.validateInputs}
              />
              <small className="text-danger email" />
            </div>
            <div className="form-row">
              <div className="form-group col-sm-6">
                <input
                  type="password"
                  name="password1"
                  className="form-control"
                  placeholder="Enter your password"
                  required
                  value={this.state.email.password2}
                  onChange={this.saveUserInput}
                />
                <small className="text-muted">
                  Password must be 8 characters long or more.
                </small>
                <div>
                  <small className="text-danger password1" />
                </div>
              </div>

              <div className="form-group col-sm-6">
                <input
                  type="password"
                  name="password2"
                  className="form-control"
                  placeholder="Re-enter your password"
                  required
                  value={this.state.password2}
                  onChange={this.saveUserInput}
                />
                <small className="text-danger password2" />
                <small className="text-danger password2" />
                <small className="text-danger" id="matching-password-msg" />
              </div>
            </div>
            <div className="form-group">
              <input
                type="submit"
                value="Register"
                className="btn btn-primary"
                onClick={this.submitUserInput}
              />
            </div>
            <div className="text-muted mb-3">
              Already have an account?
              <Link className="ml-1" to="/login">
                Login here
              </Link>
            </div>
          </fieldset>
        </form>
      </div>
    );
  }
}
