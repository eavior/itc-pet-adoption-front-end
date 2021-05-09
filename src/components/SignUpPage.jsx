import React from 'react';
import { useForm } from 'react-hook-form';
import { signUp, login } from '../lib/api';
import { useAuth } from '../context/auth';

export default function SignUpPage() {
  const auth = useAuth();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = async (data) => {
    if (data.email !== data.email2)
      return alert("The email addresses don't match. Please correct.");
    if (data.password !== data.password2)
      return alert("The passwords don't match. Please correct.");
    try {
      await signUp(data);
    } catch (error) {
      alert(
        `${error.response.data.message} (status ${error.response.status} ${error.response.statusText})`
      );
      return;
    }
    try {
      const { token, user } = await login(data);
      await auth.saveUserId(user.id);
      await auth.saveFullName(user.fullName);
      await auth.saveToken(token);
      alert(
        `Dear ${data.firstName}, it's great to have you with us! Your account has been created, and you will now be logged in.`
      );
    } catch (error) {
      alert(
        `${error.response.data.message} (status ${error.response.status} ${error.response.statusText})`
      );
    }
  };

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
                {...register('email2', {
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
                {...register('password2', { required: true })}
              />
            </div>
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
        </div>

        <div className="col-12 mb-4">
          <button type="submit" className="btn btn-primary float-end ms-4">
            I'm ready, please create my account!
          </button>

          {/* <input className="btn btn-primary float-end" type="submit" /> */}
          {/* <div className="form-check">
            <input
              className="form-check-input"
              type="checkbox"
              id="gridCheck"></input>
            <label className="form-check-label">
              htmlFor="gridCheck"
              Agree to the user terms
            </label>
          </div> */}
        </div>
      </form>
    </>
  );
}
