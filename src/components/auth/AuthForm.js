import React, { Component } from 'react';
// import Register from './Register';
import Login from './Login';

class AuthForm extends Component {
  state = {
    form: 'none',
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
    let visible = 'hide';
    if (this.props.form !== 'none') {
      visible = 'show';
    }
    if (this.props.form !== this.state.form) {
      this.setState({
        form: this.props.form,
        visible,
      });
    }
  }

  render() {
    return <Login closeForm={this.closeForm.bind(this)} />;
  }
}

export default AuthForm;
