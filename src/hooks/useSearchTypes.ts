import { useLocation } from "react-router-dom";
import { SearchType } from "../stores/interfaces";

export default function useSearchTypes() {
  const router = useLocation();
  const currentPath = router.pathname;
  const headerTitles: { [key: string]: string } = {
    "/": "영화 검색",
    "/favoriteMovies": "즐겨 찾기",
  };

  return {
    type: currentPath as SearchType,
    headerTitle: headerTitles[currentPath] ?? "영화 검색",
  };
}
