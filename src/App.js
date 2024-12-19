import "./App.css";
import Login from "./components/Login/Login.js"
import Home from "./components/home/home";
import Tour from "./components/tour/tour.js";
import InfoZoo from "./components/tour/info.js";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

function App() {
  return (
    <Router>
      <div className="App">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/tour" element={<Tour />} />
          <Route path="/info" element={<InfoZoo />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
