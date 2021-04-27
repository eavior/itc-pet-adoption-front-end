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
  console.log(response.data);
  return response.data;
}

export async function login(loginData) {
  const response = await axios.post(`${BaseUrl}/users/login`, loginData);
  console.log(response.data);
  return response.data;
}

export async function getCurrentUserName(token) {
  const response = await axios.get(BaseUrl + '/home', getAuthConfig(token));
  console.log(response.data);
  return response.data;
}

export async function getOwnedPets(id, token) {
  const response = await axios.get(
    BaseUrl + '/pets/owned/' + id,
    getAuthConfig(token)
  );
  console.log(response.data);
  return response.data;
}

export async function getSavedPets(id, token) {
  const response = await axios.get(
    BaseUrl + '/pets/saved/' + id,
    getAuthConfig(token)
  );
  console.log(response.data);
  return response.data;
}

export async function getPets(id, token) {
  const response = await axios.get(`${BaseUrl}/pets`, getAuthConfig(token));
  return response.data;
}

export async function createPet(newPet) {
  const response = await axios.post(`${BaseUrl}/pets`, newPet);
  return response.data;
}

export async function getUsers(id) {
  const response = await axios.get(`${BaseUrl}/users/`);
  return response.data;
}

export async function createUser(user) {
  const response = await axios.post(`${BaseUrl}/user`, user);
  return response.data;
}
