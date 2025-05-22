import React, { use, useEffect, useState } from "react";
import Search from "./components/Search";
import MovieCard from "./components/MovieCard";
import { useDebounce } from "react-use";
import Loading from "./components/Loading";
import { getTrendingMovies, updateSearchCount } from "../appwrite";
import TrendingContent from "./components/TrendingContent";

const API_BASE_URL = "https://api.themoviedb.org/3";
const API_KEY = import.meta.env.VITE_TMDB_API_KEY;
const API_OPTIONS = {
  method: "GET",
  headers: {
    accept: "application/json",
    Authorization: `Bearer ${API_KEY}`,
  },
};

const App = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [debouncedSearchTerm, setDebouncedSearchTerm] = useState(false);
  const [errorMessage, setErrorMessage] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [movieList, setMovieList] = useState([]);
  const [trendingMovies, setTrendingMovies] = useState([]);

  useDebounce(() => setDebouncedSearchTerm(searchTerm), 800, [searchTerm]);

  const fetchMovies = async (query = "") => {
    setIsLoading(true);
    setErrorMessage("");
    try {
      const endpoint = query
        ? `${API_BASE_URL}/search/movie?query=${encodeURIComponent(query)}`
        : `${API_BASE_URL}/discover/movie?sort_by=popularity.desc`;

      const response = await fetch(endpoint, API_OPTIONS);

      if (!response.ok) {
        throw new Error("Failed to fetch movies");
      }

      const data = await response.json();

      if (data.response === "False") {
        setErrorMessage(data.Error || "Error fetching movies");
        movieList = [];
        return;
      }

      setMovieList(data.results || []);

      if (query && data.results.length > 0) {
        await updateSearchCount(query, data.results[0]);
      }
    } catch (error) {
      setErrorMessage("Error fetching movies. Please try again later");
    } finally {
      setIsLoading(false);
    }
  };

  const loadNowTrendingMovies = async () => {
    try {
      const movies = await getNowTrendingMovies();
      setTrendingMovies(movies);
    } catch (error) {
      setErrorMessage("Error fetching trending movies");
    }
  };

  const loadTrendingMovies = async () => {
    try {
      const movies = await getTrendingMovies();
      setTrendingMovies(movies);
    } catch (error) {
      setErrorMessage("Error fetching trending movies");
    }
  };

  useEffect(() => {
    fetchMovies(debouncedSearchTerm);
  }, [debouncedSearchTerm]);

  useEffect(() => {
    loadTrendingMovies();
  }, []);

  useEffect(() => {
    loadNowTrendingMovies();
  }, []);

  return (
    <main>
      <nav>
        <div className="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4">
          <div className="flex items-center space-x-3 rtl:space-x-reverse">
            <img
              src="#"
              className="h-8"
              alt="CiniSearch Logo"
            />
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
                <a href="#" className="navDefaultCaterogy" aria-current="page">
                  Home
                </a>
              </li>
              <li>
                <a href="#" className="hoverCategory">
                  Movie
                </a>
              </li>
              <li>
                <a href="#" className="hoverCategory">
                  TV Series
                </a>
              </li>
              <li>
                <a href="#" className="hoverCategory">
                  Anime
                </a>
              </li>
            </ul>
          </div>

          <Search searchTerm={searchTerm} setSearchTerm={setSearchTerm} />
        </div>
      </nav>

      <div className="flex flex-wrap gap-4 w-full px-5 md:px-20 lg:px-40 my-5">
        {/* New Trailer Section */}
        <section className="bg-gray-900 p-6 rounded-2xl shadow-xl text-white w-full sm:w-[500px] md:w-1/3">
          {/* Header */}
          <div className="flex justify-between items-center mb-4">
            <div className="flex items-center space-x-2">
              <span className="text-xl">🔥</span>
              <h3 className="text-lg font-semibold">Top 3 Search Movies</h3>
            </div>
            {/* <span className="text-sm text-gray-400">
              Sort by: <strong>Today</strong> ⬆
            </span> */}
          </div>

          {/* Trending Movies List */}
          <div className="flex flex-col gap-4">
            {trendingMovies.length > 0 && (
              <ul className="space-y-4">
                {trendingMovies.map((movie, index) => (
                  <li key={movie.movie_id || index} className="relative mb-15">
                    <img
                      src={movie.poster_url}
                      alt={movie.title}
                      className="w-full h-[100px] object-cover rounded-tl-lg rounded-tr-lg rounded-bl-none rounded-br-none"
                    />
                    <div className="absolute bg-gray-600 bg-opacity-60 p-2 rounded-tl-none rounded-tr-none rounded-bl-lg rounded-br-lg w-full h-10">
                      <p className="flex items-center text-sm font-semibold">
                        {movie.title || "Title "}
                      </p>
                    </div>
                    <button className="absolute right-2 bg-gray-800 p-1 rounded-md text-base mt-1 px-2 opacity-70">
                      <span className="text-sm "><a href={`https://www.themoviedb.org/movie/${movie.movie_id}`} target="_blank" rel="noopener noreferrer" className="cursor-pointer">View on TMDB</a></span>
                    </button>
                  </li>
                ))}
              </ul>
            )}
          </div>
        </section>

        {/* Now Trending Section */}
        <section className="bg-gray-900 p-6 rounded-2xl shadow-xl text-white w-full sm:flex-1 md:w-2/3 h-[570px] relative overflow-hidden">
          {/* Header */}
          <div className="absolute top-4 left-4 bg-gray-800 text-white px-3 py-1 text-sm rounded-full">
            🔥 Now Trending
          </div>

          {/* Background Image */}
          {trendingMovies.length > 0 && (
            <div className="absolute inset-0">
              <img
                src={trendingMovies[0].poster_url}
                alt={trendingMovies[0].title}
                className="w-full h-full object-cover opacity-40"
              />
            </div>
          )}

          <div>
            {trendingMovies.length > 0 && (
              <div className="trending-movies">
                {trendingMovies.map((movie) => (
                  <TrendingContent key={movie.$id} content={movie} />
                ))}
              </div>
            )}
          </div>
        </section>
      </div>

      <div className="wrapper">
        <section className="all-movies">
          <h2>You might like</h2>

          {isLoading ? (
            <Loading />
          ) : errorMessage ? (
            <p className="text-red-500">{errorMessage}</p>
          ) : (
            <ul>
              {movieList.map((movie) => (
                <MovieCard key={movie.id} movie={movie} />
              ))}
            </ul>
          )}
        </section>
      </div>
    </main>
  );
};

export default App;
