import React from 'react';
import { useEffect, useRef } from 'react';
import { useAuth } from '../context/auth';

const SignOut = () => {
  const isMounted = useRef(false);
  const auth = useAuth();

  useEffect(() => {
    isMounted.current = true;

    auth.removeToken();

    return () => {
      isMounted.current = false;
    };
  }, []);

  return <div>This is the SignOut page.</div>;
};

export default SignOut;
