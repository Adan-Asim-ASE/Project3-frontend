import axios from 'axios';

export async function userLogin(data) {
  return await axios.post(process.env.REACT_APP_BACKEND_API + 'users/login', data)
    .then(data => data.data);
};

export async function createUser(user) {
  return await axios.post(process.env.REACT_APP_BACKEND_API + 'users/', user)
    .then(data => data.data);
};
