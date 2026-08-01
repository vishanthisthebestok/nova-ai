import { createContext, useContext, useState, useEffect } from 'react';

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [isLoadingAuth, setIsLoadingAuth] = useState(true);
  const [isLoadingPublicSettings, setIsLoadingPublicSettings] = useState(false);
  const [authError, setAuthError] = useState(null);

  useEffect(() => {
    // Load user from localStorage on mount
    const loadUser = () => {
      try {
        const storedUser = localStorage.getItem('user');
        if (storedUser) {
          setUser(JSON.parse(storedUser));
        }
      } catch (error) {
        console.error('Error loading user from localStorage:', error);
      } finally {
        setIsLoadingAuth(false);
      }
    };

    loadUser();
  }, []);

  const login = (userData) => {
    setUser(userData);
    localStorage.setItem('user', JSON.stringify(userData));
    setAuthError(null);
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('user');
    window.location.href = '/login';
  };

  const navigateToLogin = () => {
    window.location.href = '/login';
  };

  const value = {
    user,
    isLoadingAuth,
    isLoadingPublicSettings,
    authError,
    login,
    logout,
    navigateToLogin,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
