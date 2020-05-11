import React, { useState } from 'react';
import { useLocation } from 'react-router-dom';
import {
  Col, Form, InputGroup, ButtonGroup, Button, Table,
} from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearchLocation, faMapMarkerAlt } from '@fortawesome/free-solid-svg-icons';
import { faDotCircle } from '@fortawesome/free-regular-svg-icons';

function useQuery() {
  return new URLSearchParams(useLocation().search);
}

export default function SearchControls({
  clientZip,
  sendSearch,
  searchResults,
  resetMap,
  mapToLocation,
}) {
  const query = useQuery();
  const [searchString, setSearchString] = useState(query.get('search') || '');

  const searchResultsList = searchResults.map((result) => (
    <tr key={result.place_id} onClick={() => mapToLocation(result.coordinates)}>
      <td>
        <small>
          {result.display_name}
        </small>
      </td>
      <td>
        <FontAwesomeIcon icon={faMapMarkerAlt} />
      </td>
    </tr>
  ));

  return (
    <Col md={4}>
      <Form
        onSubmit={(event) => {
          event.preventDefault();
          if (searchString.length) {
            sendSearch(searchString);
          }
        }}
      >
        <InputGroup>
          <Form.Control
            type="input"
            value={searchString}
            placeholder={clientZip || 'Search'}
            onChange={(event) => {
              setSearchString(event.target.value);
            }}
          />
          <InputGroup.Append>
            <ButtonGroup>
              <Button type="submit" variant="none" className="px-1">
                <FontAwesomeIcon icon={faSearchLocation} fixedWidth className="mx-1 text-coffee" />
              </Button>
              <Button variant="none" className="px-1">
                <FontAwesomeIcon
                  icon={faDotCircle}
                  fixedWidth
                  className="mx-1 text-coffee"
                  onClick={resetMap}
                />
              </Button>
            </ButtonGroup>
          </InputGroup.Append>
        </InputGroup>
      </Form>
      <Table className="text-coffee">
        <tbody>
          {searchResultsList}
        </tbody>
      </Table>
    </Col>
  );
}
