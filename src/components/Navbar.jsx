import React from "react";
import Search from "../components/Search";
import logo from "../assets/CineSearch Logo.png";
import { NavLink } from "react-router-dom";
export default function Navbar({searchTerm, setSearchTerm}) {
  return (
    <nav>
      <div className="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4">
        <div className="flex items-center space-x-3 rtl:space-x-reverse">
          <img src={logo} className="h-8" alt="CiniSearch Logo" />
          <span className="self-center text-2xl font-semibold whitespace-nowrap dark:text-white">
            CiniSearch
          </span>
        </div>
        <div
          className="items-center justify-between hidden w-full md:flex md:w-auto md:order-1"
          id="navbar-cta"
        >
          <ul className="flex justify-between space-x-5 font-medium p-4">
            <li>
              <NavLink to="/" className="navDefaultCaterogy" aria-current="page">
                Movie
              </NavLink>
            </li>
            <li>
              <NavLink to="/tv-series" className="hoverCategory">
                TV Series
              </NavLink>
            </li>
            <li>
              <NavLink to="/anime" className="hoverCategory">
                Anime
              </NavLink>
            </li>
          </ul>
        </div>

        <Search searchTerm={searchTerm} setSearchTerm={setSearchTerm} />
      </div>
    </nav>
  );
}
