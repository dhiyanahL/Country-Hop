// pages/Home.jsx
import { useEffect, useState } from 'react';
import { getAllCountries } from '../services/api';

const Home = () => {
  const [countries, setCountries] = useState([]);

  useEffect(() => {
    getAllCountries().then(res => setCountries(res.data)).catch(err => console.log(err));
  }, []);

  return (
    <div className="p-4 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
      {countries.map((country) => (
        <div key={country.cca3} className="border p-4 rounded shadow">
          <img src={country.flags.svg} alt={country.name.common} className="w-full h-32 object-cover" />
          <h2 className="font-bold text-lg">{country.name.common}</h2>
          <p>Capital: {country.capital?.[0]}</p>
          <p>Region: {country.region}</p>
          <p>Population: {country.population.toLocaleString()}</p>
        </div>
      ))}
    </div>
  );
};

export default Home;
