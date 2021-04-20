import React from 'react';
// import { useEffect, useState, useRef } from 'react';
import { NavLink } from 'react-router-dom';
import Accordion from 'react-bootstrap/Accordion';
import Card from 'react-bootstrap/Card';

const AdminUserItem = (props) => {
  const { item, index } = props;
  console.log(item.id);
  console.log(index);

  return (
    <>

<p className="mb-0 mt-3">
  <a className="btn btn-primary mb-0" data-toggle="collapse" href={`#collapseExample${index}`} role="button" aria-expanded="false" aria-controls={`collapseExample${index}`}>
    {item.first_name} {item.last_name} {item.admin && '(administrator)'}
  </a>
  {/* <button className="btn btn-primary" type="button" data-toggle="collapse" data-target="#collapseExample" aria-expanded="false" aria-controls="collapseExample">
    Button with data-target
  </button> */}
</p>
<div className="collapse mt-0" id={`collapseExample${index}`}>
  <div className="card card-body">
    <span>{item.first_name} {item.last_name} {item.admin && '(administrator)'}</span>
    <span>Clicking on a user should display all the pets that the user owns along with all of their profile details so the administrators can contact the user.</span>
  </div>
</div>

{/* <div className="card">
          <div className="card-header" id={`heading${index}`}>
            <h5 className="mb-0">
              <button
                className="btn btn-link"
                type="button"
                data-toggle="collapse"
                data-target={`#collapse${index}`}
                aria-expanded="false"
                aria-controls={`heading${index}`}>
                {item.first_name} {item.last_name} {item.admin && '(administrator)'}
              </button>
            </h5>
          </div>
          <div
            id={`collapse${index}`}
            className="collapse"
            aria-labelledby={`heading${index}`}
            data-parent="#accordionExample">
            <div className="card-body">
              Clicking on a user should display all the pets that the user owns along with all of their profile details so the administrators can contact the user. 
            </div>
          </div>
        </div> */}
    </>
  );
};

export default AdminUserItem;