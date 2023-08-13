import { Link } from "react-router-dom"; // Link component of react-router-dom to create clickable links and handle routing
import { MdOutlineSecurity } from "react-icons/md";

import React from 'react'

const Logo = ({ className }) => {
  return (
    <div className={`text-2xl inline-block mr-4 py-2 text-white ${className}`}>
      <Link to="/" className="flex items-center py-5 px-2 ">
        <MdOutlineSecurity className="h-10 w-10 mr-3 text-blue-500" />
        <span className="font-bold text-white">Cyber Tech</span>
      </Link>
    </div>
  );
};


export default Logo