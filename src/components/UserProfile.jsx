import React from 'react';
import { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { useAuth } from '../context/auth';
import { getCurrentUser, updateCurrentUser } from '../lib/api';

const UserProfile = (props) => {
  const { currentUserData, currentUserId } = props;
  const [email, setEmail] = useState('');
  const [user, setUser] = useState('');

  const auth = useAuth();

  const {
    register,
    handleSubmit,
    setValue,
    // formState: { errors },
  } = useForm();

  const onSubmit = async (data) => {
    if (data.email !== data.email2)
      return alert("The email addresses don't match. Please correct.");
    if (data.password !== data.password2)
      return alert("The passwords don't match. Please correct.");
    try {
      const editedUser = await updateCurrentUser(data.id, data, auth.token);
      setUser(editedUser.user);
      alert(editedUser.result);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getCurrentUser(auth.userId, auth.token).then((user) => {
      const fields = [
        'id',
        'bio',
        'first_name',
        'last_name',
        'phone_number',
        'role',
        'updated',
      ];
      fields.forEach((field) => setValue(field, user[field]));
      setEmail(user.email);
    });
  }, []);

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
                onChange={(e) => setValue(e.target.value)}
                placeholder="First name"
                {...register('first_name', {
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
                onChange={(e) => setValue(e.target.value)}
                placeholder="Last name"
                {...register('last_name', {
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
                onChange={(e) => setValue(e.target.value)}
                placeholder="Mobile number"
                {...register('phone_number', {
                  required: true,
                  minLength: 6,
                  maxLength: 12,
                })}
              />
            </div>

            <div className="col-10 mb-4">
              <label className="form-label">
                The email address linked to this account is {email}.<br />
                If you want to change the email address, or the password, please
                fill in the relevant fields below.
              </label>
            </div>

            <div className="col-md-5 mb-4">
              <label className="form-label">New email</label>
              <input
                className="form-control"
                type="email"
                onChange={(e) => setValue(e.target.value)}
                placeholder="Email"
                {...register('email', {
                  required: false,
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
                {...register('email2', {
                  required: false,
                  min: 4,
                  pattern: /^\S+@\S+$/i,
                })}
              />
            </div>

            <div className="col-md-5 mb-4">
              <label className="form-label">New password</label>
              <input
                className="form-control"
                type="password"
                onChange={(e) => setValue(e.target.value)}
                placeholder="Password"
                {...register('password', { required: false })}
              />
            </div>

            <div className="col-md-5 mb-4">
              <label className="form-label">Repeat password</label>
              <input
                className="form-control"
                type="password"
                onChange={(e) => setValue(e.target.value)}
                placeholder="Password"
                {...register('password2', { required: false })}
              />
            </div>
          </div>
        </div>
        <div className="col-4">
          <label className="form-label">Short bio</label>
          <textarea
            className="form-control"
            onChange={(e) => setValue(e.target.value)}
            style={{ height: '20rem' }}
            {...register('bio', { required: false, min: 0 })}
          />
        </div>
        <div className="col-12 mb-4">
          <button type="submit" className="btn btn-primary float-end ms-4">
            Save your changes
          </button>
        </div>
      </form>
    </>
  );
};

export default UserProfile;
