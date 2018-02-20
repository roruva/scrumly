import React from 'react';
import { Route, Switch } from 'react-router-dom';

// import Teams from './teams';
import NotFound from './notfound';

import Dashboard from '../containers/dashboard';
import Users from '../containers/users/users';
import Teams from '../containers/teams';

const RouterApp = () =>
    <Switch>
        <Route exact path="/dashboard" component={Dashboard}/>
        <Route exact path="/teams" component={Teams}/>
        <Route exact path="/members" component={Users}/>
        <Route component={NotFound}/>
    </Switch>

export default RouterApp;