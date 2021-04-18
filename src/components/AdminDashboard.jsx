import React from 'react';
// import { useEffect, useState, useRef } from 'react';
import AddPet from './AdminAddPet';
import UsersList from './UsersList';
// import { useAccordionToggle } from 'react-bootstrap/AccordionToggle';
import Accordion from 'react-bootstrap/Accordion';
import Card from 'react-bootstrap/Card';

const AdminDashboard = (props) => {
  const { users } = props;

  // const isMounted = useRef(false);

  // useEffect(() => {
  //   isMounted.current = true;

  //   return () => {
  //     isMounted.current = false;
  //   };
  // }, []);

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
          <Card.Body>List of all pets + edit function (SQL)</Card.Body>
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
  );
};

export default AdminDashboard;
