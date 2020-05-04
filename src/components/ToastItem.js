import React, { Component } from 'react';
import { Toast } from 'react-bootstrap';

class ToastItem extends Component {
  state = {
    show: false,
  };

  componentDidMount() {
    this.setState({
      show: true,
    });
  }

  hideToast() {
    this.setState({
      show: false,
    });
  }

  render() {
    return (
      <Toast
        show={this.state.show}
        animate="true"
        onClose={this.hideToast.bind(this)}
        autohide
        delay={3000}
      >
        <Toast.Header>{this.props.toast.title}</Toast.Header>
      </Toast>
    );
  }
}

export default ToastItem;
