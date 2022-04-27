import React, {useEffect} from 'react';
import Chip from '@mui/material/Chip';
import Stack from '@mui/material/Stack';
import { createTheme, ThemeProvider } from "@mui/material/styles";
import axios from "axios";
import "./Genre.css";

export default function Genre({genre, setGenre, selectedGenre, handleGenreAddition, handleGenreDeletion, mediaType}) {

  const WhiteColor = createTheme({
    palette: {
      secondary: {
        main: "#ffffff"
      }
    }
  })

  useEffect(() => {
    async function fetchGenres() {
      const { data } = await axios.get(`
      ${process.env.REACT_APP_API_HOST}/genre/${mediaType}/list?api_key=${process.env.REACT_APP_API_KEY}&language=en-US`);
      setGenre(data.genres);
    }
    fetchGenres();
  }, [setGenre, mediaType])

  return (
    <ThemeProvider theme={WhiteColor} >
      <div className="genre-container">
        {
          selectedGenre && selectedGenre.map((g) => {
            return (
              <Stack direction="row" spacing={2} key={g.id} className="genre-chip">
                <Chip 
                  label={g.name}
                  clickable 
                  size='small'
                  onDelete={() => handleGenreDeletion(g)}
                  color='primary'
                />
                
              </Stack>
            )
          })
        }
        {
          genre && genre.map((g) => {
            return (
              <Stack direction="row" spacing={1}  key={g.id} className="genre-chip">
                <Chip 
                  label={g.name}  
                  clickable 
                  size='small'
                  onClick={() => handleGenreAddition(g)}
                  color='secondary'
                />
            </Stack>
            )
          })
        }
      </div>
    </ThemeProvider>
  )
}
