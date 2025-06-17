import React from "react";
import AnimeCard from "../components/AnimeCard";
import { useCallback, useEffect, useState } from "react";
import { useDebounce } from "react-use";
import Loading from "../components/Loading";
import { useOutletContext } from "react-router-dom";
import { fetchAnimatedByQuery, fetchPopularAnimated } from "../utils/api";

export default function Anime() {
  const { searchTerm } = useOutletContext();
  const [debouncedSearchTerm, setDebouncedSearchTerm] = useState("");
  const [errorMessage, setErrorMessage] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [animatedList, setAnimatedList] = useState([]);

  useDebounce(
    () => {
      setDebouncedSearchTerm(searchTerm);
    },
    800,
    [searchTerm]
  );

  const fetchAnimated = useCallback(async (query = "") => {
    setIsLoading(true);
    setErrorMessage(null);

    try {
      const data = query
        ? await fetchAnimatedByQuery(query)
        : await fetchPopularAnimated();

      if (!data || data.length === 0) {
        setErrorMessage("No Animated Movies found");
        setAnimatedList([]);
        return;
      }

      const validAnimated = data.filter(
        (anime) => anime && anime.id && (anime.name || anime.title)
      );

      setAnimatedList(validAnimated);

      if (query && validAnimated.length > 0) {
        await updateSearchCount(query, validAnimated[0]);
      }
    } catch (error) {
      setErrorMessage("Error fetching movies. Please try again later.");
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchAnimated(debouncedSearchTerm);
  }, [debouncedSearchTerm, fetchAnimated]);

  return (
    <section className="all-movies px-24 py-12">
      <h2>Animated Movies You might like</h2>

      {isLoading ? (
        <Loading />
      ) : errorMessage ? (
        <p className="text-red-500">{errorMessage}</p>
      ) : (
        <ul>
          {animatedList.map((anime) => (
            <AnimeCard key={anime.id} anime={anime}/>
          ))}
        </ul>
      )}
    </section>
  );
}
