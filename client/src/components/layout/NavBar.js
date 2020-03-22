import React from 'react';
import { useSelector } from 'react-redux';
import { Link, withRouter } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

const NavBar = () => {
  const { userItems } = useSelector(({ cart }) => cart);

  const numberOfItems = () =>
    userItems && (
      <span className="badge badge-success badge-pill cart-items-badge">
        {userItems.length}
      </span>
    );

  return (
    <nav className="navbar bg-dark navbar-dark flex-row-reverse mb-4">
      {/* Navbar Brand */}
      <Link to="/user/cart" className="navbar-brand">
        {numberOfItems()}
        <FontAwesomeIcon icon="shopping-cart" />
      </Link>

      {/* Website logo */}
      <h3 className="mt-1">
        <Link to="/" className="text-white">
          <FontAwesomeIcon icon="store" />
        </Link>
      </h3>

      {/* Navbar button toggler */}
      <button
        className="navbar-toggler"
        data-toggle="collapse"
        data-target="#navbarToggler"
        aria-controls="navbarToggler"
        aria-expanded="false"
        aria-label="Navigation Bar Toggler"
      >
        <span className="navbar-toggler-icon" />
      </button>

      <div className="collapse navbar-collapse" id="navbarToggler">
        {/* Navbar Links */}
        <ul className="navbar-nav">
          {localStorage.getItem('name') && (
            <span className="navbar-text text-muted">
              {localStorage.getItem('name')}
            </span>
          )}
          {/* <li className="navbar-text">Muhammad Alfaifi</li> */}
          <li className="nav-item">
            <Link className="nav-link" to="/">
              Home
            </Link>
          </li>
          {!localStorage.getItem('token') && (
            <li className="nav-item">
              <Link className="nav-link" to="/login">
                Log in
              </Link>
            </li>
          )}
          {!localStorage.getItem('token') && (
            <li className="nav-item">
              <Link className="nav-link" to="/register">
                Register
              </Link>
            </li>
          )}
          {localStorage.getItem('token') && (
            <li className="nav-item">
              <a
                className="nav-link"
                href="/"
                onClick={() => {
                  localStorage.removeItem('token');
                  localStorage.removeItem('name');
                }}
              >
                Logout
              </a>
            </li>
          )}
        </ul>
      </div>
    </nav>
  );
};

// export default NavBar;
export default withRouter(NavBar);
