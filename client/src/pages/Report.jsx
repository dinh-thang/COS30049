import React from "react";
import Search from "../components/Search";
// This is a sample hard-coded data for the report page, the data here is for demo purpose and the vulnerability data are taken from Slither documentation.
// Reference: https://github.com/crytic/slither/wiki/Detector-Documentation
import reportData from "../assets/reportData.json";

const Report = () => {
  return (
    <div>
      <h1>Report Page</h1>
      <Search />
      {/* use map() function + styling nha */}
    </div>
  );
};

export default Report;
