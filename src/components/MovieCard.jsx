import React from "react";

const MovieCard = ({
  movie: { id, title, vote_average, poster_path, original_language, release_date },
}) => {
  return (
    <div className="movie-card">
      <img
        src={
          poster_path
            ? `https://image.tmdb.org/t/p/w500/${poster_path}`
            : "/no-movie.png"
        }
        alt={title}
      />

      <div className="content relative p-4 bg-gray-900 text-white rounded-lg">
        {/* Movie Title */}
        <h3 className="text-lg font-bold max-w-40">{title}</h3>

        {/* Rating & Info */}
        <div className="rating flex items-center space-x-2 mt-2 text-sm text-gray-400">
          <div className="flex items-center space-x-1">
            <img src="star.svg" alt="Star Icon" className="w-4 h-4" />
            <p>{vote_average ? vote_average.toFixed(1) : "N/A"}</p>
          </div>

          <span className="text-gray-500">•</span>
          <p className="lang uppercase">{original_language}</p>

          <span className="text-gray-500">•</span>
          <p className="year">{release_date ? release_date.split("-")[0] : "N/A"}</p>
        </div>

        {/* Play Button Positioned on Top Right */}
        <button className="absolute top-2 right-2 bg-gray-800 p-2 rounded-full hover:bg-gray-700 transition">
          <a href={`https://www.themoviedb.org/movie/${id}`} target="_blank" rel="noopener noreferrer" className="cursor-pointer">
          <img src="play.png" alt="Play Button" className="w-6 h-6" />
          </a>
        </button>
      </div>

    </div>
  );
};

export default MovieCard;
