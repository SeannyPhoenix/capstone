import React, { useState, useEffect } from 'react';
import { withRouter } from 'react-router';
import { Redirect } from 'react-router-dom';
import { Row } from 'react-bootstrap';
import models from '../models';
import TableDetail from '../components/table/TableDetail';
import TableInfo from '../components/table/TableInfo';
import TableSeats from '../components/table/TableSeats';
import TableActivity from '../components/table/TableActivity';

function Table({ user, match }) {
  const [owner, setOwner] = useState(false);
  const [table, setTable] = useState(null);
  const [update, setUpdate] = useState(false);

  useEffect(() => {
    async function getTable() {
      const response = await models.Table.show(match.params.id);
      setTable(response);
    }
    getTable();
    setUpdate(false);
  }, [update, match.params.id]);

  useEffect(() => {
    if (user && table) {
      setOwner(table.owner._id === user._id);
    } else {
      setOwner(false);
    }
  }, [table, user]);

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
      <TableDetail table={table} getTable={forceUpdate} owner={owner} />
      <TableInfo table={table} getTable={forceUpdate} owner={owner} />
      <TableSeats table={table} getTable={forceUpdate} owner={owner} user={user} />
      <TableActivity table={table} owner={owner} />
    </Row>
  );
}

export default withRouter(Table);
