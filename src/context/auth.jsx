import { createContext, useContext, useEffect, useState } from 'react';
import localforage from 'localforage';

export const AuthContext = createContext({
  isInitiallyLoaded: false,
  token: '',
  // userId: '',
  admin: false,
  saveToken: async (token) => {},
  removeToken: async () => {},
  // saveUserId: async (token) => {},
  saveAdminStatus: async (admin) => {},
  resetAdminStatus: async () => {},
});

const tokenKey = 'userToken';
const userKey = 'userId';
const adminKey = 'adminRole';

export const useAuth = () => {
  return useContext(AuthContext);
};

const AuthProvider = (props) => {
  const [isInitiallyLoaded, setIsInitiallyLoaded] = useState(false);
  const [token, setToken] = useState();
  const [userId, setUserId] = useState();
  const [admin, setAdmin] = useState();

  const saveToken = async (token) => {
    setToken(token);
    await localforage.setItem(tokenKey, token);
  };
  const removeToken = async () => {
    setToken();
    await localforage.removeItem(tokenKey);
  };

  // const saveUserId = async (userId) => {
  //   setUserId(userId);
  //   await localforage.setItem(userKey, userId);
  // };

  const saveAdminStatus = async (admin) => {
    setAdmin(admin);
    await localforage.setItem(adminKey, admin);
  };
  const resetAdminStatus = async () => {
    setAdmin(false);
    await localforage.removeItem(adminKey);
  };

  useEffect(() => {
    // localforage.getItem(userKey).then((userId) => {
    //   console.log(userId);
    //   if (userId) {
    //     setUserId(userId);
    //   }
    // });

    localforage.getItem(adminKey).then((userId) => {
      console.log(userId);
      if (userId) {
        setUserId(userId);
      }
    });

    localforage.getItem(adminKey).then((admin) => {
      console.log(admin);
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
        // userId,
        admin,
        isInitiallyLoaded,
        saveToken,
        removeToken,
        // saveUserId,
        saveAdminStatus,
        resetAdminStatus,
      }}>
      {props.children}
    </AuthContext.Provider>
  );
};
export default AuthProvider;
