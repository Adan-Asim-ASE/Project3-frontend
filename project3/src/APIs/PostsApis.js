import axios from 'axios';
import getCookie from '../utils/HelperFunctions';

const getToken = () => {
  const userToken = getCookie("userToken");

  const config = {
    headers: {
      authorization: 'Bearer ' + userToken,
    }
  };
  return config;
}

export async function loadAllPublicPosts() {
  return await axios.get(process.env.REACT_APP_BACKEND_API + 'posts/')
    .then(data => data.data);
};

export async function createPost(post) {
  return await axios.post(process.env.REACT_APP_BACKEND_API + 'posts/', post, getToken())
    .then(data => data.data);
};

export async function loadMyPosts() {
  return await axios.get(process.env.REACT_APP_BACKEND_API + 'posts/me', getToken())
    .then(data => data.data);
};

export async function loadMyDraftedPosts() {
  return await axios.get(process.env.REACT_APP_BACKEND_API + 'posts/me/drafted', getToken())
    .then(data => data.data);
};

export async function loadMyPublishedPosts() {
  return await axios.get(process.env.REACT_APP_BACKEND_API + 'posts/me/published', getToken())
    .then(data => data.data);
};

export async function deletePost(pid) {
  return await axios.delete(process.env.REACT_APP_BACKEND_API + 'posts/' + pid, getToken())
    .then(data => data.data);
};

export async function editPost(id, post) {
  return await axios.post(process.env.REACT_APP_BACKEND_API + 'posts/edit/' + id, post, getToken())
    .then(data => data.data);
}    