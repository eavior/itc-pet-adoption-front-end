import React from 'react';
// import { useState } from 'react';
import { useForm } from 'react-hook-form';

export default function UserProfile() {
  const {
    register,
    handleSubmit,
    // formState: { errors },
  } = useForm();
  // const [currentEntries, setCurrentEntries] = useState({
  //   fname: 'Elisha',
  //   lname: 'Avior',
  // });
  const onSubmit = (data) => console.log(data);

  return (
    <>
      <form className="row g-3" onSubmit={handleSubmit(onSubmit)}>
        <div className="col-8">
          <div className="row">
            <div className="col-5 mb-4">
              <label className="form-label">First name</label>
              <input
                className="form-control"
                type="text"
                value=""
                placeholder="First name"
                {...register('First name', {
                  required: true,
                  min: 1,
                  maxLength: 80,
                })}
              />
            </div>

            <div className="col-5 mb-4">
              <label className="form-label">Last name</label>
              <input
                className="form-control"
                type="text"
                placeholder="Last name"
                {...register('Last name', {
                  required: true,
                  min: 1,
                  maxLength: 100,
                })}
              />
            </div>

            <div className="col-10 mb-4">
              <label className="form-label">Phone number</label>
              <input
                className="form-control"
                type="tel"
                placeholder="Mobile number"
                {...register('Mobile number', {
                  required: true,
                  minLength: 6,
                  maxLength: 12,
                })}
              />
            </div>

            <div className="col-md-5 mb-4">
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

            <div className="col-md-5 mb-4">
              <label className="form-label">Repeat email address</label>
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

            <div className="col-md-5 mb-4">
              <label className="form-label">Password</label>
              <input
                className="form-control"
                type="password"
                placeholder="Password"
                {...register('Password', { required: true })}
              />
            </div>

            <div className="col-md-5 mb-4">
              <label className="form-label">Repeat password</label>
              <input
                className="form-control"
                type="password"
                placeholder="Password"
                {...register('Password', { required: true })}
              />
            </div>
          </div>
        </div>
        <div className="col-4">
          <label className="form-label">Short bio</label>
          <textarea
            className="form-control"
            style={{ height: '20rem' }}
            {...register('Bio', { required: true, min: 1 })}
          />
        </div>
        <div className="col-12 mb-4">
          <button type="submit" className="btn btn-primary float-end ms-4">
            Save your changes
          </button>

          <input className="btn btn-primary float-end" type="submit" />
          <div className="form-check">
            <input
              className="form-check-input"
              type="checkbox"
              id="gridCheck"></input>
            <label
              className="form-check-label"
              // for="gridCheck"
            >
              Agree to the user terms
            </label>
          </div>
        </div>
      </form>
    </>
  );
}
