import { styled } from "styled-components";
import useSearchTypes from "../hooks/useSearchTypes";

const HeaderContainer = styled.div`
  width: 100%;
  padding: 10px;
  text-align: center;
  font-weight: bold;
  border-bottom: 1px solid gray;
`;

export const Header = () => {
  const { headerTitle } = useSearchTypes();

  return <HeaderContainer>{headerTitle}</HeaderContainer>;
};
