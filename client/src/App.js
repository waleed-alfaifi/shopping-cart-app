import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import './css/App.css';
import Header from './components/layout/Header';
import ItemsList from './components/ItemsList';
import LoginForm from './components/LoginForm';
import NotFound from './components/layout/NotFound';
import RegisterForm from './components/RegisterForm';
import Cart from './components/Cart';
import Footer from './components/layout/Footer';

function App() {
  return (
    <div>
      <Router>
        <div className="App">
          <Header />
          <Switch>
            <Route exact path="/" component={ItemsList} />
            <Route path="/login" component={LoginForm} />
            <Route path="/register" component={RegisterForm} />
            <Route path="/user/cart" component={Cart} />
            <Route component={NotFound} />
          </Switch>
        </div>
        <Footer />
      </Router>
    </div>
  );
}

export default App;
