import axios from 'axios';

const BASE_URL = 'https://restcountries.com/v3.1';

export const getAllCountries = () => axios.get(`${BASE_URL}/all`); //GET ALL COUNTRIES
export const getCountryByName = (name) => axios.get(`${BASE_URL}/name/${name}`); //GET BY NAME
export const getByRegion = (region) => axios.get(`${BASE_URL}/region/${region}`); //GET BY REGION
export const getByAlphaCode = (code) => axios.get(`${BASE_URL}/alpha/${code}`); //GET BY CODE
