import React, { useState } from "react";
import { BsSearch } from "react-icons/bs";
import { HiSortAscending } from "react-icons/hi";
import { BiCheck } from "react-icons/bi";


const DropDown = () => {
  const menuItemStyle =
    "flex justify-between px-5 py-2 text-md hover:bg-slate-100 hover:text-slate-900 transition-colors duration-300 cursor-pointer";

  return (
    <div
      className="absolute mt-2 w-56 top-[42px] right-0 md:left-0
      rounded-lg shadow-xl bg-white ring-1 ring-black ring-opacity-40"
    >
      {/* menu */}
      <ul className="py-1">
        {/* menu item */}
        <li className={`${menuItemStyle} border-gray-1 border-b-2`}>
          Date <BiCheck />
        </li>
        <li className={menuItemStyle}>Ascending <BiCheck /></li>
        <li className={menuItemStyle}>Descending <BiCheck /></li>
      </ul>
    </div>
  );
};

const Search = () => {
  const buttonStyle =
    "px-3 bg-blue-500 hover:bg-blue-600 transition-colors duration-200 rounded-full mx-2";
  const [open, setOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");

  const handleToggle = () => {
    setOpen(!open);
  };

  const handleSearchQueryChange = (event) => {
    setSearchQuery(event.target.value);
    // console.log(event.target.value);
  };

  return (
    <div className="flex justify-center mt-8">
        <button type="submit" className={buttonStyle}>
          <BsSearch className="text-xl text-white" />
        </button>
        <label htmlFor="query" />
        <input
          type="text"
          id="query"
          placeholder="Search here..."
          className="px-5 py-1.5 rounded-full border-2 border-blue-500 focus:border-blue-800"
          value={searchQuery}
          onChange={handleSearchQueryChange}
        />
      <button onClick={handleToggle} className={`${buttonStyle} relative`}>
        <HiSortAscending className="text-xl text-white" />
        {open && <DropDown />}
      </button>
    </div>
  );
};

export default Search;
