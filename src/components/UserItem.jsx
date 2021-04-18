import React from 'react';
// import { useEffect, useState, useRef } from 'react';
import { NavLink } from 'react-router-dom';
import Accordion from 'react-bootstrap/Accordion';
import Card from 'react-bootstrap/Card';

const UserItem = (props) => {
  const { item } = props;
  // const isMounted = useRef(false);

  // useEffect(() => {
  //   isMounted.current = true;

  //   return () => {
  //     isMounted.current = false;
  //   };
  // }, []);

  return (
    <>
      <Card>
        <Accordion.Toggle as={Card.Header} eventKey={item.id}>
          {item.firstName} {item.lastName} {item.admin && '(Administrator)'}
        </Accordion.Toggle>
        <Accordion.Collapse eventKey={item.id}>
          <Card.Body>
            <div>
              Contact information: {item.email} {item.phoneNumber}
            </div>
            <div>List of owned animals (SQL)</div>
            <NavLink
              className="nav-link"
              activeClassName="selected"
              to={`/user/${item.id}`}>
              {item.name}
            </NavLink>
          </Card.Body>
        </Accordion.Collapse>
      </Card>
    </>
  );
};

export default UserItem;
