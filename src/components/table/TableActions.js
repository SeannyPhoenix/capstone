import React from 'react';
import {
  Row, Col, InputGroup, ButtonGroup, Button,
} from 'react-bootstrap';
import models from '../../models';

export default function TableActions({
  table, edit, setEdit, doAction,
}) {
  return (
    <Row>
      <Col>
        <ButtonGroup className="mt-3">
          <Button
            className="ml-auto"
            onClick={() => {
              setEdit(!edit);
            }}
          >
            {edit ? 'Cancel' : 'Edit'}
          </Button>
          <Button
            onClick={() => {
              if (edit) {
                doAction('save');
              } else {
                doAction('delete');
              }
            }}
          >
            {edit ? 'Save' : 'Delete'}
          </Button>
        </ButtonGroup>
      </Col>
    </Row>
  );
}
