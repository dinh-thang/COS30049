// this file for defining constants that are used across the frontend application.

export const TITLE1_CSS_CONFIGURATION =
  "text-center text-3xl font-extrabold sm:text-4xl lg:text-5xl mb-10";

// array to dynamically generate the nav links
export const navLinks = [
  { name: "Home", path: "/" },
  { name: "Report History", path: "/report" },
  { name: "About Us", path: "/about" },
];

export const UPLOAD_CONTRACT_API = "/upload_contract/";
export const GET_REPORTS_API = "/reports/";
export const GET_REPORT_API = "/reports/:id";
export const DELETE_REPORT_API = "/reports/:id";