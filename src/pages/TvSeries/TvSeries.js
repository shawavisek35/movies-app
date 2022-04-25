import axios from "axios";
import React, { useEffect, useState } from "react";
import ContentCard from "../../components/ContentCard/ContentCard";
import PaginationComponent from "../../components/Pagination/PaginationComponent";

export default function TvSeries() {
  const [content, setContent] = useState([]);
  const [page, setPage] = useState(1);

  

  useEffect(() => {
    const fetchTvSeries = async () => {
      const { data } = await axios.get(
        `${process.env.REACT_APP_API_HOST}/discover/tv?api_key=${process.env.REACT_APP_API_KEY}&language=en-US&sort_by=popularity.desc&page=1&timezone=America%2FNew_York&include_null_first_air_dates=false&with_watch_monetization_types=flatrate&with_status=0&with_type=0&page=${page}`
      );
      setContent(data.results);
    };

    fetchTvSeries();
    window.scroll(0, 0);
  }, [ page ]);

  return (
    <div className="content">
      <h1 className="pageTitle">TV Series</h1>
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
