import { baseUrl, checkResponse } from "./API";

function signUp({ name, avatar, email, password }) {
  return fetch(`${baseUrl}/signup`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ name, avatar, email, password }),
  }).then(checkResponse);
}

function signIn({ email, password }) {
  return fetch(`${baseUrl}/signin`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ email, password }),
  })
    .then(checkResponse)
    .then((data) => {
      if (data.jwt) {
        setToken(data.jwt);
      }
      return data;
    });
}

function setToken(token) {
  localStorage.setItem("jwt", token);
}

function getToken() {
  const token = localStorage.getItem("jwt");

  if (!token) {
    return null;
  }
  return token;
}

export const removeToken = () => {
  localStorage.removeItem("jwt");
};

function checkToken() {
  const token = getToken();

  if (!token) {
    return Promise.reject("No token");
  }

  return fetch(`${baseUrl}/users/me`, {
    headers: {
      authorization: `Bearer ${token}`,
    },
  }).then(checkResponse);
}

function updateProfile(token, { name, avatar }) {
  return fetch(`${baseUrl}/users/me`, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
      authorization: `Bearer ${token}`,
    },
    body: JSON.stringify({ name, avatar }),
  }).then(checkResponse);
}

export { signUp, signIn, setToken, getToken, checkToken, updateProfile };