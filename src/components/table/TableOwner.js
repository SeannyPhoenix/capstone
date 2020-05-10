import React from 'react';
import { Col } from 'react-bootstrap';

export default function TableLocation({ owner }) {
  return (
    <Col md={6}>
      <div>Owner:</div>
      <div>
        {owner.screenName}
      </div>
    </Col>
  );
}
