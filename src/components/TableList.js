import React from 'react';
import {
  Row, Col, Card, Table,
} from 'react-bootstrap';
import TableListItem from './TableListItem';
import models from '../models';

export default function TableList({ user, tables, getTables }) {
  async function dbAction(id, name, newTable) {
    // Don't do anything if blank
    if (name) {
      // Perform update or create
      if (newTable) {
        await models.Table.create({ owner: user._id, name });
      } else {
        await models.Table.update(id, { name });
      }
      getTables();
    }
  }

  const options = tables.map((table) => (
    <TableListItem
      key={table._id}
      name={table.name}
      published={table.published}
      id={table._id}
      dbAction={dbAction}
    />
  ));

  return (
    <Col md={6}>
      <Card className="m-3">
        <Card.Header>Game Tables</Card.Header>
        <Card.Body>
          <Row>
            <Col>
              <Table borderless size="sm">
                <tbody>
                  {options}
                  <TableListItem newTable dbAction={dbAction} />
                </tbody>
              </Table>
            </Col>
          </Row>
        </Card.Body>
      </Card>
    </Col>
  );
}
