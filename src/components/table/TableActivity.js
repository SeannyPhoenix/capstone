import React from 'react';
import { Col, Card } from 'react-bootstrap';
import models from '../../models';

export default function TableActivity({ table, getTable, owner }) {
  const requests = owner ? table.requests.map((request) => (
    <div>
      {request.screenName}
    </div>
  )) : null;

  return (
    <Col md={6}>
      <Card className="m-3">
        <Card.Header>Activity</Card.Header>
        <Card.Body>
          {requests}
        </Card.Body>
      </Card>
    </Col>
  );
}
