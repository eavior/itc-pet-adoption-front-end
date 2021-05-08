import React from 'react';
import AdminUserItem from './AdminUserItem';

const AdminUserList = (props) => {
  const { userList } = props;

  const allUsers =
    userList === 'undefined' || userList.length < 1 ? (
      <div>There are no Users in the list</div>
    ) : (
      <div className="row row-cols-1 row-cols-md-auto g-4">
        {userList.map((item) => {
          return (
            <AdminUserItem
              key={item.id}
              item={item}
              index={userList.indexOf(item)}
            />
          );
        })}
      </div>
    );

  return (
    <>
      <div>
        <div className="list-group">{allUsers}</div>
      </div>
    </>
  );
};

export default AdminUserList;
