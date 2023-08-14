import React from "react";
// import footer and navbar components from other files
import Footer from "./Footer";
import NavBar from "./NavBar";

// Layout component that show the navbar, main body with styling and footer for every page
const Layout = ({children}) => {
  return (
    <>
      <NavBar />
      {/* add margin to the body i.e. main element */}
      {/* using Tailwind classes: small-screen devices will have smaller margin, but larger screens will have larger margin */}
      <main className="my-6 mx-4 2xl:mx-44">{children}</main>
      <Footer />
    </>
  );
};

export default Layout;
