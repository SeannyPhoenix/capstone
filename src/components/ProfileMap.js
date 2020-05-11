import React, { useState, useEffect } from 'react';
import {
  Col, Card, Form, InputGroup,
} from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearchLocation } from '@fortawesome/free-solid-svg-icons';
import { faDotCircle } from '@fortawesome/free-regular-svg-icons';
import {
  Map as LeafletMap, TileLayer, Marker, Popup,
} from 'react-leaflet';

const defaultZoom = 12;

export default function ProfileMap({ user, clientIpData, tables }) {
  const [searchString, setSearchString] = useState('');
  const [clientLocation, setClientLocation] = useState(clientIpData ? clientIpData.location : null);

  useEffect(() => {
    if (clientIpData) {
      setClientLocation(clientIpData.location);
    }
  }, [clientIpData]);

  const mapTables = tables
    .filter((table) => table.published && table.coordinates)
    .map((table) => (
      <Marker key={table._id} position={table.coordinates}>
        <Popup>
          {Popup}
        </Popup>
      </Marker>
    ));

  function buildMap() {
    if (clientLocation) {
      return (
        <LeafletMap center={clientLocation} zoom={defaultZoom} className="border-coffee">
          <TileLayer
            attribution='&amp;copy <a href="http://osm.org/copyright">OpenStreetMap</a> contributors, <a href="http://www.stamen.com/">Stamen Design</a>'
            url="http://c.tile.stamen.com/watercolor/{z}/{x}/{y}.jpg"
          />
          <Marker position={clientLocation} />
          {mapTables}
        </LeafletMap>
      );
    }
  }

  return (
    <Col md={6}>
      <Card className="m-3">
        <Card.Header>Location</Card.Header>
        <Card.Body>
          {buildMap()}
        </Card.Body>
      </Card>
    </Col>
  );
}
