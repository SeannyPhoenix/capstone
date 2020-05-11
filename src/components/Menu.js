import React from 'react';
import { withRouter } from 'react-router';
import { Link, NavLink } from 'react-router-dom';
import Session from '../models/Session';

function Menu({ user, verify, history }) {
  async function logOut() {
    Session.logout();
    await verify();
    history.push('/');
  }

  function profileSection() {
    if (user) {
      return (
        <div>
          <NavLink className="nav-link" activeClassName="active" to="/profile">
            Profile
          </NavLink>
          <div className="nav-link" onClick={logOut}>
            Log Out
          </div>
        </div>
      );
    }
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

  return (
    <nav className="nav flex-column text-light bg-dark serif h-100 pt-4">
      <Link className="nav-link card-header" to="/">
        Delve Directory
      </Link>
      <div className="dropdown-divider" />
      {profileSection()}
      <div className="dropdown-divider" />
      <NavLink className="nav-link mt-auto mb-2" to="/about">
        About Delve Directory
      </NavLink>
    </nav>
  );
}

export default withRouter(Menu);
