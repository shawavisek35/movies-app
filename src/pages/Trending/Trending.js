import axios from "axios";
import React, { useEffect, useState } from "react";
import ContentCard from "../../components/ContentCard/ContentCard";
import PaginationComponent from "../../components/Pagination/PaginationComponent";
import "./Trending.css";

export default function Trending() {
  const [content, setContent] = useState([]);
  const [ page, setPage ] = useState(1);

  
  useEffect(() => {
    const fetchTrendingContent = async () => {
      const { data } = await axios.get(
        `${process.env.REACT_APP_API_HOST}/trending/all/day?api_key=${process.env.REACT_APP_API_KEY}&page=${page}`
      );
      console.log(data);
      setContent(data.results);
    };
    fetchTrendingContent();
    window.scroll(0, 0);
  }, [page]);

  return (
    <div className="content">
      <h1 className="pageTitle">Trending</h1>
      <div className="trending-container">
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
          ))
        }
      </div>
      <PaginationComponent pageNo={page} changePage={setPage} />
    </div>
  );
}
