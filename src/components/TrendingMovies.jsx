import { useState, useEffect } from "react";
import { getTrendingMovies } from "../utils/appwrite";
import TrendingContent from "../components/TrendingContent";
import React from "react";
export default function TrendingMovies() {
  const [trendingMovies, setTrendingMovies] = useState([]);
    const [errorMessage, setErrorMessage] = useState(null);


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
    loadTrendingMovies();
  }, []);

  useEffect(() => {
    loadNowTrendingMovies();
  }, []);
  return (
    <div className="flex flex-wrap gap-4 w-full px-5 md:px-20 lg:px-40 my-5">
      {/* New Trailer Section */}
      <section className="bg-gray-900 p-6 rounded-2xl shadow-xl text-white w-full sm:w-[500px] md:w-1/3">
        {/* Header */}
        <div className="flex justify-between items-center mb-4">
          <div className="flex items-center space-x-2">
            <span className="text-xl">🔥</span>
            <h3 className="text-lg font-semibold">Top 3 Search Movies</h3>
          </div>
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
                    <span className="text-sm ">
                      <a
                        href={`https://www.themoviedb.org/movie/${movie.movie_id}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="cursor-pointer"
                      >
                        View on TMDB
                      </a>
                    </span>
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
  );
}
