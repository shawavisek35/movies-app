import React from "react";
import ContentCard from "../../components/ContentCard/ContentCard";
import PaginationComponent from "../../components/Pagination/PaginationComponent";
import WithContent from "../WithContent/WithContent";
import "./Trending.css";
const dataApi = `${process.env.REACT_APP_API_HOST}/trending/all/day?api_key=${process.env.REACT_APP_API_KEY}`;


function Trending({content, page, setPage}) {

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

export default WithContent(Trending, dataApi);
