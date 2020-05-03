import React, { Component } from 'react';
import { Link, NavLink } from 'react-router-dom';
import Session from '../models/Session';

class Menu extends Component {
  state = {
    user: this.props.user,
  };

  logOut() {
    Session.logout();
  }

  componentDidMount() {
    this.componentDidUpdate();
  }

  componentDidUpdate() {
    if (this.state.user !== this.props.user) {
      this.setState({
        user: this.props.user,
      });
    }
  }

  buildProfileSection() {
    if (this.state.user) {
      return (
        <div>
          <NavLink className="nav-link" activeClassName="active" to="/profile">
            Profile
          </NavLink>
          <div className="nav-link" onClick={this.logOut.bind(this)}>
            Log Out
          </div>
        </div>
      );
    } else {
      return (
        <div>
          <NavLink className="nav-link" activeClassName="active" to="/login">
            Log In
          </NavLink>
          <NavLink className="nav-link" activeClassName="active" to="/register">
            Register
          </NavLink>
        </div>
      );
    }
  }

  render() {
    let profileSection = this.buildProfileSection();
    return (
      <nav className="nav flex-column text-light bg-dark serif h-100 pt-4">
        <Link className="nav-link card-header" to="/">
          Delve Directory
        </Link>
        <div className="dropdown-divider" />
        <NavLink className="nav-link mb-auto" to="/tables">
          Tables
        </NavLink>
        <div className="dropdown-divider" />
        {profileSection}
        <div className="dropdown-divider" />
        <NavLink className="nav-link" to="/about">
          About Delve Directory
        </NavLink>
      </nav>
    );
  }
}

export default Menu;
