import { Route, Routes } from "react-router-dom";
import { Layout } from "../components/Layout";
import SearchMovies from "./SearchMovies";
import FavoriteMovies from "./FavoriteMovies";

export default function Main() {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={<SearchMovies />} />
        <Route path="searchMovies" element={<SearchMovies />} />
        <Route path="favoriteMovies" element={<FavoriteMovies />} />
      </Route>
    </Routes>
  );
}
