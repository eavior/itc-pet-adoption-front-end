import React from 'react';
import { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { login } from '../lib/api';
import { useAuth } from '../context/auth';

export default function Login() {
  const auth = useAuth();
  const [errorMessage, setErrorMessage] = useState('');
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = async (data) => {
    try {
      const { token, user } = await login(data);
      // await auth.saveUserId(user.id);
      if (user.role === 'admin') await auth.saveAdminStatus(true);
      else await auth.saveAdminStatus(false);
      await auth.saveToken(token);
    } catch (error) {
      setErrorMessage(
        `${error.response.data.message} (status ${error.response.status} ${error.response.statusText})`
      );
    }
  };

  useEffect(() => {
    alert(errorMessage);
  }, [errorMessage]);

  return (
    <>
      <form className="row g-3" onSubmit={handleSubmit(onSubmit)}>
        <div className="col-12">
          <div className="row">
            <div className="col-md-6 mb-4">
              <label className="form-label">Email</label>
              <input
                className="form-control"
                type="email"
                placeholder="Email"
                {...register('email', {
                  required: true,
                  min: 4,
                  pattern: /^\S+@\S+$/i,
                })}
              />
            </div>

            <div className="col-md-6 mb-4">
              <label className="form-label">Password</label>
              <input
                className="form-control"
                type="password"
                placeholder="Password"
                {...register('password', { required: true })}
              />
            </div>
          </div>
        </div>

        <div className="col-12 mb-4">
          <button type="submit" className="btn btn-primary float-end ms-4">
            Sign in
          </button>

          <input className="btn btn-primary float-end" type="submit" />
        </div>
      </form>
    </>
  );
}
