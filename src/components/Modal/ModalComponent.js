import React, { useEffect, useState } from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import axios from 'axios';
import { IMAGE_300, IMAGE_500, UNAVAILABLE, UNAVAILABLE_LANDSCAPE } from '../../config/config';
import './Modal.css';
import StarIcon from '@mui/icons-material/Star';
import { Button, Chip } from '@mui/material';
import { YouTube } from '@mui/icons-material';
import Avatar from "@mui/material/Avatar";
import Stack from "@mui/material/Stack";

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: "80%",
  maxHeight: "80%",
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  background: "#000000",
  p: 4,
  color: "#ffffff",
  overflowY: "scroll"
};

export default function ModalComponent({open, handleClose, contentId, mediaType}) {

  const [ contentInfo, setContentInfo ] = useState(null);
  const [ video, setVideo ] = useState("");
  const [ cast, setCast ] = useState([]);

  useEffect(() => {
    const fetchContent = async () => {
      const { data } = await axios.get(`${process.env.REACT_APP_API_HOST}/${mediaType}/${contentId}?api_key=${process.env.REACT_APP_API_KEY}&language=en-US`);
      setContentInfo(data);
      
    }

    const fetchVideo = async () => {
      const { data } = await axios.get(`${process.env.REACT_APP_API_HOST}/${mediaType}/${contentId}/videos?api_key=${process.env.REACT_APP_API_KEY}&language=en-US`);
      setVideo(data.results.filter((res) => {
        return res.name === 'Official Trailer';
      })[0]?.key);
    }

    const fetchCast = async () => {
      const { data } = await axios.get(`${process.env.REACT_APP_API_HOST}/${mediaType}/${contentId}/credits?api_key=${process.env.REACT_APP_API_KEY}&language=en-US`);
      setCast(data.cast);
    }

    fetchContent()
    
    fetchCast()

    fetchVideo()
  }, [contentId, mediaType])

  return (
    
    <div>
      {
        contentInfo
        ?
        <Modal
          open={open}
          onClose={handleClose}
          aria-labelledby="modal-modal-title"
          aria-describedby="modal-modal-description"
        >
          <div className="modal-box">
            <Box sx={style}>
              <div style={{marginBottom: "20px"}}>
                <Typography id="modal-modal-title" variant="h6" component="h2">
                {contentInfo.title || contentInfo.name} ( {(contentInfo.first_air_date || contentInfo.release_date || '.....').split('-')[0]} ), <i className='tagline'>{contentInfo.tagline}</i>
                </Typography>
              </div>
              <Typography component={'span'} variant={'body2'} id="modal-modal-description" sx={{ mt: 2 }}>
                <div className="modal-body">
                  <div className="modal-img">
                    <img src={contentInfo.poster_path ? `${IMAGE_500}${contentInfo.poster_path}` : UNAVAILABLE_LANDSCAPE} alt="" />
                  </div>
                  <div className="about-movie">
                    <div className="movie-overview">
                      <div>
                        <p className="overview-title">Overview</p>
                        <p className='movie-desc'>{contentInfo.overview}</p>
                      </div>  
                      <div style={{marginTop: "20px", marginBottom: "20px"}}>
                        <p className="overview-title">Rating</p>
                        <p className='movie-desc'>
                          {contentInfo.vote_average}
                          <span><StarIcon color="warning"/></span>
                        </p>
                      </div>
                      <div style={{marginBottom: "20px"}}>
                      <p className="overview-title">Cast</p>
                      <div style={{display: "flex", flexWrap: "wrap", marginLeft: "0px"}}>
                        {
                          cast.length>0 && cast.slice(0,25).map((c) => {  
                            return(
                              <Stack direction="row" spacing={2} sx={{ml: 1}}>
                                <Avatar alt={c.name} src={c.profile_path ? `${IMAGE_300}/${c.profile_path}` : `${UNAVAILABLE}`}/>
                              </Stack>
                            )
                          })
                        }
                      </div>
                      </div>
                      <div style={{marginBottom: "20px"}}>
                      <p className="overview-title">Genres</p>
                        <Stack direction="row" spacing={1}>
                          <Chip label={mediaType==="tv" ? "TV Series" : "Movies"} color="primary" />
                          {
                            contentInfo.genres && contentInfo.genres.map((cg) => {
                              return <Chip label={cg.name} color="primary" />
                            })
                          }
                        </Stack>
                      </div>
                      <Button
                        variant="contained"
                        startIcon={<YouTube />}
                        color="secondary"
                        target="__blank"
                        href={`https://www.youtube.com/watch?v=${video}`}
                      >
                        Watch the Trailer
                      </Button>
                    </div>
                  </div>
                </div>
              </Typography>
            </Box>
          </div>
        </Modal>
        :
        null
      }
    </div>
  )
}
