import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";

const CountryDetail = () => {
  const { code } = useParams();
  const navigate = useNavigate();
  const [country, setCountry] = useState(null);

  useEffect(() => {
    const fetchCountry = async () => {
      try {
        const res = await axios.get(`https://restcountries.com/v3.1/alpha/${code}`);
        setCountry(res.data[0]);
      } catch (err) {
        console.log("Error fetching country details:", err);
      }
    };
    fetchCountry();
  }, [code]);

  if (!country) {
    return <div className="text-center mt-10 text-[#25344F]">Loading country details...</div>;
  }

  return (
    <div className="p-6 bg-[#FFFDF5] min-h-screen text-[#25344F]">
      <button
        onClick={() => navigate(-1)}
        className="mb-4 bg-[#617891] text-white px-4 py-2 rounded hover:bg-[#25344F]"
      >
        ← Back
      </button>

      <div className="flex flex-col md:flex-row gap-6 items-center md:items-start">
        <img
          src={country.flags.svg}
          alt={country.name.common}
          className="w-80 h-48 object-cover rounded-xl shadow-md"
        />
        <div>
          <h1 className="text-3xl font-bold mb-2">{country.name.common}</h1>
          <p><strong>Official Name:</strong> {country.name.official}</p>
          <p><strong>Capital:</strong> {country.capital?.[0]}</p>
          <p><strong>Region:</strong> {country.region}</p>
          <p><strong>Subregion:</strong> {country.subregion}</p>
          <p><strong>Population:</strong> {country.population.toLocaleString()}</p>
          <p><strong>Area:</strong> {country.area.toLocaleString()} km²</p>
          <p><strong>Timezones:</strong> {country.timezones?.join(", ")}</p>
          <p><strong>Currencies:</strong> {country.currencies && Object.values(country.currencies).map(c => `${c.name} (${c.symbol})`).join(", ")}</p>
          <p><strong>Languages:</strong> {country.languages && Object.values(country.languages).join(", ")}</p>
        </div>
      </div>
    </div>
  );
};

export default CountryDetail;
