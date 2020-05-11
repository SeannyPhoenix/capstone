import React, { useState, useEffect } from 'react';
import {
  Row, Col, Accordion, Card, ButtonGroup, Button, Form, Dropdown,
} from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPen, faTimes } from '@fortawesome/free-solid-svg-icons';
import { faTrashAlt } from '@fortawesome/free-regular-svg-icons';
import models from '../../models';

export default function SeatListItem({
  table, seat, action, setAction, owner, getTable,
}) {
  const [highlight, setHighlight] = useState(action.action && action.id === seat._id);
  const [edit, setEdit] = useState(action.action === 'edit' && action.id === seat._id);
  const [seatProfiles, setSeatProfiles] = useState([owner]);

  useEffect(() => {
    setHighlight(action.action && action.id === seat._id);
    setEdit(action.action === 'edit' && action.id === seat._id);
  }, [action, seat._id]);

  useEffect(() => {
    const list = Object.values(
      Object.fromEntries(
        [
          table.owner,
          ...table.requests,
          ...table.seats.filter((seat) => seat.profile).map((seat) => seat.profile),
        ].map((profile) => [profile._id, profile]),
      ),
    );
    setSeatProfiles(list);
  }, [table.owner, table.requests, table.seats]);

  async function updateProfile(profile) {
    await models.Seat.update(seat._id, { profile });
    getTable();
  }

  async function updateRole(role) {
    await models.Seat.update(seat._id, { role });
    getTable();
  }

  function seatOptions() {
    return seatProfiles.map((profile) => (
      <Dropdown.Item
        key={profile._id}
        onClick={() => {
          updateProfile(profile._id);
        }}
      >
        {profile.screenName}
      </Dropdown.Item>
    ));
  }

  return (
    <div>
      <Card.Body
        className={`${seat.profile ? 'text-coffee' : 'text-muted'} ${
          highlight ? 'border-primary shadow border-bottom' : ''
        }`}
      >
        <Form>
          <Row>
            <Col sm={5}>
              <Dropdown>
                <Dropdown.Toggle
                  variant="none"
                  disabled={!edit}
                  className={seat.profile ? 'text-coffee' : 'text-muted'}
                >
                  {seat.profile ? seat.profile.screenName : 'Open Seat'}
                </Dropdown.Toggle>
                <Dropdown.Menu>
                  <Dropdown.Item
                    key={0}
                    onClick={() => {
                      updateProfile(null);
                    }}
                  >
                    Open Seat
                  </Dropdown.Item>
                  {seatOptions()}
                </Dropdown.Menu>
              </Dropdown>
            </Col>
            <Col sm={4}>
              <Dropdown>
                <Dropdown.Toggle
                  variant="none"
                  disabled={!edit}
                  className={seat.profile ? 'text-coffee' : 'text-muted'}
                >
                  {seat.role}
                </Dropdown.Toggle>
                <Dropdown.Menu>
                  <Dropdown.Item
                    onClick={() => {
                      updateRole('Game Master');
                    }}
                  >
                    Game Master
                  </Dropdown.Item>
                  <Dropdown.Item
                    onClick={() => {
                      updateRole('Player');
                    }}
                  >
                    Player
                  </Dropdown.Item>
                </Dropdown.Menu>
              </Dropdown>
            </Col>
            <Col sm={3}>
              <ButtonGroup className="text-coffee">
                <Button variant="none">
                  <FontAwesomeIcon visible={edit} icon={faTrashAlt} onClick={() => {}} />
                </Button>
                <Accordion.Toggle
                  eventKey={seat._id}
                  as={Button}
                  variant="none"
                  className={owner ? 'visible' : 'invisible'}
                  onMouseMove={() => {
                    if (!edit) {
                      setAction({ action: 'hover', id: seat._id });
                    }
                  }}
                >
                  <FontAwesomeIcon
                    icon={edit ? faTimes : faPen}
                    onClick={() => {
                      if (!edit) {
                        setAction({ action: 'edit', id: seat._id });
                      } else {
                        setAction({ action: '', id: null });
                      }
                    }}
                  />
                </Accordion.Toggle>
              </ButtonGroup>
            </Col>
          </Row>
        </Form>
      </Card.Body>
    </div>
  );
}
