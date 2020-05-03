import React, { Component } from 'react';
import Menu from './components/Menu';
import AuthForm from './components/auth/AuthForm';
import Session from './models/Session';

class App extends Component {
  componentDidMount() {
    this.verify();
  }

  async verify() {
    const result = await Session.verify();
    if (result.error) {
      this.setState({
        user: null,
      });
    } else {
      this.setState({
        user: result.data,
      });
    }
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
