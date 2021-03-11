import React from 'react';

import { AuthProvider } from './auth';
import { TableProvider } from './table';

const AppProvider: React.FC = ({ children }) => {
  return (
    <>
      <AuthProvider>
        <TableProvider>{children}</TableProvider>
      </AuthProvider>
    </>
  );
};

export default AppProvider;
