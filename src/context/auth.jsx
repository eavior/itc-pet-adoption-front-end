import { createContext, useContext, useEffect, useState } from 'react';
import localforage from 'localforage';

export const AuthContext = createContext({
  isInitiallyLoaded: false,
  token: '',
  userId: '',
  fullName: '',
  admin: false,
  saveToken: async (token) => {},
  removeToken: async () => {},
  saveUserId: async (token) => {},
  removeUserId: async () => {},
  saveFullName: async (token) => {},
  removeFullName: async () => {},
  saveAdminStatus: async (admin) => {},
  resetAdminStatus: async () => {},
});

const tokenKey = 'userToken';
const userKey = 'userId';
const nameKey = 'fullName';
const adminKey = 'adminRole';

export const useAuth = () => {
  return useContext(AuthContext);
};

const AuthProvider = (props) => {
  const [isInitiallyLoaded, setIsInitiallyLoaded] = useState(false);
  const [token, setToken] = useState();
  const [userId, setUserId] = useState();
  const [fullName, setFullName] = useState();
  const [admin, setAdmin] = useState();

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

  const removeUserId = async () => {
    setUserId();
    await localforage.removeItem(userKey);
  };

  const saveFullName = async (fullName) => {
    setFullName(fullName);
    await localforage.setItem(nameKey, fullName);
  };

  const removeFullName = async () => {
    setFullName();
    await localforage.removeItem(nameKey);
  };

  const saveAdminStatus = async (admin) => {
    setAdmin(admin);
    await localforage.setItem(adminKey, admin);
  };
  const resetAdminStatus = async () => {
    setAdmin(false);
    await localforage.removeItem(adminKey);
  };

  useEffect(() => {
    localforage.getItem(userKey).then((userId) => {
      if (userId) {
        setUserId(userId);
      }
    });

    localforage.getItem(nameKey).then((fullName) => {
      if (fullName) {
        setFullName(fullName);
      }
    });

    localforage.getItem(adminKey).then((admin) => {
      if (admin) {
        setAdmin(admin);
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
        fullName,
        admin,
        isInitiallyLoaded,
        saveToken,
        removeToken,
        saveUserId,
        removeUserId,
        saveFullName,
        removeFullName,
        saveAdminStatus,
        resetAdminStatus,
      }}>
      {props.children}
    </AuthContext.Provider>
  );
};
export default AuthProvider;
