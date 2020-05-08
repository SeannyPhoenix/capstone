import React from 'react';
import {
  Row, Col, Card, Button, ButtonGroup,
} from 'react-bootstrap';
import models from '../../models';
import GameItem from './GameItem';

function TableGame(props) {
  async function updateGame(id) {
    await models.Table.update(props.table._id, { game: id });
    props.getTable();
  }

  return (
    <Col md={6}>
      <Card className="m-3">
        <Card.Header className="navbar">
          {`Table: ${props.table.name}`}
          <ButtonGroup className="float-right">
            <Button className="btn-primary">Edit</Button>
            <Button className="btn-primary" onClick={props.deleteTable}>
              Delete
            </Button>
          </ButtonGroup>
        </Card.Header>
        <Card.Body>
          <Row>
            <Col>
              <GameItem game={props.table.game} updateGame={updateGame} />
            </Col>
          </Row>
          <Row>
            <Col>p</Col>
          </Row>
        </Card.Body>
      </Card>
    </Col>
  );
}

export default TableGame;
