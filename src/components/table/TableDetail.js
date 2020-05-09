import React, { useState, useEffect } from 'react';
import { withRouter } from 'react-router';
import { Row, Col, Card } from 'react-bootstrap';
import models from '../../models';
import TableOwner from './TableOwner';
import TableGame from './TableGame';
import TableLocation from './TableLocation';
import TablePublished from './TablePublished';
import TableActions from './TableActions';

function TableDetail({ table, getTable }) {
  const [edit, setEdit] = useState(false);
  const [data, setData] = useState(table);

  function updateData(update) {
    const newData = { ...data };
    Object.keys(update).forEach((key) => {
      newData[key] = update[key];
    });
    setData(newData);
  }

  function doAction(action) {
    switch (action) {
      case 'edit':
        setEdit(true);
        break;
      case 'cancel':
        setEdit(false);
        setData(table);
        break;
      case 'save':
        console.log('saving: ', data);
        updateTable(table._id, data);
        setEdit(false);
        getTable();
        break;
      case 'delete':
        deleteTable(table._id);
        break;
      default:
    }
  }

  async function updateTable(event) {
    await models.Table.update(table._id, data);
    getTable();
  }

  async function deleteTable() {
    await models.Table.delete(table._id);
  }

  return (
    <Col md={6}>
      <Card className="m-3">
        <Card.Header className="navbar">
          {`Table: ${table.name}`}
        </Card.Header>
        <Card.Body>
          <Row>
            <TableOwner owner={table.owner} />
            <TableGame game={data.game} updateData={updateData} edit={edit} />
            <TableLocation location={data.location} updateData={updateData} edit={edit} />
            <TablePublished published={data.published} updateData={updateData} edit={edit} />
            <TableActions table={table} edit={edit} setEdit={setEdit} doAction={doAction} />
          </Row>
        </Card.Body>
      </Card>
    </Col>
  );
}

export default withRouter(TableDetail);
