import React, { Component } from 'react';
import { Container, Row } from 'react-bootstrap';
import Session from './models/Session';
import Menu from './components/Menu';
import Routes from './routes/Routes';
import ToastContainer from './containers/ToastContainer';

class App extends Component {
  state = {
    toasts: [],
  };

  addToast(data) {
    let toasts = this.state.toasts;
    toasts.push(data);
    this.setState({
      toasts,
    });
  }

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
      <Container fluid>
        <Row className="vh-100">
          <div className="col-2 bg-dark d-none d-lg-block">
            <Menu user={this.state.user} verify={this.verify.bind(this)} />
          </div>
          <div className="col-10">
            <Routes
              addToast={this.addToast.bind(this)}
              user={this.state.user}
              verify={this.verify.bind(this)}
            />
            <ToastContainer toasts={this.state.toasts} />
          </div>
        </Row>
      </Container>
    );
  }
}

export default App;
