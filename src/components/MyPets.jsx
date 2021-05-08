import React from 'react';
import { useEffect, useState, useRef } from 'react';
import { getOwnedPets, getSavedPets } from '../lib/api';
import { useAuth } from '../context/auth';
import MyOwnedPetsList from './MyOwnedPetsList';
import MySavedPetsList from './MySavedPetsList';

const MyPets = () => {
  const auth = useAuth();
  const [ownedPets, setOwnedPets] = useState({});
  const [savedPets, setSavedPets] = useState({});
  const isMounted = useRef(false);

  useEffect(() => {
    isMounted.current = true;
    loadOwnedPets();
    loadSavedPets();
    return () => {
      isMounted.current = false;
    };
  }, []);

  const loadOwnedPets = async () => {
    try {
      const pets = await getOwnedPets(auth.userId, auth.token);
      setOwnedPets(pets.owned);
    } catch (error) {
      console.log(error);
    }
  };

  const loadSavedPets = async () => {
    try {
      const pets = await getSavedPets(auth.userId, auth.token);
      setSavedPets(pets.saved);
    } catch (error) {
      console.log(error);
    }
  };

  const refresh = async () => {
    try {
      loadOwnedPets();
      loadSavedPets();
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <div className="accordion" id="accordionExample">
        <div className="card">
          <div className="card-header" id="headingOne">
            <h5 className="mb-0">
              <button
                className="btn btn-link"
                type="button"
                data-toggle="collapse"
                data-target="#collapseOne"
                aria-expanded="false"
                aria-controls="collapseOne">
                Adopted or fostered pets
              </button>
            </h5>
          </div>

          <div
            id="collapseOne"
            className="collapse"
            aria-labelledby="headingOne"
            data-parent="#accordionExample">
            <div className="card-body">
              {ownedPets.length > 0 && (
                <MyOwnedPetsList
                  ownedPets={ownedPets}
                  onRefresh={() => refresh()}
                />
              )}
              {ownedPets.length === 0 && (
                <div>You do not own a pet yet. Please foster or adopt one.</div>
              )}
            </div>
          </div>
        </div>
        <div className="card">
          <div className="card-header" id="headingTwo">
            <h5 className="mb-0">
              <button
                className="btn btn-link collapsed"
                type="button"
                data-toggle="collapse"
                data-target="#collapseTwo"
                aria-expanded="false"
                aria-controls="collapseTwo">
                Saved pets
              </button>
            </h5>
          </div>
          <div
            id="collapseTwo"
            className="collapse"
            aria-labelledby="headingTwo"
            data-parent="#accordionExample">
            <div className="card-body">
              {savedPets.length > 0 && (
                <MySavedPetsList
                  savedPets={savedPets}
                  onRefresh={() => refresh()}
                />
              )}
              {savedPets.length === 0 && (
                <div>
                  You haven't saved a pet yet. Go to the pet gallery or use the
                  search function to find pets.
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default MyPets;
