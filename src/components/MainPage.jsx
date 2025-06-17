import { useCallback, useEffect, useState } from "react";
import MovieCard from "../components/MovieCard";
import { useDebounce } from "react-use";
import Loading from "../components/Loading";
import { updateSearchCount } from "../utils/appwrite";
import TrendingMovies from "../components/TrendingMovies";
import { useOutletContext } from "react-router-dom";
import { fetchMoviesByQuery, fetchPopularMovies } from "../utils/api";

export default function MainPage() {
  const { searchTerm } = useOutletContext(); // From MainLayout
  const [debouncedSearchTerm, setDebouncedSearchTerm] = useState("");
  const [errorMessage, setErrorMessage] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [movieList, setMovieList] = useState([]);

  useDebounce(() => {
    setDebouncedSearchTerm(searchTerm);
  }, 800, [searchTerm]);

  const fetchMovies = useCallback(async (query = "") => {
    setIsLoading(true);
    setErrorMessage(null);

    try {
      const data = query
        ? await fetchMoviesByQuery(query)
        : await fetchPopularMovies();

      if (!data || data.length === 0) {
        setErrorMessage("No movies found");
        setMovieList([]);
        return;
      }

      setMovieList(data);

      if (query && data.length > 0) {
        await updateSearchCount(query, data[0]);
      }
    } catch (error) {
      setErrorMessage("Error fetching movies. Please try again later.");
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchMovies(debouncedSearchTerm);
  }, [debouncedSearchTerm, fetchMovies]);

  return (
    <main>
      <TrendingMovies />
      <div className="wrapper">
        <section className="all-movies">
          <h2>Movies You might like</h2>

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
}
