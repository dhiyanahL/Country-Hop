// services/auth.js

import axios from "axios";

export const addFavorite = async (countryCode, token) => {
  return axios.post(
    "https://40972122-e0d5-412f-82c6-143e48c86c58-dev.e1-us-east-azure.choreoapis.dev/country-hop-backend/country-hop-backend/v1.0/api/favorites/add",
    { countryCode },
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );
};

export const getFavorites = async (token) => {
  return axios.get("https://40972122-e0d5-412f-82c6-143e48c86c58-dev.e1-us-east-azure.choreoapis.dev/country-hop-backend/country-hop-backend/v1.0/api/favorites", {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};

export const removeFavorite = async (token, countryCode) => {
  return await axios.delete(`https://40972122-e0d5-412f-82c6-143e48c86c58-dev.e1-us-east-azure.choreoapis.dev/country-hop-backend/country-hop-backend/v1.0/api/favorites/${countryCode}`, {
    headers: { Authorization: `Bearer ${token}` },
  });
};

