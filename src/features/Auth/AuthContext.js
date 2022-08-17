import { createContext, useContext, useState } from 'react';

const AuthContext = createContext(null);

export function AuthContextProvider({ children }) {
  const [auth, setAuth] = useState(() => {
    const fromStorage = localStorage.getItem('auth');
    if (fromStorage) {
      return JSON.parse(fromStorage);
    }

    return null;
  });

  function login(data) {
    localStorage.setItem('auth', JSON.stringify(data));
    setAuth(data);
  }

  function logout() {
    localStorage.removeItem('auth');
    setAuth(null);
  }

  return (
    <AuthContext.Provider
      value={{
        login,
        logout,
        accessToken: auth?.accessToken,
        user: auth?.user,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuthContext() {
  return useContext(AuthContext);
}
