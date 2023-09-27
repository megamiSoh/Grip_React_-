import { memo } from "react";
import styled from "styled-components";

const OverlayScreen = styled.div`
  position: absolute;
  z-index: 99;
  width: 100%;
  height: 100%;
  background-color: #0000006b;
  left: 0;
  top: 0;
  border-radius: 5px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 5px;
  font-weight: bold;
  font-size: 12px;
  color: #000;
  text-align: center;

  &::after {
    position: absolute;
    right: 0;
    top: 0;
    font-size: 20px;
    color: #fff;
    padding: 5px;
    content: "X";
  }
`;

const OverlayButton = styled.button`
  background-color: #fff;
  padding: 5px 10px;
  border-radius: 5px;
`;

type OverlayProps = {
  onFavoritClick: (e: React.MouseEvent<HTMLButtonElement>) => void;
  isFavorite: boolean;
  isShow: boolean;
};

export const OverlayCard = memo(
  ({ onFavoritClick, isFavorite, isShow }: OverlayProps) => {
    if (!isShow) {
      return null;
    }

    return (
      <OverlayScreen>
        <OverlayButton onClick={onFavoritClick}>
          즐겨찾기 {isFavorite ? "제거" : ""}
        </OverlayButton>
      </OverlayScreen>
    );
  }
);
