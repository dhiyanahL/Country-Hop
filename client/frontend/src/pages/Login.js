import LoginForm from "../components/LoginForm";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import toast from "react-hot-toast";

export default function Login() {
  const navigate = useNavigate();

  const handleLogin = async (username, password) => {
    try {
      const res = await axios.post("https://40972122-e0d5-412f-82c6-143e48c86c58-dev.e1-us-east-azure.choreoapis.dev/country-hop-backend/country-hop-backend/v1.0/api/auth/login", {
        username,
        password,
      });
  
      const { token, username: returnedUsername } = res.data;
      localStorage.setItem("token", token);
      localStorage.setItem("username", returnedUsername);
      toast.success("Login successful! ✅");
      navigate("/home");
    } catch (err) {
      console.error("Error during login:", err);
      toast.error("Login failed. Please try again.");
    }
  };
  

  return (
    <div className="min-h-screen flex items-center justify-center"  style={{
      backgroundImage: `url('/images/bg.jpg')`,
      backgroundSize: "cover",
      backgroundPosition: "center",
      backgroundRepeat: "no-repeat",
    }}>
      <LoginForm onLogin={handleLogin} />
    </div>
  );
}
