import axios from 'axios';

const BaseUrl = 'http://127.0.0.1:5500';

function getAuthConfig(token) {
  return {
    headers: {
      Authorization: 'Bearer ' + token,
    },
  };
}

export async function signUp(signUpData) {
  const response = await axios.post(`${BaseUrl}/users/signup`, signUpData);
  return response.data;
}

export async function login(loginData) {
  const response = await axios.post(`${BaseUrl}/users/login`, loginData);
  return response.data;
}

export async function getCurrentUser(token) {
  const response = await axios.get(BaseUrl + '/', getAuthConfig(token));
  const user = response.data.user[0];
  return user;
}

export async function updateCurrentUser(userId, updatedUser, token) {
  const response = await axios.put(
    `${BaseUrl}/users/` + userId,
    updatedUser,
    getAuthConfig(token)
  );
  return response.data;
}

// export async function getCurrentUserData(id, token) {
//   const response = await axios.get(
//     BaseUrl + '/users/' + id,
//     getAuthConfig(token)
//   );
//   return response.data;
// }

export async function getOwnedPets(id, token) {
  const response = await axios.get(
    BaseUrl + '/pets/owned/' + id,
    getAuthConfig(token)
  );
  return response.data;
}

export async function getSavedPets(id, token) {
  const response = await axios.get(
    BaseUrl + '/pets/saved/' + id,
    getAuthConfig(token)
  );
  return response.data;
}

export async function getAllPets(token) {
  const response = await axios.get(
    BaseUrl + '/pets/all/',
    getAuthConfig(token)
  );
  return response.data.pets;
}

export async function getPetById(petID, token) {
  const response = await axios.get(
    `${BaseUrl}/pets/` + petID,
    getAuthConfig(token)
  );
  const pet = response.data.pet[0];
  // const pet = response.data.pet;
  return pet;
}

export async function updatePet(petId, updatedPet, token) {
  const response = await axios.put(
    `${BaseUrl}/pets/` + petId,
    updatedPet,
    getAuthConfig(token)
  );
  return response.data;
}

export async function createPet(newPet, token) {
  const response = await axios.post(
    `${BaseUrl}/pets`,
    newPet,
    getAuthConfig(token)
  );
  return response.data;
}

// WORKING HERE:

export async function createImage(newImage, token) {
  console.log(newImage);
  const response = await axios.post(
    `${BaseUrl}/pets/picture_url/`,
    newImage,
    getAuthConfig(token),
    {
      headers: {
        accept: 'application/json',
        'Accept-Language': 'en-US,en;q=0.8',
        'Content-Type': `multipart/form-data; boundary=${newImage._boundary}`,
      },
    }
  );
  console.log('test');
  return response.data;
}

// axios.post(URL, data, {
//   headers: {
//     'accept': 'application/json',
//     'Accept-Language': 'en-US,en;q=0.8',
//     'Content-Type': `multipart/form-data; boundary=${data._boundary}`,
//   }
// })
//   .then((response) => {
//     //handle success
//   }).catch((error) => {
//     //handle error
//   });
// };}

export async function getPets(id, token) {
  console.log('3');
  const response = await axios.get(`${BaseUrl}/pets`, getAuthConfig(token));
  return response.data;
}

export async function getUsers(token) {
  const response = await axios.get(`${BaseUrl}/users/`, getAuthConfig(token));
  return response.data;
}

// export async function createUser(user) {
//   const response = await axios.post(`${BaseUrl}/user`, user);
//   return response.data;
// }
