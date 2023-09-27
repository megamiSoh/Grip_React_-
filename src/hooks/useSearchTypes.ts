import { useLocation } from "react-router-dom";
import { SearchType } from "../stores/interfaces";
import { useEffect } from "react";

export default function useSearchTypes() {
  const router = useLocation();
  const currentPath = router.pathname;
  const headerTitles: { [key: string]: string } = {
    "/": "영화 검색",
    "/favoriteMovies": "내 즐겨 찾기",
  };

  // componentDidMount시, 스크롤 최상단으로 이동
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return {
    type: currentPath as SearchType,
    headerTitle: headerTitles[currentPath] ?? "영화 검색",
  };
}
