import { createContext, useContext, useEffect, useState } from 'react';
import localforage from 'localforage';

export const AuthContext = createContext({
  isInitiallyLoaded: false,
  token: '',
  userId: '',
  saveToken: async (token) => {},
  removeToken: async () => {},
  saveUserId: async (token) => {},
});

const tokenKey = 'userToken';
const userKey = 'userId';

export const useAuth = () => {
  return useContext(AuthContext);
};

const AuthProvider = (props) => {
  const [isInitiallyLoaded, setIsInitiallyLoaded] = useState(false);
  const [token, setToken] = useState();
  const [userId, setUserId] = useState();

  const saveToken = async (token) => {
    setToken(token);
    await localforage.setItem(tokenKey, token);
  };
  const removeToken = async () => {
    setToken();
    await localforage.removeItem(tokenKey);
  };

  const saveUserId = async (userId) => {
    setUserId(userId);
    await localforage.setItem(userKey, userId);
  };

  useEffect(() => {
    localforage.getItem(userKey).then((userId) => {
      console.log(userId);
      if (userId) {
        setUserId(userId);
      }
    });
    localforage.getItem(tokenKey).then((token) => {
      if (token) {
        setToken(token);
      }
      setIsInitiallyLoaded(true);
    });
  }, []);
  return (
    <AuthContext.Provider
      value={{
        token,
        userId,
        isInitiallyLoaded,
        saveToken,
        removeToken,
        saveUserId,
      }}>
      {props.children}
    </AuthContext.Provider>
  );
};
export default AuthProvider;
