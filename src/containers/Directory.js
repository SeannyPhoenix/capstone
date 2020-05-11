import React, { useState, useEffect } from 'react';
import { Link, Redirect } from 'react-router-dom';
import {
  Row, Col, Card, Form, InputGroup, ButtonGroup, Button, Table,
} from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearchLocation } from '@fortawesome/free-solid-svg-icons';
import { faDotCircle } from '@fortawesome/free-regular-svg-icons';
import { Map as LeafletMap, TileLayer, Marker } from 'react-leaflet';
import SearchControls from '../components/SearchControls';
import models from '../models';

const defaultZoom = 12;
const defaultCenter = [37.7684, -122.4415];
const defaultZip = '94117';

export default function Directory({ clientIpData }) {
  const [center, setCenter] = useState(clientIpData ? clientIpData.location : defaultCenter);
  const [zoom, setZoom] = useState(defaultZoom);
  const [searchResults, setSearchResults] = useState([]);
  const [tableList, setTableList] = useState([]);

  useEffect(() => {
    if (clientIpData) {
      setCenter(clientIpData.location);
    }
  }, [clientIpData]);

  useEffect(() => {
    getTables();
  }, [center]);

  useEffect(() => {
    getTables();
  }, [searchResults]);

  function resetMap() {
    setCenter(clientIpData ? clientIpData.location : defaultCenter);
    setZoom(defaultZoom);
    getTables();
  }

  function mapToLocation(coordinates) {
    setCenter(coordinates);
    setZoom(defaultZoom);
    getTables();
  }

  async function sendSearch(searchString) {
    if (searchString.length) {
      const response = await models.Nominatim.search(searchString);
      for (let i = 0; i < response.length; i++) {
        response[i].coordinates = [response[i].lat, response[i].lon];
      }
      if (response.length) {
        mapToLocation(response[0].coordinates);
        setSearchResults(response);
      } else {
        setSearchResults();
      }
    }
  }

  async function getTables() {
    const response = await models.Table.indexInRadius(
      center[1] || center.lng,
      center[0] || center.lat,
      5000,
    );
    setTableList(response);
  }

  const mapTables = tableList
    .filter((table) => table.published && table.coordinates)
    .map((table) => <Marker key={table._id} position={table.coordinates} />);

  const tableDirectory = tableList
    .filter((table) => table.published && table.coordinates)
    .map((table) => {
      const openRoles = [
        ...new Set(table.seats.filter((seat) => !seat.profile).map((seat) => seat.role)),
      ].join(', ');
      return (
        <tr key={table._id}>
          <td>
            <Link to={`/tables/${table._id}`}>
              {table.name}
            </Link>
          </td>
          <td>
            {table.owner.screenName}
          </td>
          <td>
            <Link
              onClick={() => {
                setCenter(table.coordinates);
                setZoom(defaultZoom);
              }}
            >
              {table.zip}
            </Link>
          </td>
          <td>
            {table.game.name}
          </td>
          <td>
            {table.seats.filter((seat) => !seat.profile).length}
          </td>
          <td>
            {openRoles}
          </td>
        </tr>
      );
    });

  return (
    <Row className="my-3">
      <Col>
        <Card>
          <Card.Header>Table Search</Card.Header>
          <Card.Body>
            <Row>
              <SearchControls
                clientZip={clientIpData ? clientIpData.postal : defaultZip}
                sendSearch={sendSearch}
                searchResults={searchResults}
                resetMap={resetMap}
                mapToLocation={mapToLocation}
              />
              <Col md={8}>
                <LeafletMap
                  center={center}
                  zoom={zoom}
                  onMoveEnd={(event) => {
                    setCenter(event.target.getCenter());
                  }}
                  onZoomEnd={(event) => {
                    setZoom(event.target.getZoom());
                  }}
                >
                  <TileLayer
                    attribution='&amp;copy <a href="http://osm.org/copyright">OpenStreetMap</a> contributors, <a href="http://www.stamen.com/">Stamen Design</a>'
                    url="http://c.tile.stamen.com/watercolor/{z}/{x}/{y}.jpg"
                  />
                  {mapTables}
                </LeafletMap>
                <Table>
                  <thead>
                    <tr>
                      <th>Name</th>
                      <th>Owner</th>
                      <th>Location</th>
                      <th>System</th>
                      <th>Open Seats</th>
                      <th>Open Roles</th>
                    </tr>
                  </thead>
                  <tbody>
                    {tableDirectory}
                  </tbody>
                </Table>
              </Col>
            </Row>
          </Card.Body>
        </Card>
      </Col>
    </Row>
  );
}
