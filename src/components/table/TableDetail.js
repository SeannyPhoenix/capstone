import React, { useState } from 'react';
import {
  Col, Card, Button, ButtonGroup,
} from 'react-bootstrap';
import models from '../../models';
import TableGame from './TableGame';
import TableLocation from './TableLocation';

export default function TableDetail(props) {
  const [edit, setEdit] = useState(false);

  async function updateTable(data) {
    await models.Table.update(props.table._id, data);
    props.getTable();
  }

  return (
    <Col md={6}>
      <Card className="m-3">
        <Card.Header className="navbar">
          {`Table: ${props.table.name}`}
          <ButtonGroup className="float-right">
            <Button className="btn-primary" onClick={() => setEdit(!edit)}>
              Edit
            </Button>
            <Button className="btn-primary" onClick={props.deleteTable}>
              Delete
            </Button>
          </ButtonGroup>
        </Card.Header>
        <Card.Body>
          <TableGame game={props.table.game} updateTable={updateTable} edit={edit} />
          <TableLocation location={props.table.location} updateTable={updateTable} edit={edit} />
        </Card.Body>
      </Card>
    </Col>
  );
}
