import "./App.css";
import Login from './components/Login/Login';
import Register from './components/Register/Register.js';
import Home from "./components/home/home";
import Tour from "./components/tour/tour.js";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

function App() {
  return (
    <Router>
      <div className="App">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/tour" element={<Tour />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;


