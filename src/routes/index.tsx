import React from 'react';

import LoginRouter from './LoginRouter';
import MenuRouter from './MenuRouter';
import ProductRouter from './ProductRouter';
import PortfolioRouter from './PortfolioRouter';
import CompositionRouter from './CompositionRouter';

const Routes: React.FC = () => (
  <>
    <LoginRouter />
    <MenuRouter />
    <ProductRouter />
    <PortfolioRouter />
    <CompositionRouter />
  </>
);

export default Routes;
