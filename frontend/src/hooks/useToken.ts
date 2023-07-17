import { useState } from 'react';

// Custom hook for using token with useState
// The possible types for token are string or null
// since ther might not be any token saved in the
// session storage.
export default function useToken() {
  const getToken = (): string | null => {
    return sessionStorage.getItem('token');
  };

  const [token, setToken] = useState<string | null>(getToken());

  const saveToken = (userToken: string): void => {
    sessionStorage.setItem('token', userToken);
    setToken(userToken);
  };

  return {
    setToken: saveToken,
    token
  }
}
