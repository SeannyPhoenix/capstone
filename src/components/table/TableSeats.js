import React, { useState } from 'react';
import {
  Row, Col, Card, Button, ButtonGroup,
} from 'react-bootstrap';
import models from '../../models';
import SeatIcon from './SeatIcon';
import SeatListItem from './SeatListItem';
import SeatEdit from './SeatEdit';

function TableGame({ table, getTable }) {
  const [action, setAction] = useState({ action: '', id: null });

  async function handleEdit(action, seatId, data) {
    switch (action) {
      case 'delete':
        removeSeat(seatId);
        break;
      case 'cancel':
        setAction({ action: '', id: null });
        break;
      case 'save':
        setAction({ action: '', id: null });
        await models.Seat.update(seatId, data);
        break;
      default:
    }
  }

  async function addSeat() {
    await models.Seat.add(table._id);
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
    <SeatListItem key={seat._id} seat={seat} action={action} setAction={setAction} />
  ));

  function seatEdit() {
    if (action.action === 'edit') {
      const seat = table.seats.find((seat) => seat._id === action.id);
      return <SeatEdit seat={seat} handleEdit={handleEdit} />;
    }
  }

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
            <Col md={7}>
              <div className="table-area">
                <div className="table-top" />
                {seatIcons}
              </div>
            </Col>
            <Col md={5}>
              {seatList}
            </Col>
          </Row>
          <Row>
            <Col>
              {seatEdit()}
            </Col>
          </Row>
        </Card.Body>
      </Card>
    </Col>
  );
}

export default TableGame;
