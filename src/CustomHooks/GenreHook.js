const useSelectedGenre = (selectedGenre) => {
  if(selectedGenre.length <= 0) return "";
  const genreId = selectedGenre.map((genre) => genre.id);
  return genreId.reduce((acc, genre) => acc + ',' + genre);
}

export default useSelectedGenre;