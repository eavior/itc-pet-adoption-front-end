import React from 'react';
import { useEffect, useState, useRef } from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  NavLink,
} from 'react-router-dom';
import Accordion from 'react-bootstrap/Accordion';
import Card from 'react-bootstrap/Card';

const UserItem = (props) => {
  console.log(props);
  const { item } = props;
  // const { item } = props;
  const [displayName, setdisplayName] = useState(null);
  const isMounted = useRef(false);

  useEffect(() => {
    isMounted.current = true;

    return () => {
      isMounted.current = false;
    };
  }, []);

  let imageURL = '../public/bird.jpeg';

  return (
    <>
      <Card>
        <Accordion.Toggle as={Card.Header} eventKey={item.id}>
          {item.name}
        </Accordion.Toggle>
        <Accordion.Collapse eventKey={item.id}>
          <Card.Body>
            <div>Contact information + pets</div>
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
