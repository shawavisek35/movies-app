import axios from "axios";
import React, { useEffect, useState } from "react";
import ContentCard from "../../components/ContentCard/ContentCard";
import PaginationComponent from "../../components/Pagination/PaginationComponent";

export default function Movies() {
  const [content, setContent] = useState([]);
  const [page, setPage] = useState(1);

  
  useEffect(() => {
    const fetchMovies = async () => {
      const { data } = await axios.get(
        `${process.env.REACT_APP_API_HOST}/discover/movie?api_key=${process.env.REACT_APP_API_KEY}&language=en-US&sort_by=popularity.desc&include_adult=false&include_video=false&page=1&with_watch_monetization_types=flatrate&page=${page}`
      );
      setContent(data.results);
    };
    
    fetchMovies();
    window.scroll(0, 0);
  }, [ page ]);

  return (
    <div className="content">
      <h1 className="pageTitle">Movies</h1>
      <div className="movies-container">
        {content.length > 0 &&
          content.map((c) => (
            <ContentCard
              key={c.id}
              id={c.id}
              isAdult={c.adult}
              poster={c.poster_path}
              mediaType={c.media_type}
              title={c.title || c.name}
              vote={c.vote_average}
              date={c.first_air_date || c.release_date}
            />
          ))}
      </div>
      <PaginationComponent pageNo={page} changePage={setPage} />
    </div>
  );
}
