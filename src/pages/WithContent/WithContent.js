import React, { useState, useEffect } from "react";
import axios from 'axios';

//Higher order function
function WithContent(OldPage, dataApi) {
  //new react component
  return function NewPageWithContent() {
    const [content, setContent] = useState([]);
    const [page, setPage] = useState(1);
    const [totalPages, setTotalPages] = useState(10);

    useEffect(() => {
      const fetchTvSeries = async () => {
        const { data } = await axios.get(
          `${dataApi}&page=${page}`
        );
        setTotalPages(data.total_pages);
        setContent(data.results);
      };

      fetchTvSeries();
      window.scroll(0, 0);
    }, [page]);
    return <OldPage content={content} page={page} setPage={setPage} totalPages={totalPages} />;
  };
}

export default WithContent;
