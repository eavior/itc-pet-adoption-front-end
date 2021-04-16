import React from 'react';
import { useEffect, useState, useRef } from 'react';
import UserItem from './UserItem';
import Accordion from 'react-bootstrap/Accordion';
import Card from 'react-bootstrap/Card';

const UsersList = (props) => {
  // console.log(props.users.length);
  console.log(props.users);
  const { users } = props;
  const [noUsers, setNoUsers] = useState(null);
  const [toggle, setToggle] = useState(null);
  const isMounted = useRef(false);
  const [amountToShow, setAmountToShow] = useState(10);
  // const [users, setUsers] = useState([]);
  const [lastKey, setLastKey] = useState('');
  const [nextTweets_loading, setNextTweetsLoading] = useState(false);

  useEffect(() => {
    isMounted.current = true;
    props.users.length <= 1 ? setNoUsers(true) : setNoUsers(false);
    return () => {
      isMounted.current = false;
    };
  }, []);

  const noUsersMessage = <div>There are no registered users.</div>;

  const allUsers = (
    <div className="block">
      {users.map((item) => {
        return <UserItem key={item.id} item={item} />;
      })}
    </div>
  );

  console.log(allUsers);

  return (
    <>
      <Accordion className="block" defaultActiveKey="5">
        {allUsers}
      </Accordion>
    </>
  );
};

export default UsersList;
