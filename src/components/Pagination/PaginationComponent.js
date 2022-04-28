import React from 'react';
import Pagination from '@mui/material/Pagination';
import Stack from '@mui/material/Stack';
import { createTheme, ThemeProvider } from "@mui/material/styles";

export default function PaginationComponent({ pageNo, changePage, totalPages }) {


  const darkTheme = createTheme({
    palette: {
      mode: 'dark',
    },
  })

  return (
    <ThemeProvider theme={darkTheme}>
      <div style={{marginTop: "30px"}}>
        <Stack spacing={2}
        value={pageNo}
        >
          <Pagination count={totalPages || 10} color="warning" onChange={(event, page) => changePage(page)} />
        </Stack>
      </div>
    </ThemeProvider>
  )
}
