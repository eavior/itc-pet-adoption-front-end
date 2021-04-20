import React from 'react';
import { useEffect, useState, useRef } from 'react';
import AddPet from './AdminAddPet';
import UsersList from './AdminstUserList';
// import { useAccordionToggle } from 'react-bootstrap/AccordionToggle';
import Accordion from 'react-bootstrap/Accordion';
import Card from 'react-bootstrap/Card';

import { getPets, getUsers } from '../lib/api';
import AdminPetList from './AdminPetList';

const AdminDashboard = (props) => {
  const { users } = props;
  const [petList, setPetList] = useState([]);
  const [userList, setUserList] = useState([]);
  const isMounted = useRef(false);

  useEffect(() => {
    isMounted.current = true;
    loadPets();
    loadUsers();
    return () => {
      isMounted.current = false;
    };
  }, []);

  const loadPets = async () => {
    try {
      const pets = await getPets();
      setPetList(pets.pet);
    } catch (error) {
      console.log(error);
    }
  };

  const loadUsers = async () => {
    try {
      const users = await getUsers();
      setUserList(users.user);
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
                User list
              </button>
            </h5>
          </div>

          <div
            id="collapseOne"
            className="collapse"
            aria-labelledby="headingOne"
            data-parent="#accordionExample">
            <div className="card-body">
              <UsersList userList={userList} />
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
                Pet List
              </button>
            </h5>
          </div>
          <div
            id="collapseTwo"
            className="collapse"
            aria-labelledby="headingTwo"
            data-parent="#accordionExample">
            <div className="card-body">
              <AdminPetList petList={petList} />
            </div>
          </div>
        </div>
        <div className="card">
          <div className="card-header" id="headingThree">
            <h5 className="mb-0">
              <button
                className="btn btn-link collapsed"
                type="button"
                data-toggle="collapse"
                data-target="#collapseThree"
                aria-expanded="false"
                aria-controls="collapseThree">
                Add a pet
              </button>
            </h5>
          </div>
          <div
            id="collapseThree"
            className="collapse"
            aria-labelledby="headingThree"
            data-parent="#accordionExample">
            <div className="card-body">
              <AddPet />
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default AdminDashboard;
