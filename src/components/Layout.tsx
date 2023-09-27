import { Outlet } from "react-router-dom";
import { Header } from "./Header";
import { Footer } from "./Footer";
import styled from "styled-components";

const LayoutContainer = styled.div`
  width: 100%;
`;

export const Layout = () => {
  return (
    <LayoutContainer>
      <Header />
      <Outlet />
      <Footer />
    </LayoutContainer>
  );
};
