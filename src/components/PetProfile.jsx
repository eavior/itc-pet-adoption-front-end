import React from 'react';

import { useParams } from 'react-router-dom';
const PetProfile = (props) => {
  const { pets } = props;
  // We can use the `useParams` hook here to access
  // the dynamic pieces of the URL.
  let { id } = useParams();

  let pet = pets.filter((x) => x.id == id)[0];

  return (
    <>
      {/* <div className="row row-cols-1 row-cols-md-auto g-4">
        <div className="col">
          <div className="card" style={{ width: '12rem', height: '20rem' }}>
            <img
              src={pet.image}
              className="card-img-top"
              alt={pet.name}
              style={{ height: '6rem', objectFit: 'cover' }}
            />
            <div className="card-body">
              <h3>ID: {id}</h3>
              <h5 className="card-title">{pet.name}</h5>
              <p className="card-text">{pet.status}</p>
              <a href={`/pets/${pet.id}`} className="btn btn-primary">
                See more
              </a>
            </div>
            <div className="card-footer">
              <small className="text-muted">Last updated 3 mins ago</small>
            </div>
          </div>
        </div>
      </div>

      <div className="card mb-3">
        <img src={pet.image} className="card-img-top" alt="..." />
        <div className="card-body">
          <h5 className="card-title">Card title</h5>
          <p className="card-text">
            This is a wider card with supporting text below as a natural lead-in
            to additional content. This content is a little bit longer.
          </p>
          <p className="card-text">
            <small className="text-muted">Last updated 3 mins ago</small>
          </p>
        </div>
      </div>
      <div className="card">
        <div className="card-body">
          <h5 className="card-title">Card title</h5>
          <p className="card-text">
            This is a wider card with supporting text below as a natural lead-in
            to additional content. This content is a little bit longer.
          </p>
          <p className="card-text">
            <small className="text-muted">Last updated 3 mins ago</small>
          </p>
        </div>
        <img src={pet.image} className="card-img-bottom" alt="..." />
      </div> */}

      <div className="card mb-3">
        <div className="row g-0">
          <div className="col-md-4">
            <img
              src={pet.image}
              alt="..."
              className="img-fluid"
              style={{ height: '15rem', width: '30rem', objectFit: 'contain' }}
            />
          </div>
          <div className="col-md-4">
            <div className="card-body">
              <h5 className="card-title">{pet.name}</h5>
              <p className="card-text">
                <ul>
                  <li>Type: {pet.type}</li>
                  <li>Breed: {pet.breed}</li>
                  <li>Color: {pet.color}</li>
                  <li>Height: {pet.height} cm</li>
                  <li>Weight: {pet.weight} kg</li>
                  <li>Hypoallergenic: {pet.hypoallergenic}</li>
                  <li>Dietary restrictions: {pet.diet}</li>
                </ul>
              </p>
            </div>
          </div>
          <div className="col-md-4">
            <div className="card-body">
              <h5 className="card-title">Biography: </h5>
              <p className="card-text">{pet.bio}</p>
            </div>
          </div>
          <div className="card-footer">
            <p className="card-text">
              <small className="text-muted float-start">
                Adoption status: {pet.status}
              </small>
              <button className="btn btn-primary float-end ms-2">
                Adopt {pet.name}
              </button>
              <button className="btn btn-primary float-end ms-2">
                Foster {pet.name}
              </button>
              <button className="btn btn-primary float-end ms-2">
                Save {pet.name} to your 'saved pets' list
              </button>
            </p>
          </div>
        </div>
      </div>
    </>
  );
};

export default PetProfile;

// import React from 'react';
// import { useEffect, useState, useRef } from 'react';

// const PetItem = (props) => {
//   console.log(props);
//   const { item } = props;
//   // const { item } = props;
//   const [displayName, setdisplayName] = useState(null);
//   const isMounted = useRef(false);

//   useEffect(() => {
//     isMounted.current = true;

//     return () => {
//       isMounted.current = false;
//     };
//   }, []);

//   let imageURL = '../public/bird.jpeg';

//   return (
//     <>
//       <div className="col">
//         <div className="card" style={{ width: '12rem', height: '20rem' }}>
//           <img
//             src={item.image}
//             className="card-img-top"
//             alt={item.name}
//             style={{ height: '6rem' }}
//           />
//           <div className="card-body">
//             <h5 className="card-title">{item.name}</h5>
//             <p className="card-text">{item.status}</p>
//             <a href="#" className="btn btn-primary">
//               See more
//             </a>
//           </div>
//           <div className="card-footer">
//             <small className="text-muted">Last updated 3 mins ago</small>
//           </div>
//         </div>
//       </div>
//     </>
//   );
// };

// export default PetItem;
