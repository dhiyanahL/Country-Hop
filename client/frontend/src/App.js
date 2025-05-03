// App.jsx
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import Login from './pages/Login';
import RegisterForm from './components/RegisterForm';
import { Toaster } from "react-hot-toast";
import Favorites from './pages/Favorites';
import CountryDetail from "./pages/CountryDetail";
import PrivateRoute from './components/PrivateRoute';


function App() {
  return (
    <Router>
       <Toaster position="top-center" />
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/home" element={ <PrivateRoute><Home /></PrivateRoute>} />
        <Route path="/register" element={ <RegisterForm/>}/>
        <Route path="/favorites" element={ <PrivateRoute><Favorites /></PrivateRoute>} />       
        <Route path="/country/:code" element={ <PrivateRoute><CountryDetail /></PrivateRoute>} />        
       
      </Routes>
    </Router>
  );
}

export default App;
