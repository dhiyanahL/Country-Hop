import { useEffect, useState } from "react";
import { getFavorites } from "../services/auth"; // Import function to fetch favorites
import { useNavigate } from "react-router-dom";
import {  AiOutlineHeart, AiFillHeart } from "react-icons/ai";
import toast, { Toaster } from "react-hot-toast";
import axios from "axios";

const Favorites = () => {
  const [favorites, setFavorites] = useState([]);
  const [countries, setCountries] = useState([]);
  const token = localStorage.getItem("token");
  const navigate = useNavigate();

  useEffect(() => {
    if (!token) {
      toast.error("Please log in to view your favorites.");
      navigate("/");
      return;
    }

    getFavorites(token)
      .then((res) => setFavorites(res.data.favorites))
      .catch((err) => {
        console.log("Failed to load favorites", err);
        toast.error("Error loading favorites.");
      });
  }, [token, navigate]);

  useEffect(() => {
    // Fetch country data based on country codes
    const fetchCountryData = async () => {
      const countryData = [];
      for (const countryCode of favorites) {
        try {
          const response = await axios.get(
            `https://restcountries.com/v3.1/alpha/${countryCode}`
          );
          const country = response.data[0];
          countryData.push({
            code: countryCode,
            name: country.name.common,
            flag: country.flags.svg, // Flag URL
          });
        } catch (error) {
          console.error("Error fetching country data:", error);
        }
      }
      setCountries(countryData);
    };

    if (favorites.length > 0) {
      fetchCountryData();
    }
  }, [favorites]);

  return (
    <div className="p-6 bg-[#FDF7F0] min-h-screen">
      <Toaster />
      <h1 className="text-3xl font-semibold mb-6 text-[#25344F]">Your Favorites</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {countries.map((country) => (
          <div
            key={country.code}
            className="bg-[#D5B893] text-[#25344F] border-2 border-[#6F4D38] p-4 rounded-2xl shadow-md hover:shadow-lg transition duration-200"
          >
            <img
              src={country.flag}
              alt={country.name}
              className="w-full h-32 object-cover rounded-md mb-3"
            />
            <h2 className="font-bold text-xl mb-1">{country.name}</h2>
            <button
              className="mt-4 text-[#632024] font-semibold flex items-center gap-2"
              onClick={() => toast("Country removed from favorites!")}
            >
              <AiFillHeart size={20} /> Remove from Favorites
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Favorites;
