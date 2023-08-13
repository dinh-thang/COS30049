import Logo from "./Logo";
import { Link } from "react-router-dom";
import {
  AiFillFacebook,
  AiOutlineInstagram,
  AiFillGithub,
} from "react-icons/ai";
import { BsCodeSlash, BsMailbox, BsFillTelephoneFill } from "react-icons/bs";

const Footer = () => {
  const navLinks = [
    { name: "Home", path: "/" },
    { name: "Report", path: "/report" },
    { name: "About Us", path: "/about" },
  ];

  const listItemStyle =
    "text-gray-400 hover:text-white transition-colors duration-200 mx-4"; // style variable for list item

  return (
    <footer className="bg-gray-800 w-full py-1 mt-5">
      <div className="max-w-screen-xl px-4 mx-auto flex flex-col md:flex-row justify-between items-center">
        <div className="flex flex-col ">
          {/* logo */}
          <Logo className="flex justify-center md:justify-start "/>
          <p className="text-white mb-4 ml-3 text-xl font-bold italic">
            Secure your smart contract code now
          </p>
          {/* Try now button */}
          <Link className="flex justify-center md:justify-start" to="#">
            <button className="rounded-full ml-3 bg-blue-500 hover:bg-blue-700 py-2 px-4 text-white font-bold flex items-center transition-colors duration-200 ">
              <BsCodeSlash className="mr-3 text-xl font-bold" />
              Try now
            </button>
          </Link>
        </div>
        <ul className="flex flex-col md:flex-row mx-1.5 my-3 text-lg font-light justify-start">
          {navLinks.map((link, index) => (
            <li key={index} className={listItemStyle}>
              <Link
                to={link.path}
                className="px-3 py-2 flex items-center text-white hover:opacity-75"
              >
                {link.name}
              </Link>
            </li>
          ))}
        </ul>
        <div>
          <div className="flex flex-row text-white items-center my-3">
              <BsFillTelephoneFill className="text-1.5xl mx-5" /> (01) 2345 6789
          </div>
          <div className="flex flex-row text-white items-center">
              <BsMailbox className="text-1.5xl mx-5" /> group225@gmail.com
          </div>
        </div>
      </div>
        
      <hr className=" mt-7 mb-3" />
      <div className="flex justify-center py-3">
        <Link className={listItemStyle} to="https://github.com/dinh-thang">
          <AiFillFacebook className="text-3xl" />
        </Link>
        <Link className={listItemStyle} to="https://github.com/dinh-thang">
          <AiOutlineInstagram className="text-3xl" />
        </Link>
        <Link className={listItemStyle} to="https://github.com/dinh-thang">
          <AiFillGithub className="text-3xl" />
        </Link>
      </div>
    </footer>
  );
};

export default Footer;
