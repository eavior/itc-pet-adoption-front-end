import React from 'react';
import { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { signUp, login } from '../lib/api';
import { useAuth } from '../context/auth';

export default function SignUp() {
  const auth = useAuth();
  const [errorMessage, setErrorMessage] = useState('');
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = async (data) => {
    try {
      await signUp(data);
    } catch (error) {
      setErrorMessage(
        `${error.response.data.message} (status ${error.response.status} ${error.response.statusText})`
      );
      return;
    }
    try {
      const { token, user } = await login(data);
      await auth.saveUserId(user.id);
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
            <div className="col-6 mb-4">
              <label className="form-label">First name</label>
              <input
                className="form-control"
                type="text"
                // value=""
                placeholder="First name"
                {...register('firstName', {
                  required: true,
                  min: 1,
                  maxLength: 80,
                })}
              />
            </div>

            <div className="col-6 mb-4">
              <label className="form-label">Last name</label>
              <input
                className="form-control"
                type="text"
                placeholder="Last name"
                {...register('lastName', {
                  required: true,
                  min: 1,
                  maxLength: 100,
                })}
              />
            </div>

            <div className="col-6 mb-4">
              <label className="form-label">Phone number</label>
              <input
                className="form-control"
                type="tel"
                placeholder="Phone number"
                {...register('phoneNumber', {
                  required: true,
                  minLength: 6,
                  maxLength: 12,
                })}
              />
            </div>

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
              <label className="form-label">Repeat email address</label>
              <input
                className="form-control"
                type="email"
                placeholder="Email"
                {...register('emailCheck', {
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

            <div className="col-md-6 mb-4">
              <label className="form-label">Repeat password</label>
              <input
                className="form-control"
                type="password"
                placeholder="Password"
                {...register('passwordCheck', { required: true })}
              />
            </div>
          </div>
        </div>

        <div className="col-12 mb-4">
          <button type="submit" className="btn btn-primary float-end ms-4">
            I'm ready, please create my account!
          </button>

          {/* <input className="btn btn-primary float-end" type="submit" /> */}
          <div className="form-check">
            <input
              className="form-check-input"
              type="checkbox"
              id="gridCheck"></input>
            <label className="form-check-label">
              {/* for="gridCheck" */}
              Agree to the user terms
            </label>
          </div>
        </div>
      </form>
    </>
  );
}
