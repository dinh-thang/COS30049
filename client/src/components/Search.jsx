import React, { useState } from "react";
import {
  AiOutlineSearch,
  AiFillCaretDown,
  AiOutlineCheck,
} from "react-icons/ai";

const menuItemStyle =
  "px-4 py-2 text-sm text-blue-500 hover:bg-blue-100 hover:text-blue-900 flex justify-between cursor-pointer";

const DropDown = ({
  toggle,
  sortBy,
  onSortByChange,
  orderBy,
  onOrderByChange,
}) => {
  if (!toggle) {
    // this will not only hide this sub-component but actually make this variable never exist if toggle is false -> return null
    return null;
  }

  return (
    <div
      className="origin-top-right absolute right-0 mt-2 w-60
    rounded-md shadow-lg bg-white ring-1"
    >
      {/* dropdown menu */}
      <div className="py-1">
        {/* menu item */}
        <div
          onClick={() => onSortByChange("reportDate")}
          className={`${menuItemStyle} border-blue-1 border-b-2`}
        >
          Date
          {sortBy === "reportDate" && <AiOutlineCheck className="text-black" />}
        </div>
        {/* menu item */}
        <div onClick={() => onOrderByChange("asc")} className={menuItemStyle}>
          Ascending
          {orderBy === "asc" && <AiOutlineCheck className="text-black" />}
        </div>
        {/* menu item */}
        <div onClick={() => onOrderByChange("desc")} className={menuItemStyle}>
          Descending
          {orderBy === "desc" && <AiOutlineCheck className="text-black" />}
        </div>
      </div>
    </div>
  );
};

const Search = ({
  search,
  onsearchChange,
  sortBy,
  onSortByChange,
  orderBy,
  onOrderByChange,
}) => {
  const [toggleSort, setToggleSort] = useState(false);

  return (
    <div className="py-5">
      <div className="mt-1 relative rounded-md shadow-md">
        <button className="absolute inset-y-0 left-0 flex items-center px-4 text-white bg-blue-500 rounded-full">
          <AiOutlineSearch className="text-white text-xl" />
          <label htmlFor="search" />
        </button>
        <input
          type="text"
          name="search"
          value={search}
          onChange={(event) => {
            onsearchChange(event.target.value);
          }}
          className="pl-8 rounded-md focus:ring-blue-500 focus:border-blue-500 block w-full sm:text-sm border-blue-300"
          placeholder="Search reports..."
        />
        <div className="absolute inset-y-0 right-0 flex items-center">
          <div>
            <button
              onClick={() => setToggleSort(!toggleSort)}
              type="button"
              className="justify-center px-4 py-2 bg-blue-400 border-2 border-blue-400 text-sm text-white hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 flex items-center"
              id="option-menu"
            >
              Sort By <AiFillCaretDown className="ml-2" />
            </button>
            <DropDown
              toggle={toggleSort}
              sortBy={sortBy}
              onSortByChange={(mySort) => onSortByChange(mySort)}
              orderBy={orderBy}
              onOrderByChange={(myOrder) => onOrderByChange(myOrder)}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Search;
