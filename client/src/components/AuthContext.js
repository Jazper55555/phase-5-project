import React, { createContext, useContext } from 'react';
import { useAuth0 } from '@auth0/auth0-react';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const { isAuthenticated, loginWithRedirect, logout, user, isLoading, getAccessTokenSilently } = useAuth0();

  return (
    <AuthContext.Provider value={{ isAuthenticated, loginWithRedirect, logout, user, isLoading, getAccessTokenSilently }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  return useContext(AuthContext);
};