import React from 'react';
import { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';

export default function Login() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = (data) => console.log(data);
  console.log(errors);

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
                {...register('Email', {
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
                {...register('Password', { required: true })}
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
