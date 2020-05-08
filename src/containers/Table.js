import React, { useState, useEffect } from 'react';
import { withRouter } from 'react-router';
import { Redirect } from 'react-router-dom';
import { Row, Col, Card } from 'react-bootstrap';
import models from '../models';
import TableGame from '../components/table/TableGame';
import TableSeats from '../components/table/TableSeats';

function Table(props) {
  const [table, setTable] = useState(null);
  const [update, setUpdate] = useState(false);

  useEffect(() => {
    async function getTable() {
      const response = await models.Table.show(props.match.params.id);
      setTable(response);
    }
    getTable();
    setUpdate(false);
  }, [update, props.match.params.id]);

  async function deleteTable() {
    await models.Table.delete(table._id);
    props.history.goBack();
  }

  if (!table) {
    return <div />;
  }

  if (table.error || table.deleted) {
    return <Redirect to="/" />;
  }

  function forceUpdate() {
    setUpdate(true);
  }

  return (
    <div>
      <Row className="my-3">
        <TableGame table={table} deleteTable={deleteTable} getTable={forceUpdate} />
        <Col md={6}>
          <Card className="m-3">
            <Card.Header>Details</Card.Header>
            <Card.Body />
          </Card>
        </Col>
        <TableSeats table={table} getTable={forceUpdate} />
        <Col md={6}>
          <Card className="m-3">
            <Card.Header>Messages</Card.Header>
            <Card.Body />
          </Card>
        </Col>
      </Row>
    </div>
  );
}

export default withRouter(Table);
