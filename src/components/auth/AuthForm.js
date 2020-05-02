import React, { Component } from 'react';
// import Register from './Register';
import Login from './Login';

class AuthForm extends Component {
  state = {
    form: null,
    visible: 'show',
  };

  closeForm() {
    this.setState({
      visible: 'hide',
    });
  }

  componentDidMount() {
    this.componentDidUpdate();
  }

  componentDidUpdate() {
    if (this.props.form !== this.state.form) {
      this.setState({
        form: this.props.form,
      });
    }
  }

  render() {
    return <Login closeForm={this.closeForm.bind(this)} />;
  }
}

export default AuthForm;
