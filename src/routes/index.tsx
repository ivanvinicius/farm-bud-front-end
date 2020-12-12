import React from 'react';
import { Switch } from 'react-router-dom';

import Route from './Route';

import SignIn from '../pages/SignIn';
import SignUp from '../pages/SignUp';

import Dashboard from '../pages/Dashboard';

import ListProduct from '../pages/Product/List';
import CreateProductMeasure from '../pages/ProductMeasure/Create';
import UpdateProductMeasure from '../pages/ProductMeasure/Update';
import ListProductMeasure from '../pages/ProductMeasure/List';
import ProductMenu from '../pages/ProductMenu';

import CompositionMenu from '../pages/CompositionMenu';
import ListComposition from '../pages/Composition/List';

const Routes: React.FC = () => (
  <Switch>
    <Route path="/signin" component={SignIn} />
    <Route path="/signup" component={SignUp} />
    <Route path="/" exact component={Dashboard} isPrivate />
    {/* Products */}
    <Route path="/products-menu" component={ProductMenu} isPrivate />
    <Route path="/products" component={ListProduct} isPrivate />
    <Route path="/create-product-measure" component={CreateProductMeasure} isPrivate /> {/* eslint-disable-line */}
    <Route path="/update-product-measure" component={UpdateProductMeasure} isPrivate /> {/* eslint-disable-line */}
    <Route path="/products-measures" component={ListProductMeasure} isPrivate />
    {/* Compositions */}
    <Route path="/compositions-menu" component={CompositionMenu} isPrivate />
    <Route path="/compositions" component={ListComposition} isPrivate />
  </Switch>
);

export default Routes;
