import React from "react";

const TrendingContent = ({ content }) => {
  if (!content) {
    return <div className="text-gray-300 p-6">No movie data available.</div>;
  }

  const genreList = content.genre
  ? content.genre.split(", ").map((genre) => genre.trim()) // Split and trim spaces
  : [];


  return (
    <div className="relative z-10 p-6 pt-[250px]">
      <div className="flex space-x-2 mb-2">
        <ul className="flex flex-wrap gap-2">
          {genreList.length>0 ?(
            genreList.map((genre, index)=>(
                <li key={index}>
                    <span className="bg-gray-700 px-2 py-1 text-xs rounded-md">{genre}</span>
                </li>
            ))
          ) : (
            <li>
              <span className="bg-gray-700 px-2 py-1 text-xs rounded-md">
                No genres available
              </span>
            </li>
          )}
        </ul>
      </div>

      <h3 className="text-2xl font-bold">{content.title || "Untitled"}</h3>
      <p className="text-gray-300 text-sm mt-2 max-w-150 text-justify hidden sm:block">
        {content.synopsis || "No synopsis available."}
      </p>

      <div className="mt-4 flex space-x-4">
        <button className="bg-white text-black px-4 py-2 rounded-full flex items-center space-x-2">
          <img src="play.png" alt="Play Button" className="w-6 h-6" /> <span> <a href={`https://www.themoviedb.org/movie/${content.movie_id}`} target="_blank" rel="noopener noreferrer" className="cursor-pointer">View on TMDB</a></span>
        </button>
      </div>
    </div>
  );
};

export default TrendingContent;
