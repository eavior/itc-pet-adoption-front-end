// import React from 'react';
// import PetItem from './PetItem';

// const MySavedPetsList = (props) => {
//   const { savedPets, onRefresh } = props;

//   const savedPetsList =
//     savedPets.length < 1 ? (
//       <div>
//         You haven't saved a pet yet. Go to the pet gallery or use the search
//         function to find pets.
//       </div>
//     ) : (
//       <div className="row row-cols-1 row-cols-md-auto g-4">
//         {savedPets.map((item) => {
//           return (
//             <PetItem key={item.id} item={item} onRefresh={() => onRefresh()} />
//           );
//         })}
//       </div>
//     );

//   return (
//     <>
//       <div>{savedPetsList} </div>
//     </>
//   );
// };

// export default MySavedPetsList;
