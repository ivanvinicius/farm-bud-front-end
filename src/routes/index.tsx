import React from 'react';

import LoginRouter from './LoginRouter';
import MenuRouter from './MenuRouter';
import ProductRouter from './ProductRouter';
import ProductMeasureRouter from './ProductMeasureRouter';
import CompositionRouter from './CompositionRouter';

const Routes: React.FC = () => (
  <>
    <LoginRouter />
    <MenuRouter />
    <ProductRouter />
    <ProductMeasureRouter />
    <CompositionRouter />
  </>
);

export default Routes;
