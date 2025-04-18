// App.jsx
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import Login from './pages/Login';
import RegisterForm from './components/RegisterForm';
//import Register from './pages/Register';

//<Route path="/login" element={<Login />} />
//<Route path="/register" element={<Register />} />

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/home" element={<Home />} />
        <Route path="/register" element={<RegisterForm/>}/>
        
      </Routes>
    </Router>
  );
}

export default App;
