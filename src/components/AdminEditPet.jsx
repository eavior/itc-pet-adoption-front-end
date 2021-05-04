import React from 'react';
import { useEffect, useState, useRef } from 'react';
import { useForm } from 'react-hook-form';
import { getPetById, updatePet, createImage, deletePet } from '../lib/api';
import { useAuth } from '../context/auth';
import { useParams } from 'react-router-dom';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
} from 'react-router-dom';
import FormData from 'form-data';

const AdminEditPet = (props) => {
  const { id, onCloseModal, onLoadPets } = props;
  console.log(id);
  console.log(onLoadPets);
  console.log(onCloseModal);
  const [pet, setPet] = useState({});
  const [petPicURL, setPetPicURL] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const isMounted = useRef(false);
  const auth = useAuth();
  // let { id } = useParams();

  const {
    register,
    setValue,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = async (data) => {
    try {
      const editedPet = await updatePet(id, data, auth.token);
      setPet(editedPet.pet);
      onCloseModal();
    } catch (error) {
      setErrorMessage(
        `${error.response.data.message} (status ${error.response.status} ${error.response.statusText})`
      );
    }
  };

  const onDelete = async () => {
    console.log(id);
    try {
      const deletedPet = await deletePet(id, auth.token);
      onLoadPets();
      onCloseModal();
    } catch (error) {
      setErrorMessage(
        `${error.response.data.message} (status ${error.response.status} ${error.response.statusText})`
      );
    }
  };

  const onSubmitPicture = async (data) => {
    const file = data.image[0];
    let formData = new FormData();
    formData.append('image', file, file.name);
    try {
      const imageUrl = await createImage(formData, auth.token);
      setPetPicURL(imageUrl.picture_url);
      setValue('picture_url', imageUrl.picture_url);
    } catch (error) {
      setErrorMessage(
        `${error.response.data.message} (status ${error.response.status} ${error.response.statusText})`
      );
    }
  };

  useEffect(() => {
    if (errorMessage) alert(errorMessage);
  }, [errorMessage]);

  useEffect(() => {
    // if (!isAddMode) {
    // get user and set form fields

    getPetById(id, auth.token).then((pet) => {
      const fields = [
        'name',
        'status',
        'type',
        'breed',
        'color',
        'height',
        'weight',
        'hypoallergenic',
        'diet',
        'bio',
        'picture_url',
      ];
      fields.forEach((field) => setValue(field, pet[field]));
      setPet(pet);
      setPetPicURL(pet.picture_url);
    });
    // }
  }, []);

  return (
    <>
      <form className="row g-3" onSubmit={handleSubmit(onSubmit)}>
        <div className="col-md-4">
          {/* <label className="form-label">Biography</label> */}
          <img
            src={petPicURL}
            alt="..."
            className="img-fluid rounded"
            style={{
              height: '15rem',
              width: '30rem',
              objectFit: 'contain',
              border: 'solid 1px #ccc',
            }}
          />
        </div>

        <div className="col-8">
          <div className="row">
            <div className="col-6 mb-3">
              <label className="form-label">Pet name</label>
              <input
                className="form-control"
                type="text"
                // defaultValue={petName}
                onChange={(e) => setValue(e.target.value)}
                placeholder="Pet name"
                {...register('name', {
                  required: true,
                  min: 1,
                  maxLength: 100,
                })}
              />
            </div>

            <div className="col-6 mb-3">
              <label className="form-label">Type</label>
              <select className="form-control" {...register('type')}>
                <option value="dog">Dog</option>
                <option value="cat">Cat</option>
              </select>
            </div>

            <div className="col-6 mb-3">
              <label className="form-label">Breed</label>
              <input
                className="form-control"
                type="text"
                // defaultValue={petBreed}
                onChange={(e) => setValue(e.target.value)}
                placeholder="Breed"
                {...register('breed', {
                  required: false,
                  // min: 1,
                  maxLength: 100,
                })}
              />
            </div>

            <div className="col-6 mb-3">
              <label className="form-label">Color</label>
              <input
                className="form-control"
                type="text"
                // defaultValue={petColor}
                onChange={(e) => setValue(e.target.value)}
                placeholder="Color"
                {...register('color', {
                  required: false,
                  // minLength: 1,
                  maxLength: 100,
                })}
              />
            </div>

            <div className="col-6 mb-3">
              <label className="form-label">Height</label>
              <input
                className="form-control"
                type="number"
                placeholder="Height"
                // defaultValue={petHeight}
                onChange={(e) => setValue(+e.target.value)}
                {...register('height', {
                  required: false,
                  min: 0,
                  max: 999,
                  // pattern: /^\S+@\S+$/i,
                })}
              />
            </div>

            <div className="col-6 mb-3">
              <label className="form-label">Weight</label>
              <input
                className="form-control"
                type="number"
                // defaultValue={petWeight}
                onChange={(e) => setValue(e.target.value)}
                placeholder="Weight"
                {...register('weight', {
                  required: true,
                  min: 0,
                  max: 999,
                })}
              />
            </div>
          </div>
        </div>

        <div className="mb-3">
          <label htmlFor="formFile" className="form-label">
            Attach a picture
          </label>
          <div className="input-group">
            <input
              type="file"
              className="form-control"
              id="inputGroupFile04"
              aria-describedby="inputGroupFileAddon04"
              aria-label="Upload"
              {...register('image', {
                required: false,
              })}
            />
            <button
              className="btn btn-outline-secondary"
              type="button"
              id="inputGroupFileAddon04"
              onClick={handleSubmit(onSubmitPicture)}>
              Upload
            </button>
          </div>
        </div>

        <div className="col-12">
          <div className="row">
            <div className="col-3 mb-3">
              <input
                // className="form-control"
                type="checkbox"
                // defaultValue={petHypoallergenic}
                onChange={(e) => setValue(e.target.value)}
                placeholder="Hypoallergenic"
                {...register('hypoallergenic', {
                  required: false,
                  // minLength: 1,
                  maxLength: 100,
                })}
              />
              <label className="form-label"> Hypoallergenic</label>
            </div>

            <div className="col-9 mb-3">
              <label className="form-label">Dietary restrictions</label>
              <input
                className="form-control"
                type="text"
                // defaultValue={petDiet}
                onChange={(e) => setValue(e.target.value)}
                placeholder="Dietary restrictions"
                {...register('diet', {
                  required: false,
                  // minLength: 1,
                  maxLength: 100,
                })}
              />
            </div>
          </div>
        </div>

        {/* <div className="col-10 mb-3">
          <label className="form-label">Picture</label>
          <input
            className="form-control"
            type="text"
            // defaultValue={petPicURL}
            onChange={(e) => setValue(e.target.value)}
            placeholder="Picture url"
            {...register('picture_url', {
              required: false,
              // minLength: 1,
              maxLength: 100,
            })}
          />
        </div> */}

        <div className="col-12">
          <div className="row">
            <div className="col-12">
              <label className="form-label">Biography</label>
              <textarea
                className="form-control"
                // defaultValue={petBio}
                onChange={(e) => setValue(e.target.value)}
                style={{ height: '7rem' }}
                {...register('bio', { required: false, min: 1 })}
              />
            </div>
            <div className="col-6 mb-4">
              <button
                type="button"
                onClick={handleSubmit(onDelete)}
                className="btn btn-primary float-end ms-4">
                {' '}
                Delete
              </button>
            </div>
            <div className="col-6 mb-4">
              <button type="submit" className="btn btn-primary float-end ms-4">
                Save your changes
              </button>
            </div>
          </div>
        </div>
      </form>
    </>
  );
};

export default AdminEditPet;
