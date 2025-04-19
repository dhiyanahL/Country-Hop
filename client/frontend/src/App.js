// App.jsx
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import Login from './pages/Login';
import RegisterForm from './components/RegisterForm';
import { Toaster } from "react-hot-toast";
import Favorites from './pages/Favorites';
import CountryDetail from "./pages/CountryDetail";

//import Register from './pages/Register';

//<Route path="/login" element={<Login />} />
//<Route path="/register" element={<Register />} />

function App() {
  return (
    <Router>
       <Toaster position="top-center" />
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/home" element={<Home />} />
        <Route path="/register" element={<RegisterForm/>}/>
        <Route path="/favorites" element={<Favorites />} />
        <Route path="/country/:code" element={<CountryDetail />} />
       
      </Routes>
    </Router>
  );
}

export default App;
