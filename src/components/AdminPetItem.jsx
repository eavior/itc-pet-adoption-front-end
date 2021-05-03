import React from 'react';
import Modal from 'react-modal';
import { useState, useRef } from 'react';
import Login from './Login';
import AdminEditPet from './AdminEditPet';

const AdminPetItem = (props) => {
  const { item } = props;
  const [showModal, setShowModal] = useState(false);

  const modalStyle = {
    overlay: {
      position: 'fixed',
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      backgroundColor: 'rgba(224, 224, 224, 0.75)',
      // boxShadow: 'inset 0 0 2000px rgba(255, 255, 255, .5)',
      // backgroundColor: 'rgba(255, 255, 255, .15)',
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
      // backgroundColor: 'rgba(255, 255, 255, .15)',
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
      {/* <li>
        <a href={`/pets/edit/${item.id}`}>
          {item.name} | {item.type} | {item.status}
        </a>
      </li> */}
      <button
        type="button"
        // href={`/pets/edit/${item.id}`}
        onClick={() => setShowModal(true)}
        className="list-group-item list-group-item-action btn btn-outline-info shadow-sm p-1 ms-3 mb-0 w-75 bg-body border rounded">
        {item.name} | {item.type} | {item.status}
      </button>
      <Modal
        closeTimeoutMS={200}
        isOpen={showModal}
        // shouldCloseOnOverlayClick={true}
        contentLabel="modal"
        style={modalStyle}
        onRequestClose={() => setShowModal(false)}
        ariaHideApp={false}>
        <button
          type="button"
          className="btn-close float-end"
          aria-label="Close"
          onClick={() => setShowModal(false)}></button>
        <AdminEditPet id={item.id} onCloseModal={() => setShowModal(false)} />
      </Modal>
    </>
  );
};

export default AdminPetItem;
