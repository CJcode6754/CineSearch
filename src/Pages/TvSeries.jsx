import React from "react";
import TvSeriesCard from "../components/TvSeriesCard";
import { useCallback, useEffect, useState } from "react";
import { useDebounce } from "react-use";
import Loading from "../components/Loading";
import { useOutletContext } from "react-router-dom";
import { fetchTvSeriesByQuery, fetchPopularTvSeries } from "../utils/api";

export default function TvSeries() {
  const { searchTerm } = useOutletContext();
  const [debouncedSearchTerm, setDebouncedSearchTerm] = useState("");
  const [errorMessage, setErrorMessage] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [tvSeriesList, setTvSeriesList] = useState([]);

  useDebounce(
    () => {
      setDebouncedSearchTerm(searchTerm);
    },
    800,
    [searchTerm]
  );

  const fetchTvSeries = useCallback(async (query = "") => {
    setIsLoading(true);
    setErrorMessage(null);

    try {
      const data = query
        ? await fetchTvSeriesByQuery(query)
        : await fetchPopularTvSeries();

      if (!data || data.length === 0) {
        setErrorMessage("No Tv-Series found");
        setTvSeriesList([]);
        return;
      }

      const validTvSeries = data.filter(
        (tv) => tv && tv.id && (tv.name || tv.title)
      );

      setTvSeriesList(validTvSeries);

      if (query && validTvSeries.length > 0) {
        await updateSearchCount(query, validTvSeries[0]);
      }
    } catch (error) {
      setErrorMessage("Error fetching movies. Please try again later.");
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchTvSeries(debouncedSearchTerm);
  }, [debouncedSearchTerm, fetchTvSeries]);

  console.log(tvSeriesList);

  return (
    <section className="all-movies px-24 py-12">
      <h2>You might like</h2>

      {isLoading ? (
        <Loading />
      ) : errorMessage ? (
        <p className="text-red-500">{errorMessage}</p>
      ) : (
        <ul>
          {tvSeriesList.map((tv) => (
            <TvSeriesCard key={tv.id} tv={tv} />
          ))}
        </ul>
      )}
    </section>
  );
}
