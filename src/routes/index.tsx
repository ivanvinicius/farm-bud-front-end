import React from 'react';
import { Switch } from 'react-router-dom';

import Route from './Route';

import SignIn from '../pages/SignIn';
import SignUp from '../pages/SignUp';

import Dashboard from '../pages/Dashboard';
import ListProduct from '../pages/Product/List';
import CreateProductMeasure from '../pages/ProductMeasure/Create';
import ListProductMeasure from '../pages/ProductMeasure/List';
import ProductMenu from '../pages/ProductMenu';
import CompositionMenu from '../pages/CompositionMenu';

const Routes: React.FC = () => (
  <Switch>
    <Route path="/signin" component={SignIn} />
    <Route path="/signup" component={SignUp} />

    <Route path="/" exact component={Dashboard} isPrivate />
    <Route path="/products-menu" component={ProductMenu} isPrivate />
    <Route path="/compositions-menu" component={CompositionMenu} isPrivate />

    <Route path="/products" component={ListProduct} isPrivate />

    <Route
      path="/create-product-measure"
      component={CreateProductMeasure}
      isPrivate
    />
    <Route path="/products-measures" component={ListProductMeasure} isPrivate />
  </Switch>
);

export default Routes;
