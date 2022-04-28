import React, {useState} from "react";
import ContentCard from "../../components/ContentCard/ContentCard";
import Genre from "../../components/Genre/Genre";
import ModalComponent from "../../components/Modal/ModalComponent";
import PaginationComponent from "../../components/Pagination/PaginationComponent";
import WithContent from "../WithContent/WithContent";
const dataApi = `${process.env.REACT_APP_API_HOST}/discover/tv?api_key=${process.env.REACT_APP_API_KEY}&language=en-US&sort_by=popularity.desc&page=1&timezone=America%2FNew_York&include_null_first_air_dates=false&with_watch_monetization_types=flatrate&with_status=0&with_type=0`;

function TvSeries({content, page, setPage, totalPages, genre, setGenre, selectedGenre, handleGenreAddition, handleGenreDeletion}) {

  const [open, setOpen] = useState(false);
  const [contentId, setContentId] = useState(null);
  const [mediaType, setMediaType] = useState("");
  const handleOpen = (id, mediaType) => {
    setOpen(true);
    setContentId(id);
    setMediaType(mediaType);
  }
  const handleClose = () => {
    setOpen(false);
    setContentId(null);
  }

  return (
    <div className="content">
      <h1 className="pageTitle">TV Series</h1>
      <Genre 
        genre={genre}
        selectedGenre={selectedGenre}
        setGenre={setGenre}
        handleGenreAddition={handleGenreAddition}
        handleGenreDeletion={handleGenreDeletion}
        mediaType='tv'
      />
      <div className="movies-container">
        {content.length > 0 &&
          content.map((c) => (
            <ContentCard
              key={c.id}
              id={c.id}
              isAdult={c.adult}
              poster={c.poster_path}
              mediaType='tv'
              title={c.title || c.name}
              vote={c.vote_average}
              date={c.first_air_date || c.release_date}
              handleOpen={handleOpen}
            />
          ))}
      </div>
      {
        open
        ?
        <ModalComponent 
          open={open} 
          handleClose={handleClose}
          contentId={contentId}
          mediaType={mediaType}
        />
        :
        null
      }
      {totalPages>1 ? <PaginationComponent pageNo={page} changePage={setPage} totalPages={totalPages} /> : null}
    </div>
  );
}

export default WithContent(TvSeries, dataApi);
