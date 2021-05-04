import React from 'react';
import { useRef, useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import {
  getPetById,
  adoptPet,
  savePet,
  removePet,
  getSaveStatus,
} from '../lib/api';
import { useAuth } from '../context/auth';

const PetProfile = (props) => {
  const { currentUserId } = props;
  console.log(props);
  // We can use the `useParams` hook here to access
  // the dynamic pieces of the URL.
  let { id } = useParams();
  const auth = useAuth();
  const [pet, setPet] = useState({});
  const [isOnUserSaveList, setIsOnUserSaveList] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [userId, setUserId] = useState(currentUserId);

  const isMounted = useRef(false);

  // let pet = pets.filter((x) => x.id === +id)[0];

  useEffect(() => {
    isMounted.current = true;
    console.log(userId);
    console.log(currentUserId);
    console.log(id);
    loadPetById().then(loadSavedStatus());
    return () => {
      isMounted.current = false;
    };
  }, []);

  useEffect(() => {
    if (errorMessage) alert(errorMessage);
  }, [errorMessage]);

  useEffect(() => {
    if (!userId) setUserId(currentUserId);
    console.log(userId);
  }, [currentUserId]);

  const loadPetById = async () => {
    try {
      getPetById(id, auth.token).then((data) => {
        setPet(data);
      });
    } catch (error) {
      setErrorMessage(
        `${error.response.data.message} (status ${error.response.status} ${error.response.statusText})`
      );
    }
  };

  const loadSavedStatus = async () => {
    try {
      getSaveStatus(id, currentUserId, auth.token).then((data) => {
        console.log(data.savedStatus.length);
        if (data.savedStatus.length > 0) setIsOnUserSaveList(true);
        if ((data.savedStatus.length = 0)) setIsOnUserSaveList(false);
        // setPet(data);
      });
    } catch (error) {
      setErrorMessage(
        `${error.response.data.message} (status ${error.response.status} ${error.response.statusText})`
      );
    }
  };

  // const petsOfCurrentUser = pets.filter((x) => x.ownerID === currentUser.id);

  // const isCurrentUserOwner = () => {
  //   find current petID in array petsOfCurrentUser; do through SQL
  // };

  const petAdoption = async (petId, userId, status) => {
    const adoptionUpdate = { userId: userId, status: status };
    // console.log('pet' + petId + 'user' + userId + 'type' + typeOfCare);
    try {
      const adoptedPet = await adoptPet(petId, adoptionUpdate, auth.token);
      console.log(adoptedPet);
      loadPetById();
      loadSavedStatus();
    } catch (error) {
      setErrorMessage(
        `${error.response.data.message} (status ${error.response.status} ${error.response.statusText})`
      );
    }
  };

  const addToSaveList = async (petId, userId) => {
    try {
      const savedPet = await savePet(petId, userId, auth.token);
      console.log(savedPet);
      loadPetById();
    } catch (error) {
      setErrorMessage(
        `${error.response.data.message} (status ${error.response.status} ${error.response.statusText})`
      );
    }
  };

  const removeFromSaveList = async (petId, userId) => {
    try {
      const removedPet = await removePet(petId, userId, auth.token);
      console.log(removedPet);
      loadPetById();
    } catch (error) {
      setErrorMessage(
        `${error.response.data.message} (status ${error.response.status} ${error.response.statusText})`
      );
    }
  };

  return (
    <>
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
                <button
                  className="btn btn-primary float-end ms-2"
                  onClick={() => petAdoption(pet.id, currentUserId, 'Adopted')}>
                  Adopt {pet.name}
                </button>
              )}
              {pet.status === 'Available' && (
                <button
                  className="btn btn-primary float-end ms-2"
                  onClick={() =>
                    petAdoption(pet.id, currentUserId, 'Fostered')
                  }>
                  Foster {pet.name}
                </button>
              )}
              {pet.status !== 'Available' && (
                <button
                  className="btn btn-primary float-end ms-2"
                  onClick={() => petAdoption(pet.id, 'Available', 'Available')}>
                  Return {pet.name}
                </button>
              )}
              {!isOnUserSaveList && (
                <button
                  className="btn btn-primary float-end ms-2"
                  onClick={() => addToSaveList(pet.id, currentUserId)}>
                  Add {pet.name} to your 'saved pets' list
                </button>
              )}
              {isOnUserSaveList && (
                <button
                  className="btn btn-primary float-end ms-2"
                  onClick={() => removeFromSaveList(pet.id, currentUserId)}>
                  Remove {pet.name} from your 'saved pets' list
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
