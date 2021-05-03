import React from 'react';
import { useEffect, useState, useRef } from 'react';
import { useForm } from 'react-hook-form';
import { getPetById, updatePet, createImage } from '../lib/api';
import { useAuth } from '../context/auth';
import { useParams } from 'react-router-dom';
import FormData from 'form-data';

const AdminEditPet = (props) => {
  const { id } = props;
  // const [displayName, setdisplayName] = useState(null);
  const [pet, setPet] = useState({});
  // const [petName, setPetName] = useState('');
  // const [petStatus, setPetStatus] = useState('');
  // const [petType, setPetType] = useState('');
  // const [petBreed, setPetBreed] = useState('');
  // const [petColor, setPetColor] = useState('');
  // const [petHeight, setPetHeight] = useState(0);
  // const [petWeight, setPetWeight] = useState(0);
  // const [petHypoallergenic, setPetHypoallergenic] = useState(false);
  // const [petDiet, setPetDiet] = useState('');
  // const [petBio, setPetBio] = useState('');
  const [petPicURL, setPetPicURL] = useState('');

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
    console.log(data);
    try {
      const editedPet = await updatePet(id, data, auth.token);
      setPet(editedPet.pet);
    } catch (error) {
      console.log(error);
    }
  };

  const onSubmitPicture = async (data) => {
    alert('hello');
    console.log(data.image);
    const file = data.image[0];
    console.log(file);
    console.log(file.name);
    let formData = new FormData();
    formData.append('image', file, file.name);
    console.log(formData);
    for (var pair of formData.entries()) {
      console.log(pair[0] + ', ' + pair[1]);
    }
    try {
      const imageUrl = await createImage(id, formData);
      console.log(imageUrl.picture_url);
      setPetPicURL(imageUrl.picture_url);
      setValue('picture_url', imageUrl.picture_url);
      console.log(petPicURL);
      // setPet(editedPet.pet);
    } catch (error) {
      console.log(error);
    }
  };

  //   let data = new FormData();
  // data.append('file', file, file.name);

  // return (dispatch) => {
  // axios.post(URL, data, {
  //   headers: {
  //     'accept': 'application/json',
  //     'Accept-Language': 'en-US,en;q=0.8',
  //     'Content-Type': `multipart/form-data; boundary=${data._boundary}`,
  //   }
  // })
  //   .then((response) => {
  //     //handle success
  //   }).catch((error) => {
  //     //handle error
  //   });
  // };}

  // useEffect(() => {
  //   // isMounted.current = true;
  //   loadPet();

  //   // return () => {
  //   //   isMounted.current = false;
  //   // };
  // }, []);

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

  // const loadPet = async () => {
  //   try {
  //     const pet = await getPetById(id, auth.token);
  //     setPet(pet.pet[0]);
  //     setPetName(pet.pet[0].name);
  //     setPetStatus(pet.pet[0].status);
  //     setPetType(pet.pet[0].type);
  //     setPetBreed(pet.pet[0].breed);
  //     setPetColor(pet.pet[0].color);
  //     setPetHeight(pet.pet[0].height);
  //     setPetWeight(pet.pet[0].weight);
  //     setPetHypoallergenic(pet.pet[0].hypoallergenic);
  //     setPetDiet(pet.pet[0].diet);
  //     setPetBio(pet.pet[0].bio);
  //     setPetPicURL(pet.pet[0].picture_url);
  //     console.log(pet.pet[0]);
  //   } catch (error) {
  //     console.log(error);
  //   }
  // };

  const submitPet = async (data) => {
    try {
      const editedPet = await updatePet(id, data, auth.token);
      setPet(editedPet.pet);
    } catch (error) {
      console.log(error);
    }
  };

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
                  required: false,
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
              className="form-control"
              type="file"
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
          </div>
        </div>
      </form>
    </>
  );
};

export default AdminEditPet;
