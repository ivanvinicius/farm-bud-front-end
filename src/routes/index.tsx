import React from 'react';
import { Switch } from 'react-router-dom';

import Route from './Route';

import SignIn from '../pages/SignIn';
import SignUp from '../pages/SignUp';

import Dashboard from '../pages/Dashboard';
import Products from '../pages/Products';
import CreateProductMeasure from '../pages/CreateProductMeasure';

const Routes: React.FC = () => (
  <Switch>
    <Route path="/signin" component={SignIn} />
    <Route path="/signup" component={SignUp} />

    <Route path="/" exact component={Dashboard} isPrivate />
    <Route path="/products" component={Products} isPrivate />
    <Route
      path="/create-product-measure"
      component={CreateProductMeasure}
      isPrivate
    />
  </Switch>
);

export default Routes;
