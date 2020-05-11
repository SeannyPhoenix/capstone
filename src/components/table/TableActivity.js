import React from 'react';
import {
  Col, Card, Accordion, Button,
} from 'react-bootstrap';

export default function TableActivity({ table, getTable, owner }) {
  const requests = table.requests.map((request, key) => (
    <div key={key}>
      {request.screenName}
    </div>
  ));

  return (
    <Col md={6}>
      <Card className="m-3">
        <Card.Header>Activity</Card.Header>
        <Card.Body>
          <Accordion defaultActiveKey="messages">
            <Accordion.Toggle
              as={Button}
              eventKey="requests"
              className={`${owner ? 'visible' : 'invisible'} btn-block btn-primary`}
            >
              Seat Requests
            </Accordion.Toggle>
            <Accordion.Collapse eventKey="requests" className={owner ? 'visible' : 'invisible'}>
              <div className="my-2">
                {requests}
              </div>
            </Accordion.Collapse>
            <Accordion.Toggle
              as={Button}
              eventKey="messages"
              className="btn-block btn-primary"
            />
            <Accordion.Collapse eventKey="messages">
              <div className="my-2">Messages</div>
            </Accordion.Collapse>
          </Accordion>
        </Card.Body>
      </Card>
    </Col>
  );
}
