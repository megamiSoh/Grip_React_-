import { Link } from "react-router-dom";
import styled from "styled-components";

const FooterContainer = styled.div`
  position: fixed;
  z-index: 99;
  background-color: #fff;
  bottom: 0;
  display: flex;
  justify-content: space-around;
  width: 100%;
  max-width: 800px;
  border-top: 1px solid black;
  & > a {
    display: inline-block;
    padding: 10px;
    width: 100%;
    text-align: center;
  }
`;

export const Footer = () => {
  return (
    <FooterContainer>
      <Link to="/">검색</Link>
      <Link to="/favoriteMovies">즐겨찾기</Link>
    </FooterContainer>
  );
};
