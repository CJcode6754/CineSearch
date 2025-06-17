import { Client, Databases, ID, Query } from "appwrite";

const PROJECT_ID = import.meta.env.VITE_APPWRITE_PROJECT_ID;
const DATABASE_ID = import.meta.env.VITE_APPWRITE_DATABASE_ID;
const COLLECTION_ID = import.meta.env.VITE_APPWRITE_COLLECTION_ID;
const TMDB_API_KEY = import.meta.env.VITE_TMDB_API_KEY;

const client = new Client()
    .setEndpoint('https://cloud.appwrite.io/v1')
    .setProject(PROJECT_ID);

const database = new Databases(client);

const fetchMovieDetails = async (movieId) => {
    try {
        const response = await fetch(
            `https://api.themoviedb.org/3/movie/${movieId}?api_key=${TMDB_API_KEY}&language=en-US`, {
                headers: {
                    Authorization: `Bearer ${TMDB_API_KEY}`,
                    "Content-Type": "application/json"
                }
            }
        );
        const data = await response.json();
        return {
            synopsis: data.overview,
            genre: data.genres.map(genre => genre.name),
            title: data.title,
        };
    } catch (error) {
        console.error('Error fetching movie details:', error);
        return { synopsis: '', genre: [], title: ''};
    }
};

export const updateSearchCount = async (searchTerm, movie) => {
    try {
        const movieDetails = await fetchMovieDetails(movie.id);
        
        const result = await database.listDocuments(DATABASE_ID, COLLECTION_ID, [
            Query.equal('searchTerm', searchTerm),
        ]);

        if (result.documents.length > 0) {
            const doc = result.documents[0];
            await database.updateDocument(DATABASE_ID, COLLECTION_ID, doc.$id, {
                count: (doc.count || 0) + 1,  // Ensure count is a number
                synopsis: movieDetails.synopsis || "",
                genre: movieDetails.genre.join(", "), // Convert array to string
                title: movieDetails.title || "Unknown",
            });
        } else {
            await database.createDocument(DATABASE_ID, COLLECTION_ID, ID.unique(), {
                searchTerm,
                count: 1,
                poster_url: movie.poster_path 
                    ? `https://image.tmdb.org/t/p/w780/${movie.poster_path}`
                    : "https://via.placeholder.com/780x1170?text=No+Image",
                movie_id: Number(movie.id),  // Ensure it's an integer
                synopsis: movieDetails.synopsis || "",
                genre: movieDetails.genre.join(", "), // Convert array to string
                title: movieDetails.title || "Unknown",
            });
        }
        return true;
    } catch (error) {
        throw new Error('Error updating search count: ' + error.message);
    }
};

export const getNowTrendingMovies = async () => {
    try {
        const result = await database.listDocuments(DATABASE_ID, COLLECTION_ID, [
            Query.limit(1),
            Query.orderDesc("count")
        ]);
        return result.documents;
    } catch (error) {
        throw new Error('Error fetching trending movies: ' + error.message);
    }
};

export const getTrendingMovies = async () => {
    try {
        const result = await database.listDocuments(DATABASE_ID, COLLECTION_ID, [
            Query.limit(3),
            Query.orderDesc("count")
        ]);
        return result.documents;
    } catch (error) {
        throw new Error('Error fetching trending movies: ' + error.message);
    }
};