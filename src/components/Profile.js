import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import { Row, Col, Card, Button, Collapse } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus, faTimes } from '@fortawesome/free-solid-svg-icons';
import TableList from './TableList';

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
          <Card className="my-3">
            <Card.Header>
              <strong>Testing</strong>
            </Card.Header>
            <Card.Body />
            <Card.Footer />
          </Card>
        </Col>
        <Col md={6} />
        <Col md={6}>
          <Card className="my-3">
            <Card.Header>{`${this.props.user.screenName}'s`} Tables</Card.Header>
            <Card.Body>
              <TableList user={this.props.user} />
              <Row>
                <Col>
                  <Button
                    variant="primary"
                    className="float-right clear"
                    onClick={this.toggleCreateTable.bind(this)}
                  >
                    <FontAwesomeIcon icon={this.state.createTable ? faTimes : faPlus} />
                  </Button>
                </Col>
              </Row>
              <Row>
                <Col>
                  <Collapse in={this.state.createTable}>
                    <div className="m-0 p-0">Test</div>
                  </Collapse>
                </Col>
              </Row>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    );
  }
}

export default Profile;
