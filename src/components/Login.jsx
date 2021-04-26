import React from 'react';
// import { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { login } from '../lib/api';
import { useAuth } from '../context/auth';

export default function Login() {
  const auth = useAuth();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  // const onSubmit = (data) => console.log(data);
  // console.log(errors);
  const onSubmit = async (data) => {
    try {
      console.log(data);
      const { token, user } = await login(data);
      await auth.saveUserId(user.id);
      await auth.saveToken(token);
    } catch (error) {
      console.log(error);
      alert('There is something wrong with the email and/or password');
    }
  };

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
