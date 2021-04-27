// const currentUser = mockDB.users.filter((x) => x.id === userID)[0];

// const petsOfCurrentUser = pets.filter((x) => x.ownerID === currentUser.id);
// const allOwnedPets = (
//   <div className="row row-cols-1 row-cols-md-auto g-4">
//     {petsOfCurrentUser.map((item) => {
//       return <PetItem key={item.id} item={item} currentUser={currentUser} />;
//     })}
//   </div>
// );

// const savedPetIDs = currentUser.savedPets;
// const petsSavedByCurrentUser = pets.filter(function (item) {
//   return savedPetIDs.includes(item.id);
// });
// const allSavedPets = (
//   <div className="row row-cols-1 row-cols-md-auto g-4">
//     {petsSavedByCurrentUser.map((item) => {
//       return <PetItem key={item.id} item={item} currentUser={currentUser} />;
//     })}
//   </div>
// );

const mockDB = {
  users: [
    {
      id: 1,
      createdDate: 0,
      firstName: 'Mister',
      lastName: 'X',
      phoneNumber: '+972526858552',
      email: 'misterX@gmail.com',
      password: 'secret',
      bio: '',
      admin: false,
      savedPets: [],
    },
    {
      id: 2,
      createdDate: 0,
      firstName: 'Mrs',
      lastName: 'Y',
      phoneNumber: '+972526858552',
      email: 'mrsY@gmail.com',
      password: 'secret',
      bio: '',
      admin: false,
      savedPets: [],
    },
    {
      id: 3,
      createdDate: 0,
      firstName: 'Elisha',
      lastName: 'Avior',
      phoneNumber: '+972526858552',
      email: 'elisha.avior@gmail.com',
      password: 'secret',
      bio: '',
      admin: true,
      savedPets: [1, 4],
    },
  ],
  admins: [{}],
  pets: [
    {
      id: 1,
      createdDate: 0,
      type: 'Dog',
      name: 'Doggy',
      status: 'Available',
      breed: 'Poodle',
      color: 'Brown',
      height: 50,
      weight: 20,
      hypoallergenic: 'No',
      diet: 'No',
      bio: 'Bla bla bla bla bla',
      image: '../petImages/dog.jpeg',
      ownerID: null,
    },
    {
      id: 2,
      createdDate: 0,
      type: 'Cat',
      name: 'Catty',
      status: 'Fostered',
      breed: 'Poodle',
      color: 'Brown',
      height: 50,
      weight: 20,
      hypoallergenic: 'No',
      diet: 'No',
      bio: 'Bla bla bla bla bla',
      image: '../petImages/cat.jpeg',
      ownerID: 3,
    },
    {
      id: 3,
      createdDate: 0,
      type: 'Bird',
      name: 'Birdy',
      status: 'Adopted',
      breed: 'Poodle',
      color: 'Brown',
      height: 50,
      weight: 20,
      hypoallergenic: 'No',
      diet: 'No',
      bio: 'Bla bla bla bla bla',
      image: '../petImages/bird.jpeg',
      ownerID: 2,
    },
    {
      id: 4,
      createdDate: 0,
      type: 'Fish',
      name: 'Fishy',
      status: 'Available',
      breed: 'Poodle',
      color: 'Brown',
      height: 50,
      weight: 20,
      hypoallergenic: 'No',
      diet: 'No',
      bio: 'Bla bla bla bla bla',
      image: '../petImages/fish.jpeg',
      ownerID: null,
    },
  ],
};

export { mockDB };

const petsDB = {
  pets: [
    {
      id: 1,
      createdDate: 0,
      type: 'Dog',
      name: 'Doggy',
      status: 'adopted',
      image: '../petImages/dog.jpeg',
    },
    {
      id: 2,
      createdDate: 0,
      type: 'Cat',
      name: 'Catty',
      status: 'adopted',
      image: '../petImages/cat.jpeg',
    },
    {
      id: 3,
      createdDate: 0,
      type: 'Bird',
      name: 'Birdy',
      status: 'adopted',
      image: '../petImages/bird.jpeg',
    },
    {
      id: 4,
      createdDate: 0,
      type: 'Fish',
      name: 'Fishy',
      status: 'adopted',
      image: '../petImages/fish.jpeg',
    },
    {
      id: 5,
      createdDate: 0,
      type: 'Dog',
      name: 'Doggy',
      status: 'adopted',
      image: '../petImages/dog.jpeg',
    },
    {
      id: 6,
      createdDate: 0,
      type: 'Cat',
      name: 'Catty',
      status: 'adopted',
      image: '../petImages/cat.jpeg',
    },
    {
      id: 7,
      createdDate: 0,
      type: 'Bird',
      name: 'Birdy',
      status: 'adopted',
      image: '../petImages/bird.jpeg',
    },
    {
      id: 8,
      createdDate: 0,
      type: 'Fish',
      name: 'Fishy',
      status: 'adopted',
      image: '../petImages/fish.jpeg',
    },
  ],
};

export default petsDB;
