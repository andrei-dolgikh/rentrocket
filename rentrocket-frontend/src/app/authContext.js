'use client'
import { createContext, useState, useEffect } from 'react';
import {
	getAccessToken
} from '@/services/auth-token.service'

const AuthContext = createContext();

const AuthProvider = ({ children }) => {
	const accessToken = getAccessToken()
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  
  useEffect(() => {
    setIsAuthenticated(accessToken ? true : false)
  }, [])

  return (
    <AuthContext.Provider value={{ isAuthenticated, setIsAuthenticated }}>
      {children}
    </AuthContext.Provider>
  );
};

export { AuthProvider, AuthContext };