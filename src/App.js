import React, { Component } from 'react';
import Menu from './components/Menu';
import AuthForm from './components/auth/AuthForm';
import Auth from './models/Auth';

class App extends Component {
  state = {};

  componentDidMount() {
    this.verify();
  }

  async verify() {
    let result = await Auth.verify();
    this.setState({
      user: result.data,
    });
  }

  render() {
    return (
      <div className="container-fluid">
        <div className="row">
          <div className="col-2">
            <Menu />
          </div>
          <div className="col-10">
            <AuthForm form="login" />
          </div>
        </div>
      </div>
    );
  }
}

export default App;
