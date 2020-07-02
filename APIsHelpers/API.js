const fetch = require("node-fetch");

const posts_BaseURL = "https://jsonplaceholder.typicode.com/posts/";
const users_BaseURL = "https://jsonplaceholder.typicode.com/users";

const postSimple = (url, obj) => {
  return fetch(url, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json"
    },
    body: JSON.stringify(obj)
  });
};

const postWithAuth = (url, obj) => {
  return fetch(url, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
      Authorization: `Bearer ${localStorage.token}`
    },
    body: JSON.stringify(obj)
  });
};

const getSimple = url => {
  return fetch(url).then(res => res.json());
};

const getWithAuth = url => {
  return fetch(url, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
      Authorization: `Bearer ${localStorage.token}`
    }
  });
};

const getAllPosts = () => {
  return getSimple(posts_BaseURL);
};

const getASpecificPostWithId = id => {
  return getSimple(`${posts_BaseURL}${id}`);
};

const getAllUsers = () => {
  return getSimple(users_BaseURL);
};

module.exports = { getAllUsers, getAllPosts, getASpecificPostWithId };
