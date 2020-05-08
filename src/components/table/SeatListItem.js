import React, { useState, useEffect } from 'react';
import { Row, Col, Button } from 'react-bootstrap';

export default function SeatIcon({ seat, action, setAction }) {
  function highlight() {
    if (action.action && action.id === seat._id) {
      return 'border-primary shadow';
    }
    return 'border-dark';
  }

  return (
    <Row
      className={`my-2 ${highlight()}`}
      onMouseEnter={() => {
        if (action.action !== 'edit') {
          setAction({ action: 'hover', id: seat._id });
        }
      }}
      onMouseOut={() => {
        if (action.action !== 'edit') {
          setAction({ action: '', id: null });
        }
      }}
    >
      <Col>
        <div>
          {seat.profile ? seat.profile.screenName : 'unassigned'}
        </div>
      </Col>
      <Col>
        <Button
          onClick={() => {
            setAction({ action: 'edit', id: seat._id });
          }}
        >
          Edit
        </Button>
      </Col>
    </Row>
  );
}
