import React from 'react';
import { Col, Form } from 'react-bootstrap';

export default function TableLocation({ zip, updateData, edit }) {
  return (
    <Col md={6}>
      <div>Location:</div>
      <Form.Control
        type="input"
        disabled={!edit}
        placeholder="Zip Code"
        value={zip}
        onChange={(event) => {
          updateData({ zip: event.target.value });
        }}
      />
    </Col>
  );
}
