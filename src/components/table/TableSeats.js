import React, { useState, useEffect } from 'react';
import {
  Row, Col, Card, Button, ButtonGroup,
} from 'react-bootstrap';
import models from '../../models';
import SeatIcon from './SeatIcon';

function TableGame({ table, getTable }) {
  async function addSeat() {
    await models.Seat.add(table._id);
    getTable();
  }

  async function removeSeat(seatId) {
    await models.Seat.remove(table._id, seatId);
    getTable();
  }

  const tableSeats = table.seats.map((seat, number) => {
    const rotation = Math.floor((360 * number) / table.seats.length);
    return <SeatIcon key={seat._id} seat={seat} rotation={rotation} remove={removeSeat} />;
  });
  const listSeats = table.seats.map((seat, number) => (
    <p key={seat._id}>
      {seat._id}
    </p>
  ));

  return (
    <Col md={6}>
      <Card className="m-3">
        <Card.Header className="navbar">
          <span>Seats: </span>
          <ButtonGroup className="float-right">
            <Button className="btn-primary" onClick={addSeat}>
              Add Seat
            </Button>
          </ButtonGroup>
        </Card.Header>
        <Card.Body>
          <Row>
            <Col md={8}>
              <div className="table-area">
                <div className="table-top" />
                {tableSeats}
              </div>
            </Col>
            <Col md={4} className="bg-primary">
              {listSeats}
            </Col>
          </Row>
          <Row>
            <Col>nothing</Col>
          </Row>
        </Card.Body>
      </Card>
    </Col>
  );
}

export default TableGame;
