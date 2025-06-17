const API_BASE_URL = "https://api.themoviedb.org/3";
const API_KEY = import.meta.env.VITE_TMDB_API_KEY;

const API_OPTIONS = {
  method: "GET",
  headers: {
    accept: "application/json",
    Authorization: `Bearer ${API_KEY}`,
  },
};

export const fetchMoviesByQuery = async (query) => {
  try {
    const url = `${API_BASE_URL}/search/movie?query=${encodeURIComponent(
      query
    )}`;
    const res = await fetch(url, API_OPTIONS);
    if (!res.ok) throw new Error("Failed to fetch search results");
    const data = await res.json();
    return data.results;
  } catch (error) {
    console.error("Error fetching movies by query:", error);
    return [];
  }
};

export const fetchPopularMovies = async () => {
  try {
    const url = `${API_BASE_URL}/discover/movie?sort_by=popularity.desc`;
    const res = await fetch(url, API_OPTIONS);
    if (!res.ok) throw new Error("Failed to fetch popular movies");
    const data = await res.json();
    return data.results;
  } catch (error) {
    console.error("Error fetching popular movies:", error);
    return [];
  }
};

export const fetchTvSeriesByQuery = async (query) => {
  try {
    const url = `${API_BASE_URL}/search/tv?query=${encodeURIComponent(
      query
    )}`;
    const res = await fetch(url, API_OPTIONS);
    if (!res.ok) throw new Error("Failed to fetch search results");
    const data = await res.json();
    return data.results;
  } catch (error) {
    console.error("Error fetching tv series by query:", error);
    return [];
  }
};

export const fetchPopularTvSeries = async () => {
    try {
        const url = `${API_BASE_URL}/discover/tv?sort_by=popularity.desc`;
        const res = await fetch(url, API_OPTIONS);
        if (!res.ok) throw new Error("Failed to fetch TV series");
        const data = await res.json();
        return data.results;
    } catch (error) {
        console.error("Error fetching TV series:", error);
        return [];
    }
}
