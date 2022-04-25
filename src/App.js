import './App.css';
import Header from './components/Header/Header';
import NavBar from './components/Navbar/Navbar';
import { Routes, Route } from 'react-router-dom';
import Trending from './pages/Trending/Trending';
import { Container } from '@mui/material';
import Movies from './pages/Movies/Movies';
import TvSeries from './pages/TvSeries/TvSeries';
import Search from './pages/Search/Search';

function App() {
  return (
    <div className='app'>
      <Header />
      <Container className="home-container">
        <Routes>
          <Route path='/' element={<Trending />} />
          <Route path='/movies' element={<Movies />} />
          <Route path='/tv-series' element={<TvSeries />} />
          <Route path='/search' element={<Search />} /> 
        </Routes>
      </Container>
      <NavBar />
    </div>
  );
}

export default App;
