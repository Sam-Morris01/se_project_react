import { getToken } from "./auth";

const baseUrl = "http://localhost:3001";

export const checkResponse = (res) => {
  return res.ok ? res.json() : Promise.reject(`Error: ${res.status}`);
};

// GET/items
async function getItems(weatherType = "") {
  const query = weatherType ? `?weather_like=${weatherType}` : "";
  const res = await fetch(`${baseUrl}/items${query}`);
  return checkResponse(res);
}

const request = (url, options) => {
  return fetch(url, options).then(checkResponse);
};

function addItem({ name, imageUrl, weather }) {
  const token = getToken();

  if (!token) {
    return Promise.reject({
      error: "You must be logged in to add items",
    });
  }

  return fetch(`${baseUrl}/items`, {
    method: "POST",
    headers: {
      authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ name, imageUrl, weather }),
  }).then(checkResponse);
}

function deleteItem(id) {
  const token = getToken();

  if (!token) {
    return Promise.reject({
      error: "You must be logged in to delete items",
    });
  }

  return fetch(`${baseUrl}/items/${id}`, {
    method: "DELETE",
    headers: {
      authorization: `Bearer ${token}`,
    },
  }).then(checkResponse);
}

function addCardLike(itemID) {
  const token = getToken();
  console.log("Adding like for item:", itemID);

  if (!token) {
    console.error("No token found when trying to like item");
    return Promise.reject({
      error: "You must be logged in to like items",
    });
  }

  return fetch(`${baseUrl}/items/${itemID}/likes`, {
    method: "PUT",
    headers: {
      authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
  })
    .then(response => {
      console.log("Like response status:", response.status);
      return checkResponse(response);
    })
    .then(data => {
      console.log("Like response data:", data);
      return data;
    })
    .catch(error => {
      console.error("Error liking item:", error);
      throw error;
    });
}

function removeCardLike(itemID) {
  const token = getToken();
  console.log("Removing like for item:", itemID);

  if (!token) {
    console.error("No token found when trying to unlike item");
    return Promise.reject({
      error: "You must be logged in to unlike items",
    });
  }

  return fetch(`${baseUrl}/items/${itemID}/likes`, {
    method: "DELETE",
    headers: {
      authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
  })
    .then(response => {
      console.log("Unlike response status:", response.status);
      return checkResponse(response);
    })
    .then(data => {
      console.log("Unlike response data:", data);
      return data;
    })
    .catch(error => {
      console.error("Error unliking item:", error);
      throw error;
    });
}

function updateUserInfo({ name, avatar }) {
  const token = getToken();

  if (!token) {
    return Promise.reject({
      error: "You must be logged in to update your profile",
    });
  }

  return fetch(`${baseUrl}/users/me`, {
    method: "PATCH",
    headers: {
      authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ name, avatar }),
  }).then(checkResponse);
}

export {
  request,
  addItem,
  deleteItem,
  updateUserInfo,
  addCardLike,
  removeCardLike,
  getItems,
  baseUrl
};