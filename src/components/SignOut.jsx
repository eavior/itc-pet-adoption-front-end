import React from 'react';
import { useEffect, useRef } from 'react';
import { useAuth } from '../context/auth';

const SignOut = () => {
  const isMounted = useRef(false);
  const auth = useAuth();

  useEffect(() => {
    isMounted.current = true;
    auth.resetAdminStatus();
    auth.removeUserId();
    auth.removeFullName();
    auth.removeToken();

    return () => {
      isMounted.current = false;
    };
  }, []);

  return <div>You have been signed out from the site.</div>;
};

export default SignOut;
