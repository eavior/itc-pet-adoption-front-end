import React from 'react';
import { useEffect, useState, useRef } from 'react';
import AddPet from './AdminAddPet';
import UsersList from './UsersList';
import { useAccordionToggle } from 'react-bootstrap/AccordionToggle';
import Accordion from 'react-bootstrap/Accordion';
import Card from 'react-bootstrap/Card';

const AdminDashboard = (props) => {
  const { users } = props;
  const [displayName, setdisplayName] = useState(null);
  const isMounted = useRef(false);

  useEffect(() => {
    isMounted.current = true;

    return () => {
      isMounted.current = false;
    };
  }, []);

  console.log(users);

  return (
    <Accordion defaultActiveKey="5">
      <Card>
        <Accordion.Toggle as={Card.Header} eventKey="0">
          User list
        </Accordion.Toggle>
        <Accordion.Collapse eventKey="0">
          <Card.Body>
            <UsersList users={users} />
          </Card.Body>
        </Accordion.Collapse>
      </Card>
      <Card>
        <Accordion.Toggle as={Card.Header} eventKey="1">
          Pet list
        </Accordion.Toggle>
        <Accordion.Collapse eventKey="1">
          <Card.Body>Hello! I'm another body</Card.Body>
        </Accordion.Collapse>
      </Card>
      <Card>
        <Accordion.Toggle as={Card.Header} eventKey="2">
          Add a pet
        </Accordion.Toggle>
        <Accordion.Collapse eventKey="2">
          <Card.Body>
            <AddPet />
          </Card.Body>
        </Accordion.Collapse>
      </Card>
    </Accordion>
    /* <div id="accordion">
        <div className="card">
          <div className="card-header" id="headingOne">
            <h5 className="mb-0">
              <button
                className="btn btn-link"
                data-toggle="collapse"
                data-target="#collapseOne"
                aria-expanded="true"
                aria-controls="collapseOne">
                User list
              </button>
            </h5>
          </div>
          <div
            id="collapseOne"
            className="collapse show"
            aria-labelledby="headingOne"
            data-parent="#accordion">
            <div className="card-body">
              <UsersList users={users} />
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
                Pets list
              </button>
            </h5>
          </div>
          <div
            id="collapseTwo"
            className="collapse"
            aria-labelledby="headingTwo"
            data-parent="#accordion">
            <div className="card-body">
              <p>add a pet</p>
            </div>
          </div>
        </div>

        <div className="card">
          <div className="card-header" id="headingThree">
            <h5 className="mb-0">
              <button
                className="btn btn-link collapsed"
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
            data-parent="#accordion">
            <div className="card-body">
              <p>add a pet</p>
              <AddPet />
            </div>
          </div>
        </div>
      </div> */
    /* <div>
        <UsersList users={users} />
        This is the admin dashboard
        <br />
        <br />
        Components: <br />
        List of all the users in the database (pet owners and administrators){' '}
        <br />
        Clicking on a user should display all the pets that the user owns along
        with all of their profile details so the administrators can contact the
        user. <br />
        List of all pets and ability to go to the pet page and edit. (The edit
        should be just like adding a pet but with the details already displayed
        there)
        <br />
        <AddPet />
      </div> */
  );
};

export default AdminDashboard;
