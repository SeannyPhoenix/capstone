import React from 'react';
import { Redirect, Route, Switch } from 'react-router-dom';

import Directory from '../containers/Directory';
import Session from '../components/Session';
import Profile from '../containers/Profile';
import Table from '../containers/Table';

function Routes(props) {
  return (
    <Switch>
      <Route exact path="/">
        <Directory clientIpData={props.clientIpData} />
      </Route>
      <Route path={['/login', '/register', '/profile/edit']}>
        <Session verify={props.verify} user={props.user} addToast={props.addToast} />
      </Route>
      <Route path="/profile/:id?">
        <Profile user={props.user} clientIpData={props.clientIpData} />
      </Route>
      <Route path="/tables/:id?">
        <Table user={props.user} />
      </Route>
      <Route path="/">
        <Redirect to="/" />
      </Route>
    </Switch>
  );
}

export default Routes;
