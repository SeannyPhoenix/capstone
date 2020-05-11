import React, { Component } from 'react';
import { Container, Row } from 'react-bootstrap';
import Session from './models/Session';
import GeoData from './models/GeoData';
import Menu from './components/Menu';
import Routes from './routes/Routes';
import Toast from './containers/Toast';
import models from './models';

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
    this.getClientIpData();
  }

  async getClientIpData() {
    const result = await GeoData.getClientIpData();
    if (result.error) {
      this.setState({
        clientIpData: null,
        clientLocation: null,
      });
    } else {
      let clientIpData = result.data;
      clientIpData.location = [clientIpData.latitude, clientIpData.longitude];
      this.setState({
        clientIpData,
      });
    }
  }

  async logout() {
    await models.Session.logout();
    this.setState({
      user: null,
    });
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
          <div className="col-md-2 bg-dark">
            <Menu user={this.state.user} verify={this.verify.bind(this)} />
          </div>
          <div className="col-md-10">
            <Routes
              addToast={this.addToast.bind(this)}
              user={this.state.user}
              verify={this.verify.bind(this)}
              clientIpData={this.state.clientIpData}
            />
            <Toast toasts={this.state.toasts} />
          </div>
        </Row>
      </Container>
    );
  }
}

export default App;
