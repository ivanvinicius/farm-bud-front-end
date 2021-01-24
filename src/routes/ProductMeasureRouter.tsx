import React from 'react';
import { Switch } from 'react-router-dom';

import Route from './Route';

import List from '../pages/ProductMeasure/List';
import Create from '../pages/ProductMeasure/Create';
import Update from '../pages/ProductMeasure/Update';

const ProductMeasureRouter: React.FC = () => (
  <Switch>
    <Route path="/products-measures" component={List} isPrivate />
    <Route path="/create-product-measure" component={Create} isPrivate />
    <Route path="/update-product-measure" component={Update} isPrivate />
  </Switch>
);

export default ProductMeasureRouter;
