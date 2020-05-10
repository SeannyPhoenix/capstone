import React, { useState, useEffect } from 'react';
import { Redirect } from 'react-router-dom';
import { Row, Col, Card } from 'react-bootstrap';
import models from '../models';
import ProfileMap from '../components/ProfileMap';
import TableList from '../components/TableList';

function Profile({ user, clientIpData }) {
  const [tables, setTables] = useState([]);

  useEffect(() => {
    getTables();
  }, [user]);

  async function getTables() {
    setTables(await models.Table.indexUserTables());
  }

  if (!user) {
    return <Redirect to="/login" />;
  }

  return (
    <Row>
      <Col md={6}>
        <Card className="m-3">
          <Card.Header>
            {`Welcome, ${user.screenName}.`}
          </Card.Header>
          <Card.Body />
        </Card>
      </Col>
      <ProfileMap user={user} clientIpData={clientIpData} tables={tables} />
      <TableList user={user} tables={tables} getTables={getTables} />
    </Row>
  );
}

export default Profile;
