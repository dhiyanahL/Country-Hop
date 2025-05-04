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
  const [selectedLanguage, setSelectedLanguage] = useState("");
  const [languageOptions, setLanguageOptions] = useState([]);
  const token = localStorage.getItem("token");
  const username = localStorage.getItem("username");
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
        } else if (selectedLanguage) {
          const res = await axios.get(
            `https://restcountries.com/v3.1/lang/${selectedLanguage}`
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
  }, [searchQuery, selectedRegion, selectedLanguage, token]);

  // Fetch available languages (simplified approach)
  useEffect(() => {
    const fetchLanguages = async () => {
      try {
        const res = await getAllCountries();
        const languageSet = new Set();
        res.data.forEach((country) => {
          if (country.languages) {
            Object.values(country.languages).forEach((lang) =>
              languageSet.add(lang)
            );
          }
        });
        const languageArray = Array.from(languageSet).sort();
        setLanguageOptions(languageArray);
      } catch (error) {
        console.log("Error fetching languages", error);
      }
    };
    fetchLanguages();
  }, []);

  const handleAddFavorite = async (code) => {
    if (!token) {
      toast.error("Please log in to add favorites.");
      return;
    }

    if (favorites.includes(code)) {
      toast("Already in favorites!❤️");
      return;
    }

    try {
      await addFavorite(code, token);
      setFavorites((prev) => [...prev, code]);
      toast.success("Added to favorites! ❤️");
    } catch (error) {
      console.error("Failed to add favorite:", error);
      toast.error("Error: could not add to favorites.");
    }
  };

  const handleClearFilters = () => {
    setSearchQuery("");
    setSelectedRegion("");
    setSelectedLanguage("");
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("username");
    toast.success("Logged out successfully!");
    navigate("/");
  };

  return (
    <div
      className="p-6 min-h-screen"
      style={{
        backgroundImage: `url('/images/homebg.png')`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
      }}
    >
      <Toaster />
      {token && (
        <h1 className="text-3xl font-bold text-[#25344F] mb-6 text-center font-[Kalnia]">
          Welcome to Country Hop, {username}! 🌍
        </h1>
      )}

      {/* Top Controls */}
      <div className="mb-6 flex flex-col md:flex-row items-center justify-between gap-4 flex-wrap">
        <div className="flex gap-4 flex-wrap justify-center">
          <button
            onClick={() => navigate("/favorites")}
            className="bg-gradient-to-r from-[#6F4D38] to-[#632024] text-[#FFFDF5] py-2 px-6 rounded-full text-xl font-semibold transition hover:scale-105 shadow-md"
          >
            ❤️ View Favorites
          </button>

          {token && (
            <button
              onClick={handleLogout}
              className="bg-[#632024] text-white py-2 px-6 rounded-full text-xl font-semibold transition hover:scale-105 shadow-md"
            >
              🚪 Logout
            </button>
          )}
        </div>

        <div className="flex flex-wrap gap-3 items-center justify-center">
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search countries by name..."
            className="p-2 border border-[#6F4D38] rounded-md w-64 text-[#25344F]"
          />

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

          <select
            onChange={(e) => setSelectedLanguage(e.target.value)}
            value={selectedLanguage}
            className="p-2 border border-[#6F4D38] rounded-md text-[#25344F] bg-white"
          >
            <option value="">🌐 All Languages</option>
            {languageOptions.map((lang) => (
              <option key={lang} value={lang.toLowerCase()}>
                🗣️ {lang}
              </option>
            ))}
          </select>

          <button
            onClick={handleClearFilters}
            className="bg-gradient-to-r from-[#6F4D38] to-[#632024] text-[#FFFDF5] py-2 px-6 rounded-full text-base font-semibold transition hover:scale-105 shadow-md"
          >
            🧹 Clear Filters
          </button>
        </div>
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
                aria-label={
                  isFavorited ? "Already Favorited" : "Add to Favorites"
                }
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