// render a navigation bar component

// Link component of react-router-dom to create clickable links and handle routing
import { Link } from "react-router-dom";
import { useState } from "react";

import Logo from "./Logo";

// import icons from react-icons
import { AiOutlineClose } from "react-icons/ai";
import { RiMenu3Fill } from "react-icons/ri";

const NavBar = () => {
  // array to dynamically generate the nav links
  // each object within the array has "name" property representing link's name and a "path" representing URL path for the link
  const navLinks = [
    { name: "Home", path: "/" },
    { name: "Report", path: "/report" },
    { name: "About Us", path: "/about" },
  ];

  // useState hook to keep track of the toggle menu state
  const [isOpen, setOpen] = useState(false); 

  // toggle the menu in mobile version
  const toggleMenu = () => {
    setOpen(!isOpen); // flips the value of isOpen state to its opposite value
  };

  const listItemStyle = "text-xl my-2 lg:ml-8 lg:my-0"; // style for list item
  const handleToggleStyle =
    "bg-blue-500 hover:bg-blue-600 active:bg-blue-700 flex items-center justify-center rounded-xl p-2 text-3xl text-white transition duration-400 hover:cursor-pointer"; // style for toggle menu

  return (
    // nav element with gray background colour
    <nav className="bg-gray-800">
      <div className="px-5 lg:flex lg:flex-row lg:justify-between">
        {/* imported logo component */}
        <Logo />

          {/* Toggle button for a menu on mobile version. On medium screen, this will be hidden */}
          <div
            onClick={toggleMenu}
            className="text-3xl fill-white absolute right-8 top-6 cursor-pointer lg:hidden transition-all"
          >
            {/* ternary operator to display a close icon when the menu is open, otherwise render a menu icon */}
            {isOpen ? (
              <div className={handleToggleStyle}>
                <AiOutlineClose />
              </div>
            ) : (
              <div className={handleToggleStyle}>
                <RiMenu3Fill />
              </div>
            )}
          </div>

        {/* nav links: on mobile, nav links are displayed vertically when toggling the menu. This is achieved by using open state variable and css properties flex and hidden  */}
        {/* from large screen (lg:), the menu is displayed horizontally   */}
        <div className={`lg:flex items-center ${isOpen ? "flex" : "hidden"}`}>
          <ul className="flex flex-col lg:flex-row list-none pb-8 lg:pb-0">
            {/* loop through the nav links and create a list item for each link */}
            {/* index parameter is to uniquely identify each list item  */}
            {navLinks.map((link, index) => (
              <li key={index} className={listItemStyle + ` lg:border-t-4 border-transparent hover:border-blue-500 transition duration-300`}>
                <Link
                  to={link.path}
                  className="px-3 py-2 flex items-center text-white hover:opacity-75"
                >
                  {link.name}
                </Link>
              </li>
            ))}
            {/* use variables as styling class to reduce repetitive code */}
            <div className="flex flex-col lg:flex-row ml-3 lg:ml-0">
              <li className={listItemStyle}>
                {/* style the link element that looks like a outline button for Login */}
                <Link
                  to="/login"
                  className="inline-block font-semibold border transition-colors duration-200 border-blue-500 bg-transparent hover:border-transparent text-blue-500 hover:text-white hover:bg-blue-500 rounded py-2 px-4"
                >
                  Login
                </Link>
              </li>
              <li className={listItemStyle}>
                {/* style the link element that looks like a fill button for Signup */}
                <Link
                  to="/signup"
                  className="inline-block transition-colors duration-200 bg-blue-500 hover:bg-blue-600 text-white hover:text-gray-200 rounded py-2 px-4"
                >
                  Signup
                </Link>
              </li>
            </div>
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default NavBar;
