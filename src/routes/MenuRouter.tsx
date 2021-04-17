import React from 'react';
import { Switch } from 'react-router-dom';

import Route from './Route';

import Dashboard from '../pages/Dashboard';

const MenuRouter: React.FC = () => (
  <Switch>
    <Route path="/" exact component={Dashboard} isPrivate />
  </Switch>
);

export default MenuRouter;
