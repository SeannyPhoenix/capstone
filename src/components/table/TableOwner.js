import React from 'react';
import { Row, Col } from 'react-bootstrap';
import models from '../../models';

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
