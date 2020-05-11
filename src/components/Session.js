import React, { Component } from 'react';
import { withRouter } from 'react-router';
import { Redirect } from 'react-router-dom';
import Session from '../models/Session';
import Profile from '../models/Profile';

class Register extends Component {
  state = {
    screenName: '',
    email: '',
    password: '',
  };

  formText = {
    login: {
      title: 'Login',
      screenName: 'hide',
      password2: 'hide',
      submit: 'Log In',
    },
    register: {
      title: 'Register',
      screenName: 'show',
      password2: 'show',
      submit: 'Register',
    },
    edit: {
      title: 'Edit Profile',
      screenName: 'show',
      password2: 'hide',
      submit: 'Submit Changes',
    },
  };

  componentDidMount() {
    this.componentDidUpdate();
  }

  componentDidUpdate() {
    if (this.state.form !== this.props.location.pathname.slice(1)) {
      this.setState({
        form: this.props.location.pathname.slice(1),
      });
    }
  }

  updateField(event) {
    this.setState({
      [event.target.name]: event.target.value,
    });
  }

  submitForm(event) {
    event.preventDefault();
    switch (this.state.form) {
      case 'register':
        this.register();
        break;
      case 'login':
        this.login();
        break;
      case 'edit':
        break;
      default:
    }
  }

  async register() {
    let data = {
      screenName: this.state.screenName,
      email: this.state.email,
      password: this.state.password,
    };
    let response = await Profile.register(data);
    if (response.user) {
      this.login();
    }
  }

  async login() {
    let data = {
      email: this.state.email,
      password: this.state.password,
    };
    await Session.login(data);
    this.props.verify();
  }

  render() {
    if (this.props.user) {
      return <Redirect to="/profile" />;
    }
    if (this.state.form) {
      return (
        <div className="row">
          <div className="col-lg-6 col-md-9 mx-auto mt-4">
            <div className="card">
              <div className="card-header bg-dark text-light">
                {this.formText[this.state.form].title}
              </div>
              <form onSubmit={this.submitForm.bind(this)}>
                <div className="card-body">
                  <div
                    className={`form-group collapse ${this.formText[this.state.form].screenName}`}
                    id="screenName"
                  >
                    <label htmlFor="screenName">Screen Name:</label>
                    <input
                      className="form-control"
                      name="screenName"
                      type="text"
                      value={this.state.screenName}
                      onChange={this.updateField.bind(this)}
                    />
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
                </div>
                <div className="card-footer">
                  <div className="form-group">
                    <button className="btn btn-primary" name="submit" type="submit">
                      {this.formText[this.state.form].submit}
                    </button>
                  </div>
                </div>
              </form>
            </div>
          </div>
        </div>
      );
    } else {
      return <div />;
    }
  }
}

export default withRouter(Register);
