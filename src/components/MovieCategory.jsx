import React, { useEffect, useState } from "react";
import axios from "axios";

const API_KEY =  import.meta.env.VITE_TMDB_API_KEY;
const BASE_URL = "https://api.themoviedb.org/3";

const MovieCategories = () => {
  const [categories, setCategories] = useState({
    popular: [],
    topRated: [],
    upcoming: [],
    nowPlaying: [],
  });

  useEffect(() => {
    const fetchMovies = async () => {
      try {
        const [popular, topRated, upcoming, nowPlaying] = await Promise.all([
          axios.get(`${BASE_URL}/movie/popular?api_key=${API_KEY}`),
          axios.get(`${BASE_URL}/movie/top_rated?api_key=${API_KEY}`),
          axios.get(`${BASE_URL}/movie/upcoming?api_key=${API_KEY}`),
          axios.get(`${BASE_URL}/movie/now_playing?api_key=${API_KEY}`),
        ]);

        setCategories({
          popular: popular.data.results,
          topRated: topRated.data.results,
          upcoming: upcoming.data.results,
          nowPlaying: nowPlaying.data.results,
        });
      } catch (error) {
        console.error("Error fetching movies:", error);
      }
    };

    fetchMovies();
  }, []);

  return (
    <div className="p-4">
      <h2 className="text-xl font-bold">Movie Categories</h2>
      {Object.entries(categories).map(([category, movies]) => (
        <div key={category} className="my-4">
          <h3 className="text-lg font-semibold capitalize">{category.replace(/([A-Z])/g, " $1")}</h3>
          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-4">
            {movies.slice(0, 5).map((movie) => (
              <div key={movie.id} className="p-2 border rounded-lg">
                <img
                  src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
                  alt={movie.title}
                  className="w-full h-auto rounded-lg"
                />
                <p className="text-sm mt-2">{movie.title}</p>
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
};

export default MovieCategories;
