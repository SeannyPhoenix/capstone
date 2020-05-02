import React, { Component } from 'react';
import Auth from '../../models/Auth';

class Register extends Component {
  state = {
    screenName: '',
    email: '',
    password: '',
  };

  updateField(event) {
    this.setState({
      [event.target.name]: event.target.value,
    });
  }

  async register(event) {
    event.preventDefault();
    await Auth.register(this.state);
    if (true) {
      this.props.closeForm();
    }
  }

  render() {
    return (
      <div className="card">
        <div className="card-header bg-dark text-light">Login</div>
        <div className="card-body">
          <form onSubmit={this.register.bind(this)}>
            <div className="form-group">
              <label htmlFor="screenName">Screen Name:</label>
              <input
                className="form-control"
                name="screenName"
                type="text"
                value={this.state.screenName}
                onChange={this.updateField.bind(this)}
              />
              <small>no spaces</small>
            </div>
            <div className="form-group">
              <label htmlFor="email">Email:</label>
              <input
                className="form-control"
                name="email"
                type="email"
                value={this.state.email}
                onChange={this.updateField.bind(this)}
              />
              <small>.</small>
            </div>
            <div className="form-group">
              <label htmlFor="password">Password:</label>
              <input
                className="form-control"
                name="password"
                type="password"
                value={this.state.password}
                onChange={this.updateField.bind(this)}
              />
              <small>stuff</small>
            </div>
            <div className="form-group">
              <button className="btn btn-primary" name="submit" type="submit">
                Register
              </button>
            </div>
          </form>
        </div>
        <div className="card-footer" />
      </div>
    );
  }
}

export default Register;
