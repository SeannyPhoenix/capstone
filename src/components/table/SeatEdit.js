import React, { useState } from 'react';
import { Form, Button } from 'react-bootstrap';

export default function SeatEdit({ seat, handleEdit }) {
  return (
    <Form>
      <Form.Group>
        <Form.Control readOnly value={seat.profile ? seat.profile.screenName : 'unassigned'} />
        <Button
          onClick={() => {
            handleEdit('delete', seat._id);
          }}
        >
          Delete
        </Button>
        <Button
          onClick={() => {
            handleEdit('cancel');
          }}
        >
          Cancel
        </Button>
      </Form.Group>
    </Form>
  );
}
