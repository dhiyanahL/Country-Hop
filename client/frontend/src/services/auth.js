// services/auth.js

import axios from "axios";

export const addFavorite = async (countryCode, token) => {
  return axios.post(
    "http://localhost:5000/api/favorites/add",
    { countryCode },
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );
};

export const getFavorites = async (token) => {
  return axios.get("http://localhost:5000/api/favorites", {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};

export const removeFavorite = async (token, countryCode) => {
  return await axios.delete(`http://localhost:5000/api/favorites/${countryCode}`, {
    headers: { Authorization: `Bearer ${token}` },
  });
};

