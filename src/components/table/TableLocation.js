import React, { useState, useEffect } from 'react';
import { Row, Col, Dropdown } from 'react-bootstrap';
import models from '../../models';

export default function TableLocation({ location, updateTable, edit }) {
  return (
    <Row>
      <Col>
        <div>Location:</div>
      </Col>
      <Col>
        <div className="float-right pr-4">
          {location ? location.zip : 'Zip Code'}
        </div>
      </Col>
    </Row>
  );
}
