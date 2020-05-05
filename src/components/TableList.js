import React, { Component } from 'react';
import { Row, Col, Card, Table } from 'react-bootstrap';
import TableListItem from './TableListItem';
import models from '../models';

export default class TableList extends Component {
  state = {
    tables: [],
  };

  componentDidMount() {
    this.getTables();
  }

  async getTables() {
    let tables = await models.Table.indexUserTables();
    this.setState({
      tables,
    });
  }

  async dbAction(id, name, newTable) {
    // Don't do anything if blank
    if (name) {
      // Perform update or create
      if (newTable) {
        await models.Table.create({ owner: this.props.user._id, name });
      } else {
        await models.Table.update(id, { name });
      }
      this.getTables();
    }
  }

  render() {
    let options = this.state.tables.map((table) => (
      <TableListItem
        key={table._id}
        name={table.name}
        id={table._id}
        dbAction={this.dbAction.bind(this)}
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
                    <TableListItem newTable dbAction={this.dbAction.bind(this)} />
                  </tbody>
                </Table>
              </Col>
            </Row>
          </Card.Body>
        </Card>
      </Col>
    );
  }
}
