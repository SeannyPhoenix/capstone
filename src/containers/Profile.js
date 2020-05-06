import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import { Row, Col, Card } from 'react-bootstrap';
import ProfileMap from '../components/ProfileMap';
import TableList from '../components/TableList';

class Profile extends Component {
  state = {
    tables: [],
    createTable: false,
  };

  toggleCreateTable() {
    this.setState({
      createTable: !this.state.createTable,
    });
  }

  componentDidMount() {
    this.componentDidUpdate();
  }

  componentDidUpdate() {
    if (this.state.user !== this.props.user) {
      let tables = [];
      //get tables
      this.setState({
        user: this.props.user,
        tables,
      });
    }
  }

  render() {
    if (!this.props.user) {
      return <Redirect to="/login" />;
    }
    return (
      <Row>
        <Col md={6}>
          <Card className="m-3">
            <Card.Header>{`Welcome, ${this.props.user.screenName}.`}</Card.Header>
            <Card.Body />
          </Card>
        </Col>
        <ProfileMap user={this.props.user} clientIpData={this.props.clientIpData} />
        <TableList user={this.props.user} />
      </Row>
    );
  }
}

export default Profile;
