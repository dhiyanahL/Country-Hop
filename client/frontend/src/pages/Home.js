import { useEffect, useState } from "react";
import { getAllCountries } from "../services/api";
import { addFavorite, getFavorites } from "../services/auth";
import { AiOutlineHeart, AiFillHeart } from "react-icons/ai";
import toast, { Toaster } from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const regionOptions = [
  { value: "", label: "All Regions", icon: "🌍" },
  { value: "Africa", label: "Africa", icon: "🌍" },
  { value: "Americas", label: "Americas", icon: "🌎" },
  { value: "Asia", label: "Asia", icon: "🌏" },
  { value: "Europe", label: "Europe", icon: "🌍" },
  { value: "Oceania", label: "Oceania", icon: "🌊" },
  { value: "Antarctic", label: "Antarctic", icon: "❄️" },
];

const Home = () => {
  const [countries, setCountries] = useState([]);
  const [favorites, setFavorites] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedRegion, setSelectedRegion] = useState("");
  const token = localStorage.getItem("token");
  const navigate = useNavigate();

  useEffect(() => {
    const fetchCountries = async () => {
      try {
        if (searchQuery.trim()) {
          const res = await axios.get(
            `https://restcountries.com/v3.1/name/${searchQuery}`
          );
          setCountries(res.data);
        } else if (selectedRegion) {
          const res = await axios.get(
            `https://restcountries.com/v3.1/region/${selectedRegion}`
          );
          setCountries(res.data);
        } else {
          const res = await getAllCountries();
          setCountries(res.data);
        }
      } catch (err) {
        console.log("Error fetching countries:", err);
        setCountries([]);
      }
    };

    fetchCountries();

    if (token) {
      getFavorites(token)
        .then((res) => setFavorites(res.data.favorites))
        .catch((err) => console.log("Failed to load favorites", err));
    }
  }, [searchQuery, selectedRegion, token]);

  const handleAddFavorite = async (code) => {
    if (!token) {
      toast.error("Please log in to add favorites.");
      return;
    }

    if (favorites.includes(code)) {
      toast("Already in favorites!", { icon: "❤️" });
      return;
    }

    try {
      await addFavorite(code, token);
      setFavorites((prev) => [...prev, code]);
      toast.success("Added to favorites!");
    } catch (error) {
      console.error("Failed to add favorite:", error);
      toast.error("Error: could not add to favorites.");
    }
  };

  const handleClearFilters = () => {
    setSearchQuery("");
    setSelectedRegion("");
  };

  return (
    <div className="p-6 bg-[#FDF7F0] min-h-screen">
      <Toaster />

      {/* Top Controls */}
      <div className="mb-6 text-center flex flex-col md:flex-row items-center justify-between gap-4 flex-wrap">
        {/* Favorites Button */}
        <button
          onClick={() => navigate("/favorites")}
          className="bg-[#6F4D38] text-[#FFFDF5] py-2 px-6 rounded-full text-xl font-semibold transition hover:bg-[#25344F]"
        >
          View Favorites
        </button>

        {/* Search Bar */}
        <input
          type="text"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          placeholder="Search countries by name..."
          className="p-2 border border-[#6F4D38] rounded-md w-full md:w-96 text-[#25344F]"
        />

        {/* Region Filter */}
        <select
          onChange={(e) => setSelectedRegion(e.target.value)}
          value={selectedRegion}
          className="p-2 border border-[#6F4D38] rounded-md text-[#25344F] bg-white"
        >
          {regionOptions.map((region) => (
            <option key={region.value} value={region.value}>
              {region.icon} {region.label}
            </option>
          ))}
        </select>

        {/* Clear Filters Button */}
        <button
          onClick={handleClearFilters}
          className="bg-[#617891] text-white py-2 px-4 rounded-full hover:bg-[#25344F] transition"
        >
          Clear Filters
        </button>
      </div>

      {/* Country Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {countries.map((country) => {
          const isFavorited = favorites.includes(country.cca3);
          return (
            <div
              key={country.cca3}
              className="bg-[#D5B893] text-[#25344F] border-2 border-[#6F4D38] p-4 rounded-2xl shadow-md hover:shadow-lg transition duration-200"
            >
              <img
                src={country.flags.svg}
                alt={country.name.common}
                className="w-full h-32 object-cover rounded-md mb-3"
              />
              <h2
                className="font-bold text-xl mb-1 cursor-pointer hover:underline"
                onClick={() => navigate(`/country/${country.cca3}`)}
              >
                {country.name.common}
              </h2>
              <p className="mb-1">
                <span className="text-[#632024] font-semibold">Capital:</span>{" "}
                <span className="text-[#25344F]">{country.capital?.[0]}</span>
              </p>

              <p className="mb-1">
                <span className="text-[#632024] font-semibold">Region:</span>{" "}
                <span className="text-[#25344F]">{country.region}</span>
              </p>

              <p>
                <span className="text-[#632024] font-semibold">
                  Population:
                </span>{" "}
                <span className="text-[#25344F]">
                  {country.population.toLocaleString()}
                </span>
              </p>

              <button
                onClick={() => handleAddFavorite(country.cca3)}
                className={`mt-4 flex items-center gap-2 font-semibold transition ${
                  isFavorited
                    ? "text-[#632024]"
                    : "text-[#25344F] hover:text-[#632024]"
                }`}
                disabled={isFavorited}
              >
                {isFavorited ? (
                  <AiFillHeart size={20} />
                ) : (
                  <AiOutlineHeart size={20} />
                )}
                {isFavorited ? "Already Favorited" : "Add to Favorites"}
              </button>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Home;
