import React from 'react';
import { Switch } from 'react-router-dom';

import Route from './Route';

import Dashboard from '../pages/Menu/Dashboard';
import Product from '../pages/Menu/Product';
import Composition from '../pages/Menu/Composition';

const MenuRouter: React.FC = () => (
  <Switch>
    <Route path="/" exact component={Dashboard} isPrivate />
    <Route path="/products-menu" component={Product} isPrivate />
    <Route path="/compositions-menu" component={Composition} isPrivate />
  </Switch>
);

export default MenuRouter;
