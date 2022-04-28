import React from 'react';
import "./ContentCard.css";
import Badge from '@mui/material/Badge';
import { IMAGE_300, UNAVAILABLE } from "../../config/config";

export default function ContentCard({ 
  id,
  isAdult,
  poster,
  mediaType,
  title,
  vote,
  date,
  handleOpen
 }) {
  return (
    <div className='card-body' onClick={() => handleOpen(id, mediaType)}>
      <Badge className='badge' badgeContent={vote} color={vote > 6 ? "primary" : "secondary"} />
      <div className='poster-trending'>
        <Badge className='badge' badgeContent={`18+`} color={`warning`} 
          anchorOrigin={{
            vertical: 'bottom',
            horizontal: 'right',
          }}
          invisible={isAdult ? false : true}
        />
        <img src={poster ? `${IMAGE_300}/${poster}` : `${UNAVAILABLE}`} alt="poster-300" />
      </div>
      <div className='movie-info'>
        <p>{title}</p>
      </div>
    </div>
  )
}
