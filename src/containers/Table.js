import React, { useState, useEffect } from 'react';
import { withRouter } from 'react-router';
import { Redirect } from 'react-router-dom';
import { Row, Col, Card } from 'react-bootstrap';
import models from '../models';
import TableDetail from '../components/table/TableDetail';
import TableInfo from '../components/table/TableInfo';
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
    <Row className="my-3">
      <TableDetail table={table} getTable={forceUpdate} />
      <TableInfo table={table} getTable={forceUpdate} />
      <TableSeats table={table} getTable={forceUpdate} />
      <Col md={6}>
        <Card className="m-3">
          <Card.Header>Messages</Card.Header>
          <Card.Body />
        </Card>
      </Col>
    </Row>
  );
}

export default withRouter(Table);
