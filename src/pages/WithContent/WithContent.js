import React, { useState, useEffect } from "react";
import axios from 'axios';
import useSelectedGenre from "../../CustomHooks/GenreHook";


//Higher order function
function WithContent(OldPage, dataApi) {
  //new react component
  return function NewPageWithContent() {
    const [content, setContent] = useState([]);
    const [page, setPage] = useState(1);
    const [totalPages, setTotalPages] = useState(10);
    const [genre, setGenre] = useState([]);
    const [selectedGenre, setSelectedGenre] = useState([]);
    const genreForUrl = useSelectedGenre(selectedGenre);

    

    useEffect(() => {
      const fetchTvSeries = async () => {
        const { data } = await axios.get(
          `${dataApi}&page=${page}&with_genres=${genreForUrl}`
        );
        setTotalPages(data.total_pages);
        setContent(data.results);
      };

      fetchTvSeries();
      window.scroll(0, 0);
    }, [page, genreForUrl]);

    const handleGenreAddition = (newGenre) => {
      setSelectedGenre([...selectedGenre, newGenre]);
      setGenre(genre.filter((g) => g.id !== newGenre.id));
    }

    const handleGenreDeletion = (newGenre) => {
      setGenre([...genre, newGenre]);
      setSelectedGenre(selectedGenre.filter((g) => g.id !== newGenre.id));
    }

    return (
      <>
        <OldPage 
          content={content} 
          page={page} 
          setPage={setPage} 
          totalPages={totalPages} 
          genre={genre}
          selectedGenre={selectedGenre}
          setGenre={setGenre}
          setSelectedGenre={setSelectedGenre}
          handleGenreAddition={handleGenreAddition}
          handleGenreDeletion={handleGenreDeletion}
        />;
        
      </>
    ) 
  };
}

export default WithContent;
