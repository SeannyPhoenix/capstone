import React from 'react';
import { Redirect, Route, Switch } from 'react-router-dom';

import Session from '../components/Session';

function Routes(props) {
  return (
    <Switch>
      <Route exact path="/">
        <div>Home</div>
      </Route>
      <Route path={['/login', '/register', '/profile/edit']}>
        <Session verify={props.verify} user={props.user} addToast={props.addToast} />
      </Route>
      <Route path="/profile/:id?" />
      <Route path="/tables" />
      <Route path="/">
        <Redirect to="/" />
      </Route>
    </Switch>
  );
}

export default Routes;
