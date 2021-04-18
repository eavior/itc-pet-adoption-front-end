import React from 'react';
// import { useEffect, useState, useRef } from 'react';
import { useForm } from 'react-hook-form';

const AddPet = (props) => {
  // const { item } = props;
  // const [displayName, setdisplayName] = useState(null);
  // const [pets, setPets] = useState(null);
  // const isMounted = useRef(false);

  const {
    register,
    handleSubmit,
    // formState: { errors },
  } = useForm();

  const onSubmit = (data) => console.log(data);

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
                value=""
                placeholder="Pet name"
                {...register('PetName', {
                  required: true,
                  min: 1,
                  maxLength: 80,
                })}
              />
            </div>

            <div className="col-5 mb-4">
              <label className="form-label">Breed</label>
              <input
                className="form-control"
                type="text"
                placeholder="Breed"
                {...register('Breed', {
                  required: true,
                  min: 1,
                  maxLength: 100,
                })}
              />
            </div>

            <div className="col-10 mb-4">
              <label className="form-label">Color</label>
              <input
                className="form-control"
                type="text"
                placeholder="Color"
                {...register('Color', {
                  required: true,
                  minLength: 6,
                  maxLength: 12,
                })}
              />
            </div>

            <div className="col-md-5 mb-4">
              <label className="form-label">Height</label>
              <input
                className="form-control"
                type="number"
                placeholder="Height"
                {...register('Height', {
                  required: true,
                  // min: 4,
                  // pattern: /^\S+@\S+$/i,
                })}
              />
            </div>

            <div className="col-md-5 mb-4">
              <label className="form-label">Weight</label>
              <input
                className="form-control"
                type="number"
                placeholder="Weight"
                {...register('Weight', {
                  required: true,
                  // min: 4,
                  // pattern: /^\S+@\S+$/i,
                })}
              />
            </div>

            <div className="col-10 mb-4">
              <label className="form-label">Hypoallergenic</label>
              <input
                className="form-control"
                type="text"
                placeholder="Hypoallergenic"
                {...register('Hypoallergenic', {
                  required: true,
                  minLength: 6,
                  maxLength: 12,
                })}
              />
            </div>

            <div className="col-10 mb-4">
              <label className="form-label">Dietary restrictions</label>
              <input
                className="form-control"
                type="text"
                placeholder="Dietary restrictions"
                {...register('DietaryRestrictions', {
                  required: true,
                  minLength: 6,
                  maxLength: 12,
                })}
              />
            </div>
          </div>
        </div>
        <div className="col-4">
          <label className="form-label">Picture</label>
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
            <label className="form-check-label">
              {/* for="gridCheck" */}
              Agree to the user terms
            </label>
          </div>
        </div>
      </form>
    </>
  );
};

export default AddPet;
