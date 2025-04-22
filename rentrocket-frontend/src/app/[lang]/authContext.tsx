'use client'
import { createContext, useState, useEffect, useContext } from 'react';
import { getAccessToken } from '@/services/auth-token.service';
import { userService } from '@/services/user.service';
import { useQuery } from '@tanstack/react-query';

interface AuthContextType {
  isAuthenticated: boolean;
  setIsAuthenticated: (value: boolean) => void;
  profile: any;
  isProfileLoading: boolean;
  isProfileLoadingSuccess: boolean
}

export const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children } : { children: React.ReactNode }) => {
  const accessToken = getAccessToken();
  const [isAuthenticated, setIsAuthenticated] = useState(!!accessToken);
  
  const { data: profile, isLoading: isProfileLoading, isSuccess: isProfileLoadingSuccess } = useQuery({
    queryKey: ['profile'],
    queryFn: () => {
      console.log('Fetching profile data...');
      return userService.getProfile();
    },
    retry: 0,
    enabled: isAuthenticated,
  });

  useEffect(() => {
    setIsAuthenticated(!!accessToken);
  }, [accessToken]);

  return (
    <AuthContext.Provider 
      value={{ 
        isAuthenticated, 
        setIsAuthenticated,
        profile,
        isProfileLoading,
        isProfileLoadingSuccess
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};