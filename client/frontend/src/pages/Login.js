import LoginForm from "../components/LoginForm";
import { useNavigate } from "react-router-dom";
import axios from "axios";

export default function Login() {
  const navigate = useNavigate();

  const handleLogin = async (username, password) => {
    try {
      const res = await axios.post("http://localhost:5000/api/auth/login", {
        username,
        password,
      });

      const { token, user } = res.data;
      localStorage.setItem("token", token);

      navigate("/home");
    } catch (err) {
      console.error("Error during login:", err);
      alert(
        "Login failed: " +
          (err.response?.data?.message || err.message || "Unknown error")
      );
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#D5B893]">
      <LoginForm onLogin={handleLogin} />
    </div>
  );
}
