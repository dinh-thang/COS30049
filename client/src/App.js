import { Routes, Route } from "react-router-dom";

import Footer from "./components/Footer";
import NavBar from "./components/NavBar";

import Home from "./pages/Home";
import AboutUs from "./pages/AboutUs";
import Report from "./pages/Report";
import Login from "./pages/Login";
import Signup from "./pages/Signup";

function App() {
  return (
    <div>
      <NavBar />

      {/* Routes component to map the different pages */}
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="about" element={<AboutUs />} />
        <Route path="report" element={<Report />} />
        <Route path="login" element={<Login />} />
        <Route path="signup" element={<Signup />} />
        <Route
          path="*"
          element={<h1 className="not-found">Page Not Found</h1>}
        />
      </Routes>

      <h1 className="text-3xl font-bold underline">Hello world!</h1>
      <Footer />
    </div>
  );
}

export default App;
