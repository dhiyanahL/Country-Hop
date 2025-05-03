import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { AiFillEye, AiFillEyeInvisible } from "react-icons/ai";
import toast, { Toaster } from "react-hot-toast";

export default function RegisterForm() {
  const [formData, setFormData] = useState({
    username: "",
    password: "",
  });

  const [errors, setErrors] = useState({});
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    setErrors({ ...errors, [e.target.name]: "" });
  };

  const validate = () => {
    const newErrors = {};
    if (!formData.username.trim()) {
      newErrors.username = "Username is required";
    }
    if (formData.password.length < 6) {
      newErrors.password = "Password must be at least 6 characters long";
    }
    return newErrors;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const validationErrors = validate();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    try {
      await axios.post("http://localhost:5000/api/auth/register", formData);
      toast.success("Registration successful! ✅");
      navigate("/");
    } catch (error) {
      toast.error("Registration failed. Please try again ❌");
      console.error(error.response?.data?.message || "Registration failed");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center" style={{
      backgroundImage: `url('/images/bg.jpg')`,
      backgroundSize: "cover",
      backgroundPosition: "center",
      backgroundRepeat: "no-repeat",
    }}>
      <form
        onSubmit={handleSubmit}
        className="bg-[#FDF7F0] p-6 rounded-2xl shadow-md w-full max-w-lg border-2 border-[#6F4D38]"
      >
        <h2 className="text-5xl font-bold bg-gradient-to-r from-[#25344F] via-[#617891] to-[#632024] bg-clip-text text-transparent font-kalnia text-center mb-6 px-4 py-4">
          Register
        </h2>

        {/* Username Field */}
        <div className="mb-5">
          <label className="block text-lg mb-2 text-[#6F4D38] font-bold">Username</label>
          <input
            name="username"
            type="text"
            value={formData.username}
            onChange={handleChange}
            className="w-full p-2 border border-[#D5B893] rounded-lg focus:ring-2 focus:ring-[#617891]"
            placeholder="Enter a username"
            required
          />
          {errors.username && <p className="text-red-600 text-sm mt-1">{errors.username}</p>}
        </div>

        {/* Password Field */}
        <div className="mb-6">
          <label className="block text-lg mb-2 text-[#6F4D38] font-bold">Password</label>
          <div className="relative">
            <input
              name="password"
              type={showPassword ? "text" : "password"}
              value={formData.password}
              onChange={handleChange}
              className="w-full p-2 border border-[#D5B893] rounded-lg focus:ring-2 focus:ring-[#617891]"
              placeholder="Create a password"
              required
            />
            <span
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-3 top-2.5 cursor-pointer text-[#6F4D38]"
            >
              {showPassword ? <AiFillEye size={20} /> : <AiFillEyeInvisible size={20} />}
            </span>
          </div>
          {errors.password && <p className="text-red-600 text-sm mt-1">{errors.password}</p>}
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          className="w-full bg-[#25344F] text-white py-3 rounded-xl hover:bg-[#632024] transition text-xl font-kalnia"
        >
          Register
        </button>

        {/* Redirect Link */}
        <p className="mt-4 text-center">
          Already have an account?{" "}
          <a href="/" className="text-[#632024] font-bold hover:underline">
            Log in!
          </a>
        </p>
      </form>
    </div>
  );
}
