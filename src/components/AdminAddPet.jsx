import React from 'react';
// import { useEffect, useState, useRef } from 'react';
import { useForm } from 'react-hook-form';
import { createPet, createImage } from '../lib/api';

const AddPet = (props) => {
  // const { item } = props;
  // const [displayName, setdisplayName] = useState(null);
  // const [pets, setPets] = useState(null);
  // const isMounted = useRef(false);

  const {
    register,
    setValue,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = (data) => {
    console.log(data);
    // const file = data.image[0];
    const formData = new FormData();
    formData.append('image', data.image[0]);
    createPet(data, formData);
    // createImage(data.picture_url);
  };

  // useEffect(() => {
  //   isMounted.current = true;

  //   return () => {
  //     isMounted.current = false;
  //   };
  // }, []);

  // const handleOnNewPet = (newPet) => {
  //   setPets((prevPets) => [...prevPets, newPet]);
  // };
  // const handleOnDeleteItem = (itemIndex) => {
  //   setPets((prevPets) => {
  //     const left = prevPets.slice(0, itemIndex);
  //     const right = prevPets.slice(itemIndex + 1);
  //     return [...left, ...right];
  //   });
  // };

  return (
    <>
      <form className="row g-3" onSubmit={handleSubmit(onSubmit)}>
        <div className="col-8">
          <div className="row">
            <div className="col-5 mb-4">
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

            <div className="col-5 mb-4">
              <label className="form-label">Type</label>
              <select className="form-control" {...register('type')}>
                <option value="dog">Dog</option>
                <option value="cat">Cat</option>
              </select>
            </div>

            <div className="col-5 mb-4">
              <label className="form-label">Breed</label>
              <input
                className="form-control"
                type="text"
                onChange={(e) => setValue(e.target.value)}
                placeholder="Breed"
                {...register('breed', {
                  required: false,
                  // min: 1,
                  maxLength: 100,
                })}
              />
            </div>

            <div className="col-5 mb-4">
              <label className="form-label">Color</label>
              <input
                className="form-control"
                type="text"
                onChange={(e) => setValue(e.target.value)}
                placeholder="Color"
                {...register('color', {
                  required: false,
                  // minLength: 1,
                  maxLength: 100,
                })}
              />
            </div>

            <div className="col-md-5 mb-4">
              <label className="form-label">Height</label>
              <input
                className="form-control"
                type="number"
                placeholder="Height"
                defaultValue="0"
                onChange={(e) => setValue(+e.target.value)}
                {...register('height', {
                  required: false,
                  min: 0,
                  max: 999,
                  // pattern: /^\S+@\S+$/i,
                })}
              />
            </div>

            <div className="col-md-5 mb-4">
              <label className="form-label">Weight</label>
              <input
                className="form-control"
                type="number"
                defaultValue="0"
                onChange={(e) => setValue(e.target.value)}
                placeholder="Weight"
                {...register('weight', {
                  required: false,
                  min: 0,
                  max: 999,
                })}
              />
            </div>

            <div className="col-10 mb-4">
              <label className="form-label">Hypoallergenic</label>
              <input
                // className="form-control"
                type="checkbox"
                onChange={(e) => setValue(e.target.value)}
                placeholder="Hypoallergenic"
                {...register('hypoallergenic', {
                  required: false,
                  // minLength: 1,
                  maxLength: 100,
                })}
              />
            </div>

            <div className="col-10 mb-4">
              <label className="form-label">Dietary restrictions</label>
              <input
                className="form-control"
                type="text"
                onChange={(e) => setValue(e.target.value)}
                placeholder="Dietary restrictions"
                {...register('diet', {
                  required: false,
                  // minLength: 1,
                  maxLength: 100,
                })}
              />
            </div>

            <div className="col-10 mb-4">
              <label className="form-label">Picture</label>
              <input
                className="form-control"
                type="text"
                onChange={(e) => setValue(e.target.value)}
                placeholder="Picture url"
                {...register('picture_url', {
                  required: false,
                  // minLength: 1,
                  maxLength: 100,
                })}
              />
            </div>

            <div className="mb-3">
              <label htmlFor="formFile" className="form-label">
                Attach a picture
              </label>
              <input
                className="form-control"
                type="file"
                {...register('image', {
                  required: false,
                })}
              />
            </div>
          </div>
        </div>
        <div className="col-4">
          <label className="form-label">Biography</label>
          <textarea
            className="form-control"
            onChange={(e) => setValue(e.target.value)}
            style={{ height: '20rem' }}
            {...register('bio', { required: false, min: 1 })}
          />
        </div>
        <div className="col-12 mb-4">
          <button type="submit" className="btn btn-primary float-end ms-4">
            Save your changes
          </button>
          {/* <input className="btn btn-primary float-end" type="submit" />
          <div className="form-check">
            <input
              className="form-check-input"
              type="checkbox"
              id="gridCheck"></input>
            <label className="form-check-label"> */}
          {/* for="gridCheck" */}
          Agree to the user terms
          {/* </label>
          </div> */}
        </div>
      </form>
    </>
  );
};

export default AddPet;
