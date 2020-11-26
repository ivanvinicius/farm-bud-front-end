import React, { createContext, useCallback, useState, useContext } from 'react';

import api from '../services/api';

interface IUserProps {
  email: string;
  id: string;
  name: string;
}

interface IAuthState {
  token: string;
  user: IUserProps;
}

interface ISignInData {
  email: string;
  password: string;
}

interface IContextData {
  user: IUserProps;
  signIn(credential: ISignInData): Promise<void>;
  signOut(): void;
}

const AuthContext = createContext<IContextData>({} as IContextData);

const AuthProvider: React.FC = ({ children }) => {
  const [data, setData] = useState<IAuthState>(() => {
    const token = localStorage.getItem('@FarmBud:token');
    const user = localStorage.getItem('@FarmBud:user');

    if (token && user) {
      return { token, user: JSON.parse(user) };
    }

    return {} as IAuthState;
  });

  const signIn = useCallback(async ({ email, password }) => {
    const response = await api.post('sessions', { email, password });

    const { token, user } = response.data;

    localStorage.setItem('@FarmBud:token', token);
    localStorage.setItem('@FarmBud:user', JSON.stringify(user));

    setData({ token, user });
  }, []);

  const signOut = useCallback(async () => {
    localStorage.removeItem('@FarmBud:token');
    localStorage.removeItem('@FarmBud:user');

    setData({} as IAuthState);
  }, []);

  return (
    <AuthContext.Provider value={{ user: data.user, signIn, signOut }}>
      {children}
    </AuthContext.Provider>
  );
};

const useAuth = (): IContextData => {
  const context = useContext(AuthContext);

  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }

  return context;
};

export { AuthProvider, useAuth };
