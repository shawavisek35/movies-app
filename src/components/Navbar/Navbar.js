import React, { useState, useEffect } from "react";
import { Link, useNavigate } from 'react-router-dom';

//Material Ui Components
import BottomNavigation from "@mui/material/BottomNavigation";
import BottomNavigationAction from "@mui/material/BottomNavigationAction";

//icons
import Movie from "@mui/icons-material/Movie";
import Whatshot from "@mui/icons-material/Whatshot";
import Tv from "@mui/icons-material/Tv";
import Search from "@mui/icons-material/Search";

//Css Files
import "./Navbar.css";


const styles = {
  parent: {
    position: "fixed",
    zIndex: "100",
    background: "#0E185F",
    bottom: "0px",
    width: "100%",
    marginTop: "1000px"
  }
}

export default function NavBar() {
  const [value, setValue] = useState(0);
  const navigate = useNavigate();
  useEffect(() => {
    if(value === 0) navigate('/');
    else if(value === 1) navigate('/movies');
    else if(value === 2) navigate('/tv-series');
    else if(value === 3) navigate('/search');
  }, [value, navigate]);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
      <BottomNavigation style={styles.parent} value={value} onChange={handleChange}>
        <BottomNavigationAction
          className="nav-icons"
          label="Trending"
          value={0}
          icon={<Whatshot />}
        />
        <BottomNavigationAction
          className="nav-icons"
          label="Movies"
          value={1}
          icon={<Movie />}
        />
        <BottomNavigationAction
          className="nav-icons"
          label="Tv Series"
          value={2}
          icon={<Tv />}
        />
        <BottomNavigationAction
          className="nav-icons"
          label="Search"
          value={3}
          icon={<Search />}
        />
      </BottomNavigation>
  );
}
