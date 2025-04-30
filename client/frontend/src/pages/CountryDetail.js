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
        const res = await axios.get(
          `https://restcountries.com/v3.1/alpha/${code}`
        );
        setCountry(res.data[0]);
      } catch (err) {
        console.log("Error fetching country details:", err);
      }
    };
    fetchCountry();
  }, [code]);

  if (!country) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-[#FFFDF5] text-[#25344F]">
        Loading country details...
      </div>
    );
  }

  return (
    <div className="bg-[#FFFDF5] min-h-screen flex flex-col items-center p-6 text-[#25344F]">
      <button
        onClick={() => navigate(-1)}
        className="self-start mb-6 bg-[#617891] text-white px-5 py-2 rounded hover:bg-[#25344F] transition"
      >
        ← Back
      </button>

      <div className="w-full max-w-3xl bg-white rounded-2xl shadow-lg p-8 flex flex-col items-center border-2 border-[#6F4D38]">
        <img
          src={country.flags.svg}
          alt={country.name.common}
          className="w-80 h-48 object-cover rounded-lg shadow-md mb-6 border-4 border-[#D5B893]"
        />

        <h1 className="text-4xl font-bold text-[#632024] mb-6 font-[Kalnia] text-center">
          {country.name.common}
        </h1>

        {/* Details Table */}
        <table className="w-full border border-[#6F4D38] rounded-lg overflow-hidden border-collapse">
          <tbody>
            <tr className="bg-[#D5B893] text-[#25344F] border border-[#6F4D38]">
              <th className="text-left p-3 font-semibold border border-[#6F4D38]">
                Official Name
              </th>
              <td className="p-3 border border-[#6F4D38]">
                {country.name.official}
              </td>
            </tr>
            <tr className="border border-[#6F4D38]">
              <th className="text-left p-3 font-semibold border border-[#6F4D38]">
                Capital
              </th>
              <td className="p-3 border border-[#6F4D38]">
                {country.capital?.[0]}
              </td>
            </tr>
            <tr className="bg-[#D5B893] border border-[#6F4D38]">
              <th className="text-left p-3 font-semibold border border-[#6F4D38]">
                Region
              </th>
              <td className="p-3 border border-[#6F4D38]">{country.region}</td>
            </tr>
            <tr className="border border-[#6F4D38]">
              <th className="text-left p-3 font-semibold border border-[#6F4D38]">
                Subregion
              </th>
              <td className="p-3 border border-[#6F4D38]">
                {country.subregion}
              </td>
            </tr>
            <tr className="bg-[#D5B893] border border-[#6F4D38]">
              <th className="text-left p-3 font-semibold border border-[#6F4D38]">
                Population
              </th>
              <td className="p-3 border border-[#6F4D38]">
                {country.population.toLocaleString()}
              </td>
            </tr>
            <tr className="border border-[#6F4D38]">
              <th className="text-left p-3 font-semibold border border-[#6F4D38]">
                Area
              </th>
              <td className="p-3 border border-[#6F4D38]">
                {country.area.toLocaleString()} km²
              </td>
            </tr>
            <tr className="bg-[#D5B893] border border-[#6F4D38]">
              <th className="text-left p-3 font-semibold border border-[#6F4D38]">
                Timezones
              </th>
              <td className="p-3 border border-[#6F4D38]">
                {country.timezones?.join(", ")}
              </td>
            </tr>
            <tr className="border border-[#6F4D38]">
              <th className="text-left p-3 font-semibold border border-[#6F4D38]">
                Currencies
              </th>
              <td className="p-3 border border-[#6F4D38]">
                {country.currencies &&
                  Object.values(country.currencies)
                    .map((c) => `${c.name} (${c.symbol})`)
                    .join(", ")}
              </td>
            </tr>
            <tr className="bg-[#D5B893] border border-[#6F4D38]">
              <th className="text-left p-3 font-semibold border border-[#6F4D38]">
                Languages
              </th>
              <td className="p-3 border border-[#6F4D38]">
                {country.languages &&
                  Object.values(country.languages).join(", ")}
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default CountryDetail;
