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
  let { id } = useParams();
  const auth = useAuth();
  const [pet, setPet] = useState({});
  const [isOnUserSaveList, setIsOnUserSaveList] = useState(false);
  const [petPicURL, setPetPicURL] = useState(pet.picture_url);

  const isMounted = useRef(false);

  useEffect(() => {
    isMounted.current = true;
    loadPetById();
    loadSavedStatus();

    return () => {
      isMounted.current = false;
    };
  }, []);

  const loadPetById = async () => {
    try {
      getPetById(id, auth.token).then((data) => {
        setPet(data);
        if (!data.picture_url) {
          if (data.type === 'dog') setPetPicURL('../dog.png');
          if (data.type === 'cat') setPetPicURL('../cat.png');
        }
      });
    } catch (error) {
      console.log(error);
    }
  };

  const loadSavedStatus = async () => {
    try {
      getSaveStatus(id, auth.userId, auth.token).then((data) => {
        if (data.savedStatus.length > 0) setIsOnUserSaveList(true);
        if (data.savedStatus.length === 0) setIsOnUserSaveList(false);
      });
    } catch (error) {
      console.log(error);
    }
  };

  const petAdoption = async (petId, status) => {
    const adoptionUpdate = { status: status };
    try {
      const adoptedPet = await adoptPet(petId, adoptionUpdate, auth.token);
      loadPetById();
      loadSavedStatus();
    } catch (error) {
      console.log(error);
    }
  };

  const addToSaveList = async (petId) => {
    try {
      const savedPet = await savePet(petId, auth.token);
      loadPetById();
      loadSavedStatus();
    } catch (error) {
      console.log(error);
    }
  };

  const removeFromSaveList = async (petId) => {
    try {
      const removedPet = await removePet(petId, auth.token);
      loadPetById();
      loadSavedStatus();
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <div className="card mb-3">
        <div className="row g-0">
          <div className="col-md-4">
            <img
              src={petPicURL}
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
                  onClick={() => petAdoption(pet.id, 'Adopted')}>
                  Adopt {pet.name}
                </button>
              )}
              {pet.status === 'Available' && (
                <button
                  className="btn btn-primary float-end ms-2"
                  onClick={() => petAdoption(pet.id, 'Fostered')}>
                  Foster {pet.name}
                </button>
              )}
              {pet.status !== 'Available' && pet.owner_id === auth.userId && (
                <button
                  className="btn btn-primary float-end ms-2"
                  onClick={() => petAdoption(pet.id, 'Available')}>
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
