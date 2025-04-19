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



/*export const getFavorites = async (token) => {
  try {
    // Fetch favorite country codes from your backend
    const response = await axios.get("http://localhost:5000/api/favorites", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    // Now fetch the country details from the REST Countries API
    const countryPromises = response.data.favorites.map((code) =>
      fetch(`https://restcountries.com/v3.1/alpha/${code}`)
        .then((response) => response.json())
        .then((data) => data[0])
    );

    // Wait for all country details to be fetched
    const countries = await Promise.all(countryPromises);

    return countries;
  } catch (error) {
    console.error("Error fetching favorites or country details:", error);
    throw error;
  }
};*/
