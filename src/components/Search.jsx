import React from "react";

const Search = ({searchTerm, setSearchTerm}) => {
  return (
    <div className="relative md:flex items-center bg-gray-700 rounded-lg px-3 py-2 hidden sm:block">
      <img
        src="search.svg"
        alt="Search Icon"
        className="w-5 h-5 text-gray-400"
      />
      <input
        type="text"
        name="search"
        placeholder="Search here"
        className="bg-transparent border-none outline-none text-white pl-2 placeholder-gray-400"
        value={searchTerm} onChange={(event)=>setSearchTerm(event.target.value)}
      />
    </div>
  );
};

export default Search;
