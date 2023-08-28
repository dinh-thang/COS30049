import React, { useState } from "react";
// import icons from react-icons library
import { BsSearch } from "react-icons/bs";
import { HiSortAscending } from "react-icons/hi";
import { BiCheck } from "react-icons/bi";

// SORT BY dropdown menu to be used in Search component.
// Because Dropdown is used by Search component only, no need to put this in separate file
const DropDown = ({
  isOpen, // indicates whether the dropdown menu should be displayed or hidden
  selectedSortBy, // the current selected sorting option
  handleSortByChange, // function to handle changes in the sorting option
  selectedOrderBy, // the current selected ordering option
  handleOrderByChange, // function to handle changes in the ordering option (i.e., asc or desc order)
}) => {
  // if isOpen is false, hide the dropdown menu
  if (!isOpen) {
    return null;
  }
  // CSS class for each menu item in the dropdown menu
  const menuItemStyle =
    "flex justify-between px-5 py-2 text-md hover:bg-slate-100 hover:text-slate-900 transition-colors duration-300 cursor-pointer";

  // display the drop down menu if it is open
  return (
    <div
      className="absolute mt-2 w-56 top-[42px] right-0 md:left-0
      rounded-lg shadow-xl bg-white ring-1 ring-black ring-opacity-40"
    >
      {/* menu */}
      <ul className="py-1">
        {/* Menu item for sorting by contract name */}
        <li
          className={`${menuItemStyle} border-gray-1 border-b-2`}
          // onClick event handler to perform some action based on user's selection
          // this event allows the user to select a sorting option or ordering preference
          onClick={() => handleSortByChange("contractName")}
        >
          {/* conditionally render the checkmark if the sorting option is chosen, indicating selected state of the menu option   */}
          Contract Name {selectedSortBy === "contractName" && <BiCheck />}
        </li>
        {/* Menu item for sorting by vulnerability level (i.e. severity) */}
        <li
          className={`${menuItemStyle} border-gray-1 border-b-2`}
          onClick={() => handleSortByChange("severity")}
        >
          {/* conditionally render the checkmark if the sorting option is chosen, indicating selected state of the menu option   */}
          Severity {selectedSortBy === "severity" && <BiCheck />}
        </li>
        {/* Menu item for sorting by submission date */}
        <li
          className={`${menuItemStyle} border-gray-1 border-b-2`}
          onClick={() => handleSortByChange("submissionDate")}
        >
          {/* conditionally render the checkmark if the sorting option is chosen, indicating selected state of the menu option   */}
          Date {selectedSortBy === "submissionDate" && <BiCheck />}
        </li>
        {/* Menu item for ascending ordering */}
        <li
          className={menuItemStyle}
          onClick={() => handleOrderByChange("asc")}
        >
          {/* conditionally render the checkmark if the ordering option is chosen, indicating selected state of the menu option   */}
          Ascending {selectedOrderBy === "asc" && <BiCheck />}
        </li>
        {/* Menu item for descending ordering */}
        <li
          className={menuItemStyle}
          onClick={() => handleOrderByChange("desc")}
        >
          {/* conditionally render the checkmark if the ordering option is chosen, indicating selected state of the menu option   */}
          Descending {selectedOrderBy === "desc" && <BiCheck />}
        </li>
      </ul>
    </div>
  );
};

// Search input field with searching and sorting functionality
const Search = ({
  query, // this props represent the current query value for the search input
  onQueryChange, // function to handle changes in the search query
  sortBy, // represent the current selected sorting option
  onSortByChange, // function to handle changes in the sorting option
  orderBy, // represent the current selected ordering preference
  onOrderByChange, // unction to handle changes in the ordering preference
}) => {
  // keep track of the drop down menu state and control its visibility 
  const [isOpen, setOpen] = useState(false); // by default, the drop down menu is hidden

  // styling for the search and sort buttons
  const buttonStyle =
    "px-3 bg-blue-500 hover:bg-blue-600 transition-colors duration-200 rounded-full mx-2";

    // function to handle changes in the search query
    // this is called when there is a change in the search input field
  const handleQueryChange = (event) => {
    onQueryChange(event.target.value);
  };

  return (
    // Flexbox layout with centered items for the search input
    <div className="flex justify-center my-10">
      <button type="submit" className={buttonStyle}>
        {/* Search icons that has white text and xl size */}
        <BsSearch className="text-xl text-white" />
      </button>
      <label htmlFor="query" />
      {/* Search input */}
      <input
        type="text"
        id="query"
        placeholder="Search here..."
        className="px-5 py-1.5 rounded-full border-2 border-blue-400 focus:outline-none focus:border-blue-600 transition-colors duration-300"
        // set the input value the current query
        value={query}
        onChange={handleQueryChange}
      />
      {/* Sort button: toggle the visibility of dropdown menu when clicked */}
      <button
        onClick={() => {
          setOpen(!isOpen);
        }}
        className={`${buttonStyle} relative`} 
      >
        {/* icon representing the sort button */}
        <HiSortAscending className="text-xl text-white" />
        {/* DropDown component for selecting sorting and ordering options */}
        <DropDown
          isOpen={isOpen}
          selectedSortBy={sortBy}
          handleSortByChange={onSortByChange}
          selectedOrderBy={orderBy}
          handleOrderByChange={onOrderByChange}
        />
      </button>
    </div>
  );
};

export default Search;
