import React from 'react';
import { useEffect, useState, useRef } from 'react';
import UserItem from './UserItem';
import Accordion from 'react-bootstrap/Accordion';

const UsersList = (props) => {
  // console.log(props.users.length);
  const { users } = props;
  const [noUsers, setNoUsers] = useState(null);
  const isMounted = useRef(false);

  useEffect(() => {
    isMounted.current = true;
    props.users.length <= 1 ? setNoUsers(true) : setNoUsers(false);
    return () => {
      isMounted.current = false;
    };
  }, [props.users.length]);

  const noUsersMessage = <div>There are no registered users.</div>;

  const allUsers = (
    <div className="">
      {users.map((item) => {
        return <UserItem key={item.id} item={item} />;
      })}
    </div>
  );

  return (
    <>
      {noUsers && noUsersMessage}
      {!noUsers && <Accordion defaultActiveKey="5">{allUsers}</Accordion>}
    </>
  );
};

export default UsersList;
