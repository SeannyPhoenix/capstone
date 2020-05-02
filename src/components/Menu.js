import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import Auth from '../models/Auth';

class Menu extends Component {
  logOut() {
    Auth.logout();
  }

  render() {
    return (
      <nav className="nav flex-column text-light bg-dark serif">
        <Link className="navbar-brand" to="/">
          Delve Directory
        </Link>
        <div className="nav-link" onClick={this.logOut}>
          Log Out
        </div>
        <Link className="nav-link" to="/profile">
          Profile
        </Link>
        <Link className="nav-link" to="/tables">
          Tables
        </Link>
      </nav>
    );
  }
}

export default Menu;
