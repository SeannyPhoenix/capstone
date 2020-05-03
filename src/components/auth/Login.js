import React, { Component } from 'react';
import Session from '../../models/Session';

class Login extends Component {
  state = {
    email: '',
    password: '',
  };

  updateField(event) {
    this.setState({
      [event.target.name]: event.target.value,
    });
  }

  async login(event) {
    event.preventDefault();
    console.log(this.state);
    let response = await Session.login(this.state);
    console.log(response);
    // if (true) {
    //   this.props.closeForm();
    // }
  }

  render() {
    return (
      <div className="card">
        <div className="card-header bg-dark text-light">Login</div>
        <div className="card-body">
          <form onSubmit={this.login.bind(this)}>
            <div className="form-group">
              <label htmlFor="email">Email:</label>
              <input
                className="form-control"
                name="email"
                type="email"
                value={this.state.email}
                onChange={this.updateField.bind(this)}
              />
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
            </div>
            <div className="form-group">
              <button className="btn btn-primary" name="submit" type="Log In">
                Submit
              </button>
            </div>
          </form>
        </div>
        <div className="card-footer" />
      </div>
    );
  }
}

export default Login;
