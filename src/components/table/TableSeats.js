import React, { useState } from 'react';
import {
  Row, Col, Card, Button, ButtonGroup, Accordion,
} from 'react-bootstrap';
import models from '../../models';
import SeatIcon from './SeatIcon';
import SeatListItem from './SeatListItem';

function TableSeats({
  table, getTable, owner, user,
}) {
  const [action, setAction] = useState({ action: '', id: null });

  async function handleAction(action, seatId, data) {
    switch (action) {
      case 'add':
        await models.Seat.add(table._id);
        break;
      case 'request':
        setAction({ action: '', id: null });
        await models.Seat.request(table._id, user._id);
        break;
      case 'save':
        setAction({ action: '', id: null });
        await models.Seat.update(seatId, data);
        break;
      case 'cancel':
        setAction({ action: '', id: null });
        break;
      case 'delete':
        removeSeat(seatId);
        break;
      default:
    }
    getTable();
  }

  async function removeSeat(seatId) {
    setAction({ action: '', id: null });
    await models.Seat.remove(table._id, seatId);
    getTable();
  }

  const seatIcons = table.seats.map((seat, number) => {
    const rotation = Math.floor((360 * number) / table.seats.length);
    return (
      <SeatIcon
        key={seat._id}
        seat={seat}
        rotation={rotation}
        remove={removeSeat}
        action={action}
        setAction={setAction}
      />
    );
  });

  const seatList = table.seats.map((seat) => (
    <SeatListItem
      key={seat._id}
      table={table}
      seat={seat}
      action={action}
      setAction={setAction}
      owner={owner}
      getTable={getTable}
    />
  ));

  function seatButton() {
    if (!user) {
      return null;
    }
    if (owner) {
      return (
        <Button
          className="btn-primary"
          onClick={() => {
            handleAction('add');
          }}
        >
          Add Seat
        </Button>
      );
    }
    if (!table.requests.filter((req) => req._id === user._id).length) {
      return (
        <Button
          className="btn-primary"
          onClick={() => {
            handleAction('request');
          }}
        >
          Request Seat
        </Button>
      );
    }
    return <Button className="btn-secondary">Request Sent</Button>;
  }

  return (
    <Col md={6}>
      <Card className="m-3">
        <Card.Header className="navbar">
          <span>Seats: </span>
          <ButtonGroup className="float-right">
            {seatButton()}
          </ButtonGroup>
        </Card.Header>
        <Card.Body>
          <Row>
            <Col>
              <div className="table-area">
                <div className="table-top" />
                {seatIcons}
              </div>
            </Col>
          </Row>
          <Row>
            <Col>
              <Accordion>
                {seatList}
              </Accordion>
            </Col>
          </Row>
        </Card.Body>
      </Card>
    </Col>
  );
}

export default TableSeats;
