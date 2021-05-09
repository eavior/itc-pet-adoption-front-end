import React from 'react';
import Modal from 'react-modal';
import { useEffect, useState, useRef } from 'react';
import { useAuth } from '../context/auth';
import { getOwnedPets, deleteUser, updateUserRole } from '../lib/api';
import PetListResult from './PetListResult';

const AdminUserItem = (props) => {
  const auth = useAuth();
  const { item } = props;
  const [ownedPets, setOwnedPets] = useState({});
  const isMounted = useRef(false);
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    isMounted.current = true;
    loadOwnedPets();
    return () => {
      isMounted.current = false;
    };
  }, []);

  const loadOwnedPets = async () => {
    try {
      const pets = await getOwnedPets(item.id, auth.token);
      setOwnedPets(pets.owned);
    } catch (error) {}
  };

  const deleteUserAccount = async () => {
    try {
      const createdPet = await deleteUser(item.id, auth.token);
      alert('This user account has been deleted');
    } catch (error) {
      alert(error);
    }
  };

  const makeAdmin = async () => {
    try {
      const update = 'admin';
      const makeAdminResult = await updateUserRole(item.id, update, auth.token);
      if (makeAdminResult.role === 'admin')
        alert(`${item.first_name} ${item.last_name} has now admin rights`);
    } catch (error) {
      alert(error);
    }
  };

  const modalStyle = {
    overlay: {
      position: 'fixed',
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      backgroundColor: 'rgba(224, 224, 224, 0.75)',
      backdropFilter: 'blur(5px)',
    },
    content: {
      position: 'absolute',
      top: '80px',
      left: '20%',
      right: '20%',
      bottom: '20px',
      border: '1px solid #ccc',
      background: '#fff',
      backdropFilter: 'blur(5px)',
      overflow: 'auto',
      WebkitOverflowScrolling: 'touch',
      borderRadius: '4px',
      outline: 'none',
      padding: '20px',
    },
  };

  return (
    <>
      <button
        type="button"
        onClick={() => setShowModal(true)}
        className="list-group-item list-group-item-action btn btn-outline-info shadow-sm p-1 ms-3 mb-0 w-75 bg-body border rounded">
        {item.first_name} {item.last_name}{' '}
        {item.role === 'admin' && (
          <span className="fw-bold">(administrator)</span>
        )}
      </button>
      <Modal
        closeTimeoutMS={200}
        isOpen={showModal}
        contentLabel="modal"
        style={modalStyle}
        onRequestClose={() => setShowModal(false)}
        ariaHideApp={false}>
        <button
          type="button"
          className="btn-close float-end"
          aria-label="Close"
          onClick={() => setShowModal(false)}></button>
        <div>
          {item.first_name} {item.last_name} | Phone number: {item.phone_number}{' '}
          | Email: <a href="mailto: ${item.email}">{item.email}</a>{' '}
        </div>
        <br></br>
        {/* <button
          type="button"
          className="btn btn-danger"
          onClick={() => deleteUserAccount()}>
          Delete this user account
        </button>
        <span>&nbsp;&nbsp;&nbsp;</span>
        <button
          type="button"
          className="btn btn-warning"
          onClick={() => makeAdmin()}>
          Assign admin rights
        </button> */}
        <br></br>
        <br></br>

        <div className="card">
          <div className="card-body">
            {ownedPets.length > 0 && (
              <PetListResult
                petList={ownedPets}
                onCloseModal={() => setShowModal(false)}
              />
            )}
            {ownedPets.length === 0 && (
              <div>
                {item.first_name} {item.last_name} doesn't have any adopted or
                fostered pet.
              </div>
            )}
          </div>
        </div>
      </Modal>
    </>
  );
};

export default AdminUserItem;
