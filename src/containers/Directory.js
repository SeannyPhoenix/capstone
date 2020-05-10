import React, { useState, useEffect } from 'react';
import {
  Row, Col, Card, Form,
} from 'react-bootstrap';
import {
  Map as LeafletMap, TileLayer, Marker, Popup,
} from 'react-leaflet';
import { Link } from 'react-router-dom';
import models from '../models';

const defaultZoom = 12;

export default function Directory({ clientIpData }) {
  const [clientLocation, setClientLocation] = useState(
    clientIpData ? clientIpData.location : [37.7684, -122.4415],
  );
  const [searchString, setSearchString] = useState('');
  const [searchResults, setSearchResults] = useState('');
  const [tableList, setTableList] = useState([]);

  useEffect(() => {
    getTables();
  }, [searchResults]);

  async function sendSearch(event) {
    event.preventDefault();
    const response = await models.Nominatim.search(searchString);
    setSearchResults(response);
  }

  async function getTables() {
    const response = await models.Table.index();
    setTableList(response);
  }

  const mapTables = tableList
    .filter((table) => table.published && table.coordinates)
    .map((table) => <Marker key={table._id} position={table.coordinates} />);

  const tableDirectory = tableList
    .filter((table) => table.published && table.coordinates)
    .map((table) => (
      <li>
        <Link key={table._id} to={`/tables/${table._id}`}>
          {table.name}
        </Link>
      </li>
    ));

  return (
    <Row className="my-3">
      <Col>
        <Card>
          <Card.Header>Table Search</Card.Header>
          <Card.Body>
            <Row>
              <Col md={4}>
                <Form onSubmit={sendSearch}>
                  <Form.Control
                    type="input"
                    value={searchString}
                    placeholder={clientIpData ? clientIpData.postal : 'Search'}
                    onChange={(event) => {
                      setSearchString(event.target.value);
                    }}
                  />
                </Form>
              </Col>
              <Col md={8}>
                <LeafletMap center={clientLocation} zoom={defaultZoom}>
                  <TileLayer
                    attribution='&amp;copy <a href="http://osm.org/copyright">OpenStreetMap</a> contributors, <a href="http://www.stamen.com/">Stamen Design</a>'
                    url="http://c.tile.stamen.com/watercolor/{z}/{x}/{y}.jpg"
                  />
                  {mapTables}
                </LeafletMap>
              </Col>
              <Col>
                <ul>
                  {tableDirectory}
                </ul>
              </Col>
            </Row>
          </Card.Body>
        </Card>
      </Col>
    </Row>
  );
}
