import { useLocation } from "react-router-dom";
import { styled } from "styled-components";

const HeaderContainer = styled.div`
  width: 100%;
  padding: 10px;
  text-align: center;
  font-weight: bold;
  border-bottom: 1px solid gray;
`;

export const Header = () => {
  const { pathname } = useLocation();
  const headerTitles: { [key: string]: string } = {
    "/": "영화 검색",
    "/favoriteMovies": "즐겨 찾기",
  };

  return (
    <HeaderContainer>{headerTitles[pathname] ?? "영화 검색"}</HeaderContainer>
  );
};
