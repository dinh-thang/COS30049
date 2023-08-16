import React, { useState } from "react";
import { BsSearch } from "react-icons/bs";
import { HiSortAscending } from "react-icons/hi";
import { BiCheck } from "react-icons/bi";

// dropdown menu to be used in Search component
const DropDown = () => {
  // style variable for each item in this drop down menu
  const menuItemStyle =
    "flex justify-between px-5 py-2 text-md hover:bg-slate-100 hover:text-slate-900 transition-colors duration-300 cursor-pointer";

  return (
    <div
      className="absolute mt-2 w-56 top-[42px] right-0 md:left-0
      rounded-lg shadow-xl bg-white ring-1 ring-black ring-opacity-40"
    >
      {/* menu */}
      <ul className="py-1">
        {/* menu item with text and icon for each */}
        <li className={`${menuItemStyle} border-gray-1 border-b-2`}>
          Date <BiCheck />
        </li>
        {/* menu item */}
        <li className={menuItemStyle}>
          Ascending <BiCheck />
        </li>
        {/* menu item */}
        <li className={menuItemStyle}>
          Descending <BiCheck />
        </li>
      </ul>
    </div>
  );
};

// Search input field with searching and sorting functionality
const Search = () => {
  // styling for the search and sort buttons
  const buttonStyle =
    "px-3 bg-blue-500 hover:bg-blue-600 transition-colors duration-200 rounded-full mx-2";

  // state variable for managing dropdown menu and search quey
  const [open, setOpen] = useState(false); // default to false
  const [searchQuery, setSearchQuery] = useState(""); // default to empty string

  // function to toggle the dropdown menu
  const handleToggle = () => {
    setOpen(!open); // set "open" value to the opposite of its current state
  };

  // update the search query as the user types
  const handleSearchQueryChange = (event) => {
    setSearchQuery(event.target.value); // update the search query to current value of the input field that triggered the event
    console.log(event.target.value); // testing purpose
  };

  return (
    // Flexbox layout with centered items for the search input
    <div className="flex justify-center mt-8">
      <button type="submit" className={buttonStyle}>
        {/* Search icons that has white text and xl size */}
        <BsSearch className="text-xl text-white" />
      </button>
      <label htmlFor="query" />
      <input
        type="text"
        id="query"
        placeholder="Search here..."
        className="px-5 py-1.5 rounded-full border-2 border-blue-400 focus:outline-none focus:border-blue-600 transition-colors duration-300"
        value={searchQuery}
        onChange={handleSearchQueryChange}
      />
      <button onClick={handleToggle} className={`${buttonStyle} relative`}>
        <HiSortAscending className="text-xl text-white" />
        {/* conditionally display the drop down menu when "open" state variable is true */}
        {open && <DropDown />}
      </button>
    </div>
  );
};

export default Search;
