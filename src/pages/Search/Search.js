import { Button, Tab, Tabs, TextField } from '@mui/material'
import React, { useState, useEffect } from 'react';
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { SearchOutlined } from '@mui/icons-material';
import "./Search.css";
import axios from "axios";
import ContentCard from '../../components/ContentCard/ContentCard';
import PaginationComponent from '../../components/Pagination/PaginationComponent';
import ModalComponent from '../../components/Modal/ModalComponent';
import useDebounce from '../../CustomHooks/useDebounce';

export default function Search() {

  const darkTheme = createTheme({
    palette: {
      mode: "dark",
      primary: {
        main: "#ffffff"
      }
    }
  })

  const [open, setOpen] = useState(false);
  const [contentId, setContentId] = useState(null);
  const [mediaType2, setMediaType2] = useState(0);
  const handleOpen = (id, mediaType) => {
    setOpen(true);
    setContentId(id);
    setMediaType2(mediaType);
  }
  const handleClose = () => {
    setOpen(false);
    setContentId(null);
  }

  const [mediaType, setMediaType] = useState(0);
  const [page, setPage] = useState(1);
  const [searchText, setSearchText] = useState("");
  const [content, setContent] = useState([]);
  const [noOfPages, setNoOfPages] = useState(0);

  const fetchData = async(text) => {
    const { data } = await axios.get(`${process.env.REACT_APP_API_HOST}/search/${mediaType===0 ? 'movie' : 'tv'}?api_key=${process.env.REACT_APP_API_KEY}&language=en-US${text.length===0 ? "" : `&query=${text}`}&page=1&include_adult=false`);
    setContent(data.results);
    setNoOfPages(data.total_pages);
    setSearchText(text);
  }

  const optimizedFetch = useDebounce(fetchData);

  
  useEffect(() => {
    const fetchContent = async() => {
      const { data } = await axios.get(`${process.env.REACT_APP_API_HOST}/search/${mediaType===0 ? 'movie' : 'tv'}?api_key=${process.env.REACT_APP_API_KEY}&language=en-US${searchText.length===0 ? "" : `&query=${searchText}`}&page=${page}&include_adult=false`);
      setContent(data.results);
      setNoOfPages(data.total_pages);
    }
    window.scroll(0, 0);  
    fetchContent();
    // eslint-disable-next-line
  }, [page, mediaType])

  return (
    <>
      <ThemeProvider theme={darkTheme}>
        <div className='search-container'>
          <TextField 
            id="outlined-basic" 
            label={"Search"} 
            variant="outlined" 
            className='search-area'
            //value={searchText}
            onChange={(event) => {
              optimizedFetch(event.target.value);
            }}
          />
          <Button variant="outlined" startIcon={<SearchOutlined />}>
            Search
          </Button>
        </div>
        <div className="tabs-container">
          <Tabs 
            value={mediaType} 
            onChange={(event, value) => {
              setMediaType(value);
              setPage(1);
            }}
            >
            <Tab label="Movies" />
            <Tab label="TV Series" />
          </Tabs>
        </div>
      </ThemeProvider>
      {
        (searchText.length>2 && content.length === 0)
        ?
        <div className="movies-container">
          <h1>No {mediaType ? "TV Series" : "Movies"} Found</h1>
        </div>
        : 
        <div className="movies-container">
          {content.length > 0 &&
            content.map((c) => (
              <ContentCard
                key={c.id}
                id={c.id}
                isAdult={c.adult}
                poster={c.poster_path}
                mediaType={mediaType ? "tv" : "movie"}
                title={c.title || c.name}
                vote={c.vote_average}
                date={c.first_air_date || c.release_date}
                handleOpen={handleOpen}
              />
            ))}
        </div>
      }
      {
        open
        ?
        <ModalComponent 
          open={open} 
          handleClose={handleClose}
          contentId={contentId}
          mediaType={mediaType2}
        />
        :
        null
      }
      <div style={{display: "flex", justifyContent: "center"}}>
        {
          noOfPages>1 && (<PaginationComponent pageNo={page} changePage={setPage} totalPages={noOfPages} />)
        }
      </div>
    </>
  )
}
