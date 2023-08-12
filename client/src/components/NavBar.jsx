import { Link } from "react-router-dom";
import { useState } from "react";

// import other components

// import icons from react-icons
import { MdOutlineSecurity } from "react-icons/md";
import { AiOutlineClose } from "react-icons/ai";
import { RiMenu3Fill } from "react-icons/ri";

const NavBar = () => {
  const navLinks = [
    { name: "Home", path: "/" },
    { name: "Report", path: "/report" },
    { name: "About Us", path: "/about" },
  ];

  const [open, setOpen] = useState(false);

  const toggleMenu = () => {
    setOpen(!open);
  };

  const listStyle = "md:ml-8 text-xl md:my-0 my-7"; // style for list item
  const toggleStyle =
    "bg-blue-500 hover:bg-blue-600 active:bg-blue-700 flex items-center justify-center rounded-xl p-2 text-3xl text-white transition duration-200 hover:cursor-pointer"; // style for toggle menu

  return (
    <div className="shadow-md w-full fixed top-0 left-0">
      <div className="bg-gray-800 py-4 md:px-10 px-7 ">
        <div className="flex justify-between">
          {/* logo */}
          <div className="font-bold text-2xl cursor-pointer flex items-center">
            <Link to="/" className="flex items-center py-5 px-2 ">
              <MdOutlineSecurity className="h-10 w-10 mr-3 text-blue-500" />
              <span className="font-bold text-white">Cyber Tech</span>
            </Link>
          </div>

          {/* nav links */}
          <ul
            className={`md:flex md:items-center md:pb-0 pb-12 absolute md:static bg-gray-800 md:z-auto z-[-1] left-0 w-full md:w-auto md:pl-0 pl-9 transition-all duration-200 ${
              open ? "top-20" : "top-[-490px]"
            }`}
          >
            {navLinks.map((link) => (
              <li key={link.index} className={listStyle}>
                <Link
                  to={link.path}
                  className="text-white hover:text-gray-200 duration-500"
                >
                  {link.name}
                </Link>
              </li>
            ))}
              <li className={listStyle}>
                <Link
                  to="/signup"
                  className="inline-block font-semibold rounded py-2 px-4 border border-blue-500 bg-transparent hover:border-transparent text-blue-500 hover:text-white hover:bg-blue-500"
                >
                  Login
                </Link>
              </li>
              <li className={listStyle}>
                <Link
                  to="/signup"
                  className="inline-block  rounded py-2 px-4 bg-blue-500 hover:bg-blue-600 text-white hover:text-gray-200"
                >
                  Signup
                </Link>
              </li>
          </ul>
        </div>
        <div
          onClick={toggleMenu}
          className="text-3xl fill-white absolute right-8 top-6 cursor-pointer md:hidden"
        >
          {open ? (
            <div className={toggleStyle}>
              <AiOutlineClose />
            </div>
          ) : (
            <div className={toggleStyle}>
              <RiMenu3Fill />
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default NavBar;
/* <Button color="yellow" to="/signup">
                Signup
              </Button> */
