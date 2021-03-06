import React from 'react';
import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { getPetById, updatePet, createImage, deletePet } from '../lib/api';
import { useAuth } from '../context/auth';
import FormData from 'form-data';

const AdminEditPet = (props) => {
  const { id, onCloseModal, onLoadPets } = props;
  const [pet, setPet] = useState({});
  const [petPicURL, setPetPicURL] = useState('');
  const auth = useAuth();

  const { register, setValue, handleSubmit } = useForm();

  const onSubmit = async (data) => {
    try {
      const editedPet = await updatePet(id, data, auth.token);
      setPet(editedPet.pet);
      onCloseModal();
      onLoadPets();
    } catch (error) {
      alert(error);
    }
  };

  const onDelete = async () => {
    try {
      const deletedPet = await deletePet(id, auth.token);
      onLoadPets();
      onCloseModal();
    } catch (error) {
      alert(error);
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
      alert(error);
    }
  };

  useEffect(() => {
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
  }, []);

  return (
    <>
      <form className="row g-3" onSubmit={handleSubmit(onSubmit)}>
        {petPicURL && (
          <div className="col-md-4">
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
        )}

        <div className="col-8">
          <div className="row">
            <div className="col-6 mb-3">
              <label className="form-label">Pet name</label>
              <input
                className="form-control"
                type="text"
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
                onChange={(e) => setValue(e.target.value)}
                placeholder="Breed"
                {...register('breed', {
                  required: false,
                  maxLength: 100,
                })}
              />
            </div>

            <div className="col-6 mb-3">
              <label className="form-label">Color</label>
              <input
                className="form-control"
                type="text"
                onChange={(e) => setValue(e.target.value)}
                placeholder="Color"
                {...register('color', {
                  required: false,
                  maxLength: 100,
                })}
              />
            </div>

            <div className="col-6 mb-3">
              <label className="form-label">Height (cm)</label>
              <input
                className="form-control"
                type="number"
                placeholder="Height"
                onChange={(e) => setValue(+e.target.value)}
                {...register('height', {
                  required: false,
                  min: 0,
                  max: 999,
                })}
              />
            </div>

            <div className="col-6 mb-3">
              <label className="form-label">Weight (gram)</label>
              <input
                className="form-control"
                type="number"
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
                type="checkbox"
                onChange={(e) => setValue(e.target.value)}
                placeholder="Hypoallergenic"
                {...register('hypoallergenic', {
                  required: false,
                  maxLength: 100,
                })}
              />
              <label className="form-label">&nbsp;Hypoallergenic</label>
            </div>

            <div className="col-9 mb-3">
              <label className="form-label">Dietary restrictions</label>
              <input
                className="form-control"
                type="text"
                onChange={(e) => setValue(e.target.value)}
                placeholder="Dietary restrictions"
                {...register('diet', {
                  required: false,
                  maxLength: 100,
                })}
              />
            </div>
          </div>
        </div>

        <div className="col-12">
          <div className="row">
            <div className="col-12">
              <label className="form-label">Biography</label>
              <textarea
                className="form-control"
                onChange={(e) => setValue(e.target.value)}
                style={{ height: '7rem' }}
                {...register('bio', { required: false, min: 1 })}
              />
            </div>
          </div>
        </div>

        <div className="col-12">
          <div className="row">
            <div className="col-6 mb-4">
              <button
                type="button"
                onClick={handleSubmit(onDelete)}
                className="btn btn-danger float-start ms-0">
                {' '}
                Delete this pet
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
