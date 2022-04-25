import React from 'react';
import Pagination from '@mui/material/Pagination';
import Stack from '@mui/material/Stack';

export default function PaginationComponent({ pageNo, changePage }) {

  const handleChange = (event, page) => {
    console.log(page);
    changePage(page);
  }

  return (
    <div style={{marginTop: "10px"}}>
      <Stack spacing={2}
      >
        <Pagination count={10} color="secondary" onChange={handleChange} />
      </Stack>
    </div>
  )
}
