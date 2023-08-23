import React from "react";
import Search from "../components/Search";
import ReportList from "../components/ReportList"

import {TITLE_CSS_CONFIGURATION} from "../constant"

const Report = () => {
  return (
    <div>
      <h1 className={TITLE_CSS_CONFIGURATION}>Your Reports</h1>
      <Search />
      <ReportList />
    </div>
  );
};

export default Report;
