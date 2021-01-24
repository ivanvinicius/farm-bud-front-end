import React from 'react';
import { Switch } from 'react-router-dom';

import Route from './Route';

import List from '../pages/Composition/List';

const CompositionRouter: React.FC = () => (
  <Switch>
    <Route path="/compositions" component={List} isPrivate />
  </Switch>
);

export default CompositionRouter;
