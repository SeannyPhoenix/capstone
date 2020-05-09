import React, { useState, useEffect } from 'react';
import { Col, Form } from 'react-bootstrap';
import models from '../../models';

export default function TableLocation({ location, updateData, edit }) {
  return (
    <Col md={6}>
      <div>Location:</div>
      <Form.Control
        type="input"
        disabled={!edit}
        value={location ? location.zipcode : 'Zip Code'}
        onChange={(event) => {
          updateData({ location: { zip: event.target.value } });
        }}
      />
    </Col>
  );
}
