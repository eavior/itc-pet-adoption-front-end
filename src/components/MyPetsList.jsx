import React from 'react';
import { useEffect, useState, useRef } from 'react';
import PetItem from './PetItem';
import { useAuth } from '../context/auth';
import { getOwnedPets, getSavedPets } from '../lib/api';

const MyPetsList = (props) => {
  const isMounted = useRef(false);
  const { currentUserId, ownedPets, savedPets } = props;
  const auth = useAuth();
  // const [ownedPets, setOwnedPets] = useState({});
  // const [savedPets, setSavedPets] = useState({});
  const [errorMessage, setErrorMessage] = useState('');
  const [noOwnedPets, setNoOwnedPets] = useState(null);
  const [noSavedPets, setNoSavedPets] = useState(null);

  // useEffect(() => {
  //   isMounted.current = true;
  //   // console.log(props);
  //   // loadOwnedPets();
  //   // loadSavedPets();
  //   // console.log(ownedPets.length);
  //   // console.log(savedPets.length);

  //   // console.log(ownedPets);
  //   // console.log(savedPets);

  //   // ownedPets.length <= 1 ? setNoOwnedPets(true) : setNoOwnedPets(false);
  //   // savedPets.length <= 1 ? setNoSavedPets(true) : setNoSavedPets(false);

  //   return () => {
  //     isMounted.current = false;
  //   };
  // }, [ownedPets.length, savedPets.length]);

  useEffect(() => {
    console.log(props);
    // loadOwnedPets
    //   .then((data) => {
    //     setFlag(!!data);
    //   })
    //   .catch((e) => {
    //     console.log(e);
    //   })
    //   .finally(() => {
    //     setIsAuthenticating(false);
    //   });
  }, [props]);

  useEffect(() => {
    console.log(props);
    console.log(ownedPets);
    // loadOwnedPets
    //   .then((data) => {
    //     setFlag(!!data);
    //   })
    //   .catch((e) => {
    //     console.log(e);
    //   })
    //   .finally(() => {
    //     setIsAuthenticating(false);
    //   });
  });

  // useEffect(() => {
  //   isMounted.current = true;

  //   return () => {
  //     isMounted.current = false;
  //   };
  // }, [ownedPets.length, savedPets.length]);

  // const loadOwnedPets = async () => {
  //   try {
  //     getOwnedPets(auth.token).then((data) => {
  //       setOwnedPets(data.owned);
  //     });
  //   } catch (error) {
  //     setErrorMessage(
  //       `${error.response.data.message} (status ${error.response.status} ${error.response.statusText})`
  //     );
  //   }
  // };

  // const loadSavedPets = async () => {
  //   try {
  //     getSavedPets(auth.token).then((data) => {
  //       setSavedPets(data.saved);
  //     });
  //   } catch (error) {
  //     setErrorMessage(
  //       `${error.response.data.message} (status ${error.response.status} ${error.response.statusText})`
  //     );
  //   }
  // };

  // const [toggle, setToggle] = useState(null);

  // const [amountToShow, setAmountToShow] = useState(10);
  // const [pets, setPets] = useState([]);
  // const [lastKey, setLastKey] = useState('');

  // useEffect(() => {
  //   isMounted.current = true;
  //   pets.length <= 1 ? setNoPets(true) : setNoPets(false);
  //   return () => {
  //     isMounted.current = false;
  //   };
  // }, [pets.length]);

  const noOwnedPetsMessage = (
    <div>You don't have any adopted or fostered pets yet. </div>
  );

  const noSavedPetsMessage = <div>You don't have any saved pets yet. </div>;

  // const petsOfCurrentUser = pets.filter((x) => x.ownerID === currentUser.id);

  // const allOwnedPets = (
  //   <div className="row row-cols-1 row-cols-md-auto g-4">
  //     {ownedPets.map((item) => {
  //       return <PetItem key={item.id} item={item} currentUser={currentUser} />;
  //     })}
  //   </div>
  // );

  // // const savedPetIDs = currentUser.savedPets;

  // // const petsSavedByCurrentUser = pets.filter(function (item) {
  // //   return savedPetIDs.includes(item.id);
  // // });

  // const allSavedPets = (
  //   <div className="row row-cols-1 row-cols-md-auto g-4">
  //     {savedPets.map((item) => {
  //       return <PetItem key={item.id} item={item} currentUser={currentUser} />;
  //     })}
  //   </div>
  // );

  const myOwnedPets =
    ownedPets.length < 1 ? (
      <div>There are no pets in the list</div>
    ) : (
      <div className="row row-cols-1 row-cols-md-auto g-4">
        {ownedPets.map((item) => {
          return (
            <PetItem
              key={item.id}
              item={item}
              // onLoadPets={() => onLoadPets()}
            />
          );
        })}
      </div>
    );

  // const myOwnedPets = async () => {
  //   if (ownedPets.length > 1) return <div>There are no pets in the list</div>;
  //   else
  //     return (
  //       <div className="row row-cols-1 row-cols-md-auto g-4">
  //         {ownedPets.map((item) => {
  //           return (
  //             <PetItem
  //               key={item.id}
  //               item={item}
  //               // onLoadPets={() => onLoadPets()}
  //             />
  //           );
  //         })}
  //       </div>
  //     );
  // };

  const mySavedPets =
    savedPets.length < 1 ? (
      <div>There are no pets in the list</div>
    ) : (
      <div className="row row-cols-1 row-cols-md-auto g-4">
        {savedPets.map((item) => {
          return (
            <PetItem
              key={item.id}
              item={item}
              // onLoadPets={() => onLoadPets()}
            />
          );
        })}
      </div>
    );

  return (
    <>
      <div id="accordion">
        <div className="card">
          <div className="card-header" id="headingOne">
            <h5 className="mb-0">
              <button
                className="btn btn-link"
                data-toggle="collapse"
                data-target="#collapseOne"
                aria-expanded="true"
                aria-controls="collapseOne">
                Your adopted and/or fostered pets
              </button>
            </h5>
          </div>

          <div
            id="collapseOne"
            className="collapse show"
            aria-labelledby="headingOne"
            data-parent="#accordion">
            <div className="card-body">
              <div>{myOwnedPets}</div>
            </div>
          </div>
        </div>
        <div className="card">
          <div className="card-header" id="headingTwo">
            <h5 className="mb-0">
              <button
                className="btn btn-link collapsed"
                data-toggle="collapse"
                data-target="#collapseTwo"
                aria-expanded="false"
                aria-controls="collapseTwo">
                Your saved pets
              </button>
            </h5>
          </div>
          <div
            id="collapseTwo"
            className="collapse"
            aria-labelledby="headingTwo"
            data-parent="#accordion">
            <div className="card-body">
              <div>{mySavedPets}</div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default MyPetsList;
