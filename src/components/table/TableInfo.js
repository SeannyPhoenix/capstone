import React, { useState } from 'react';
import { Col, Card, Form } from 'react-bootstrap';
import models from '../../models';

function TableGame({ table, getTable }) {
  const [origin, setOrigin] = useState(table.info || '');
  const [info, setInfo] = useState(origin);
  const [edit, setEdit] = useState(false);
  const [dirty, setDirty] = useState(info === origin);

  if (dirty !== (info !== origin)) {
    setDirty(info !== origin);
  }

  async function action(event) {
    event.preventDefault();
    if (edit) {
      setEdit(false);
      if (dirty) {
        await models.Table.update(table._id, { info });
        setDirty(false);
        setOrigin(info);
      }
    } else {
      setEdit(true);
    }
  }

  return (
    <Col md={6}>
      <Card className="m-3">
        <Card.Header>Info</Card.Header>
        <Card.Body>
          <Form>
            <Form.Control
              as="textarea"
              value={info}
              readOnly={!edit}
              plaintext={!edit}
              onChange={(event) => setInfo(event.target.value)}
              className={`${dirty ? 'border-warning' : 'border-none'} ${
                info ? 'text-coffee' : 'text-muted'
              } info-entry`}
            />
            <Form.Control
              as="button"
              className={dirty ? 'btn-warning' : 'btn-primary'}
              onClick={action}
            >
              {edit ? 'Save' : 'Edit'}
            </Form.Control>
          </Form>
        </Card.Body>
      </Card>
    </Col>
  );
}

export default TableGame;
