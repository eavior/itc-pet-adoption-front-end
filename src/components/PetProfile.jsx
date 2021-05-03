import React from 'react';
import { useRef, useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { getPetById } from '../lib/api';
import { useAuth } from '../context/auth';

const PetProfile = (props) => {
  const { pets, currentUserId } = props;

  console.log(currentUserId);
  // We can use the `useParams` hook here to access
  // the dynamic pieces of the URL.
  let { id } = useParams();
  const auth = useAuth();
  const [pet, setPet] = useState({});
  const [isOnUserSaveList, setIsOnUserSaveList] = useState(false);

  const isMounted = useRef(false);

  // let pet = pets.filter((x) => x.id === +id)[0];

  console.log('test');

  useEffect(() => {
    isMounted.current = true;
    console.log(id);
    console.log(auth.token);
    getPetById(id, auth.token).then((data) => {
      console.log(data);
      setPet(data);
      console.log(data);
    });
    return () => {
      isMounted.current = false;
    };
  }, []);

  // const petsOfCurrentUser = pets.filter((x) => x.ownerID === currentUser.id);

  // const isCurrentUserOwner = () => {
  //   find current petID in array petsOfCurrentUser; do through SQL
  // };

  return (
    <>
      <div>Test</div>
      <div className="card mb-3">
        <div className="row g-0">
          <div className="col-md-4">
            <img
              src={pet.picture_url}
              alt="..."
              className="img-fluid"
              style={{ height: '15rem', width: '30rem', objectFit: 'contain' }}
            />
          </div>
          <div className="col-md-4">
            <div className="card-body">
              <h5 className="card-title">{pet.name}</h5>
              <div className="card-text">
                <ul>
                  <li>Type: {pet.type}</li>
                  <li>Breed: {pet.breed}</li>
                  <li>Color: {pet.color}</li>
                  <li>Height: {pet.height} cm</li>
                  <li>Weight: {pet.weight} kg</li>
                  <li>Hypoallergenic: {pet.hypoallergenic}</li>
                  <li>Dietary restrictions: {pet.diet}</li>
                </ul>
              </div>
            </div>
          </div>
          <div className="col-md-4">
            <div className="card-body">
              <h5 className="card-title">Biography: </h5>
              <p className="card-text">{pet.bio}</p>
            </div>
          </div>
          <div className="card-footer">
            <p className="card-text">
              <small className="text-muted float-start">
                Adoption status: {pet.status}
              </small>
              {pet.status === 'Available' && (
                <button className="btn btn-primary float-end ms-2">
                  Adopt {pet.name}
                </button>
              )}
              {pet.status === 'Available' && (
                <button className="btn btn-primary float-end ms-2">
                  Foster {pet.name}
                </button>
              )}
              {!isOnUserSaveList && (
                <button className="btn btn-primary float-end ms-2">
                  Save {pet.name} to your 'saved pets' list
                </button>
              )}
            </p>
          </div>
        </div>
      </div>
    </>
  );
};

export default PetProfile;
