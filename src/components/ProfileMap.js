import React, { useState } from 'react';
import {
  Col, Card, Form, InputGroup,
} from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearchLocation } from '@fortawesome/free-solid-svg-icons';
import { faDotCircle } from '@fortawesome/free-regular-svg-icons';
import { Map as LeafletMap, TileLayer } from 'react-leaflet';

const defaultZoom = 12;

export default function ProfileMap(props) {
  const [clientIpData, setClientIpData] = useState(props.clientIpData);
  const [position, setPosition] = useState(props.clientIpData ? props.clientIpData.location : null);
  const [searchString, setSearchString] = useState(null);

  if (clientIpData !== props.clientIpData) {
    setClientIpData(props.clientIpData);
    setPosition(props.clientIpData.location);
    setSearchString(props.clientIpData.postal);
  }

  function resetCenter() {
    setPosition(props.clientIpData.location);
  }

  console.log(searchString);
  return (
    <Col md={6}>
      <Card className="m-3">
        <Card.Header>Location</Card.Header>
        <Card.Body>
          <Form>
            <InputGroup>
              <InputGroup.Prepend>
                <InputGroup.Text className="px-1 pointer">
                  <FontAwesomeIcon
                    icon={faDotCircle}
                    fixedWidth
                    className="mx-1 text-coffee"
                    onClick={resetCenter}
                  />
                </InputGroup.Text>
              </InputGroup.Prepend>
              <Form.Control
                type="text"
                value={searchString}
                onChange={(event) => setSearchString(event.target.value)}
                className="border-none"
              />
              <InputGroup.Append>
                <InputGroup.Text className="px-1 pointer">
                  <FontAwesomeIcon
                    icon={faSearchLocation}
                    fixedWidth
                    className="mx-1 text-coffee"
                  />
                </InputGroup.Text>
              </InputGroup.Append>
            </InputGroup>
          </Form>
          <LeafletMap center={position} zoom={defaultZoom} className="border-coffee">
            <TileLayer
              attribution='&amp;copy <a href="http://osm.org/copyright">OpenStreetMap</a> contributors, <a href="http://www.stamen.com/">Stamen Design</a>'
              url="http://c.tile.stamen.com/watercolor/{z}/{x}/{y}.jpg"
            />
          </LeafletMap>
        </Card.Body>
      </Card>
    </Col>
  );
}
