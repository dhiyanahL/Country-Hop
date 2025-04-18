import { useState } from "react";
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";

export default function LoginForm({ onLogin }) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [passwordVisible, setPasswordVisible] = useState(false);
  const [usernameError, setUsernameError] = useState("");
  const [passwordError, setPasswordError] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!username.trim()) {
      setUsernameError("Username is required");
      return;
    }

    if (password.length < 6) {
      setPasswordError("Password must be at least 6 characters long");
      return;
    }

    setUsernameError("");
    setPasswordError("");

    onLogin(username, password);
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="bg-[#FDF7F0] p-8 mt-8 rounded-2xl shadow-md w-full max-w-md border-2 border-[#6F4D38]"
    >
      <h2 className="text-5xl font-bold bg-gradient-to-r from-[#25344F] via-[#617891] to-[#632024] bg-clip-text text-transparent font-kalnia text-center mb-6 px-4 py-4">
        Login
      </h2>

      <div className="mb-5">
        <label className="block text-lg mb-2 text-[#6F4D38] font-bold">Username</label>
        <input
          type="text"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          onBlur={() => !username.trim() && setUsernameError("Username is required")}
          onFocus={() => setUsernameError("")}
          className="w-full p-2 border border-[#D5B893] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#617891] transition"
          placeholder="Enter your username"
          required
        />
        {usernameError && <p className="text-red-500 text-sm mt-1">{usernameError}</p>}
      </div>

      <div className="mb-6 relative">
        <label className="block text-lg mb-3 text-[#6F4D38] font-bold">Password</label>
        <input
          type={passwordVisible ? "text" : "password"}
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          onBlur={() => password.length < 6 && setPasswordError("Password must be at least 6 characters long")}
          onFocus={() => setPasswordError("")}
          className="w-full p-2 pr-10 border border-[#D5B893] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#617891] transition"
          placeholder="Enter your password"
          required
        />
        <span
          onClick={() => setPasswordVisible(!passwordVisible)}
          className="absolute top-2/3 right-3 transform -translate-y-1/4 cursor-pointer text-[#6F4D38]"
        >
          {passwordVisible ? <AiOutlineEyeInvisible size={24} /> : <AiOutlineEye size={24} />}
        </span>
        {passwordError && <p className="text-red-500 text-sm mt-1">{passwordError}</p>}
      </div>

      <button
        type="submit"
        className="w-full bg-[#25344F] text-white py-4 rounded-xl hover:bg-[#632024] transition text-2xl font-kalnia"
      >
        Login
      </button>

      <p className="mt-4 text-center">
        Don't have an account?{" "}
        <a href="/register" className="text-[#632024] font-bold hover:underline">
          Sign up!
        </a>
      </p>
    </form>
  );
}
