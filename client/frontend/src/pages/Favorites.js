import { useEffect, useState } from "react";
import { getFavorites } from "../services/auth"; // Import function to fetch favorites
import { useNavigate } from "react-router-dom";
import { AiFillHeart } from "react-icons/ai";
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
            flag: country.flags.svg,
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
    <div className="p-6 min-h-screen"  style={{
      backgroundImage: `url('/images/homebg.png')`,
      backgroundSize: "cover",
      backgroundPosition: "center",
      backgroundRepeat: "no-repeat",
    }}>
      <Toaster />
      <h1 className="text-4xl font-bold mb-10 text-[#25344F] text-center font-[Kalnia]">
        Your Favorites
      </h1>
     
       {/* Back Button */}
    <div className="mb-6 flex justify-start">
      <button
        onClick={() => navigate(-1)} // <- this goes back to the previous page
        className="bg-gradient-to-r from-[#6F4D38] to-[#632024] text-[#FFFDF5] py-2 px-6 rounded-full text-base font-semibold transition hover:scale-105 shadow-md"
      >
        ← Back
      </button>
    </div>


      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {countries.map((country) => (
          <div
            key={country.code}
            className="bg-[#D5B893] text-[#25344F] border-2 border-[#6F4D38] p-4 rounded-2xl shadow-md hover:shadow-lg transition duration-200 cursor-pointer"
            onClick={() => navigate(`/country/${country.code}`)}
          >
            <img
              src={country.flag}
              alt={country.name}
              className="w-full h-32 object-cover rounded-md mb-3"
            />
            <h2 className="font-bold text-xl mb-1">{country.name}</h2>
            <button
              className="mt-4 text-[#632024] font-semibold flex items-center gap-2"
              onClick={(e) => {
                e.stopPropagation(); // prevent card click event
                toast("Country removed from favorites!");
              }}
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
