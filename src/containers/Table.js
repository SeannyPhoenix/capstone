import React, { useState, useEffect } from 'react';
import { withRouter } from 'react-router';
import { Redirect } from 'react-router-dom';
import { Row, Col, Card } from 'react-bootstrap';
import models from '../models';

function Table(props) {
  const [table, setTable] = useState(null);

  useEffect(() => {
    if (!table) {
      getTable(props.match.params.id);
    }
  }, [table, props.match.params.id]);

  async function getTable(id) {
    const response = await models.Table.show(id);
    setTable(response);
  }

  if (!table) {
    return <div />;
  }

  if (table.error) {
    return <Redirect to="/" />;
  }

  return (
    <Row className="my-3">
      <Col>
        <Card>
          <Card.Header>
            {table.name}
          </Card.Header>
          <Card.Body>
            <Row>
              <Col md={6}>
                <p>Game</p>
              </Col>
              <Col md={6}>
                <p>Details</p>
              </Col>
              <Col md={6}>
                <p>Seats</p>
              </Col>
              <Col md={6}>
                <p>Messages</p>
              </Col>
            </Row>
          </Card.Body>
        </Card>
      </Col>
    </Row>
  );
}

export default withRouter(Table);
