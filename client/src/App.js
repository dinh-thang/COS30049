/* Group 2-25
  Group set 2: cybersecurity
  Team member: 
    Thang Dinh - 103522316
    Henry Le - 103795561 
    Jade Hoang - 103795587 */

import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import AboutUs from "./pages/AboutUs";
import Report from "./pages/Report";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import NotFound from "./pages/NotFound";
import Layout from "./components/Layout";

const App = () => {
  return (
    // wrap the whole application in the Layout component to have consistent layout across all pages
    <Layout>
      {/* Routes component of react-router-dom library to map the different pages and allow multi-page React application */}
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<AboutUs />} />
        <Route path="/report" element={<Report />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        {/* this route matches any path that hasn't been matched by any other route and renders the NotFound component  */}
        <Route path="*" element={<NotFound />} />
      </Routes>
    </Layout>
  );
};

export default App;
