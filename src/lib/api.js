import axios from 'axios';

// const BaseUrl = 'http://127.0.0.1:5500';
const BaseUrl = 'https://eavior-pet-adoption.herokuapp.com';

function getAuthConfig(token) {
  return {
    headers: {
      Authorization: 'Bearer ' + token,
    },
  };
}

// 1 Signup API - route: ‘/signup’ [POST] ok
export async function signUp(signUpData) {
  const response = await axios.post(`${BaseUrl}/signup`, signUpData);
  return response.data;
}

// 2 Login API - route: ‘/login’ [POST] ok
export async function login(loginData) {
  const response = await axios.post(`${BaseUrl}/login`, loginData);
  return response.data;
}

// 3 Add Pet API - Route: ‘/pet’ [POST] (Protected to admin only)
export async function createPet(newPet, token) {
  const response = await axios.post(
    `${BaseUrl}/pet`,
    newPet,
    getAuthConfig(token)
  );
  return response.data;
}

// 4
export async function createImage(newImage, token) {
  const response = await axios.post(
    `${BaseUrl}/pet/picture_url`,
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
  return response.data;
}

// 5 Get Pet By ID API - Route: ‘/pet/:id’ [GET]
export async function getPetById(petId, token) {
  let result;
  const response = await axios.get(
    `${BaseUrl}/pet/` + petId,
    getAuthConfig(token)
  );
  if (petId === 'all') {
    result = response.data.pets;
  } else {
    result = response.data.pet[0];
  }
  return result;
}

// 6 Edit Pet API - Route: ‘/pet/:id’ [PUT] (protected to admin only)
export async function updatePet(petId, updatedPet, token) {
  const response = await axios.put(
    `${BaseUrl}/pet/` + petId,
    updatedPet,
    getAuthConfig(token)
  );
  return response.data;
}

// 7a Get Pets - API Route: ‘/pet’ [GET]
export async function searchPets(query, token) {
  const response = await axios.get(
    `${BaseUrl}/pet/?${query}`,

    getAuthConfig(token)
  );
  const searchResults = response.data;
  // const pet = response.data.pet;
  return searchResults;
}

// 8 Adopt/Foster API - Route ‘/pet/:id/adopt’ [POST] (protected to logged in users)
// Return Pet API - Route ‘/pet/:id/return’ [POST] (protected to logged in users)
export async function adoptPet(petId, adoptionUpdate, token) {
  const status = adoptionUpdate.status === 'Available' ? '/return' : '/adopt';
  const response = await axios.put(
    `${BaseUrl}/pet/` + petId + status,
    adoptionUpdate,
    getAuthConfig(token)
  );
  return response.data;
}

// 9 Save Pet API - Route ‘/pet/:id/save’ [POST] (protected to logged in users)
export async function savePet(petId, token) {
  const response = await axios.post(
    `${BaseUrl}/pet/${petId}/save`,
    petId,
    getAuthConfig(token)
  );
  return response.data;
}

// 10 Delete Saved Pet API - Route ‘/pet/:id/save’ [DELETE] (protected to logged in users)
export async function removePet(petId, token) {
  const response = await axios.delete(
    `${BaseUrl}/pet/${petId}/save`,
    getAuthConfig(token)
  );
  return response.data;
}

// 11 Get Pets By User ID API - Route ‘/pet/user/:id’ [GET]
export async function getOwnedPets(userId, token) {
  const response = await axios.get(
    BaseUrl + '/pet/user/' + userId + '/owned',
    getAuthConfig(token)
  );
  return response.data;
}

// 12 Get Pets By User ID API - Route ‘/pet/user/:id’ [GET]
export async function getSavedPets(userId, token) {
  const response = await axios.get(
    BaseUrl + '/pet/user/' + userId + '/saved',
    getAuthConfig(token)
  );
  return response.data;
}

// 13 Get User By ID API - Route ‘/user/:id’ [GET]
export async function getCurrentUser(userId, token) {
  const response = await axios.get(
    BaseUrl + '/user/' + userId,
    getAuthConfig(token)
  );
  const user = response.data.user[0];
  return user;
}

// 14 Update User API - Route ‘/user/:id’ [PUT] (protected to logged in user)
export async function updateCurrentUser(userId, updatedUser, token) {
  const response = await axios.put(
    `${BaseUrl}/user/` + userId,
    updatedUser,
    getAuthConfig(token)
  );
  return response.data;
}

// 15 Get Users API - Route ‘/user’ [GET] (protected to admin)
export async function getUsers(token) {
  const response = await axios.get(`${BaseUrl}/user`, getAuthConfig(token));
  return response.data;
}

// 16 Get User By ID API - Route ‘/user/:id/full’ [GET]
export async function getAllPetsForUser(userId, token) {
  const response = await axios.get(
    BaseUrl + '/user/' + userId + '/full',
    getAuthConfig(token)
  );
  return response.data;
}

// ADDITIONAL API's:

// 17 ok (all pets + admin)
export async function getAllPets(token) {
  const response = await axios.get(BaseUrl + '/pet/all', getAuthConfig(token));
  return response.data.pets;
}

// 18
export async function deletePet(petId, token) {
  const response = await axios.delete(
    `${BaseUrl}/pet/` + petId,
    getAuthConfig(token)
  );
  return response.data;
}

// 19
export async function getSaveStatus(petId, userId, token) {
  const response = await axios.get(
    // `${BaseUrl}/pet/save/${petId}/current_user/`,
    `${BaseUrl}/pet/${petId}/user/${userId}/`,
    getAuthConfig(token)
  );
  return response.data;
}

// 20 Update User API - for admins only
export async function updateUserRole(userId, updatedUser, token) {
  const response = await axios.put(
    `${BaseUrl}/user/${userId}/admin`,
    updatedUser,
    getAuthConfig(token)
  );
  return response.data;
}

// 21
export async function deleteUser(userId, token) {
  const response = await axios.delete(
    `${BaseUrl}/user/` + userId,
    getAuthConfig(token)
  );
  return response.data;
}
