import { css, styled } from "styled-components";
import { IResponseType } from "../stores/interfaces";
import { useRecoilState } from "recoil";
import { stateFavoritMovies } from "../stores/states/state-favorite-movies";
import { includes, some, xorBy } from "lodash-es";
import { OverlayCard } from "./OverlayCard";
import { toggleEvent } from "../stores/selectors/toggle-event";
import { ReactNode } from "react";

export const CardContainer = styled.div`
  padding-bottom: 50px;
  display: grid;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  gap: 3px;
`;

const Card = styled.div<{ $isFavorite: boolean }>`
  padding: 5px;
  transition: 0.3s;
  position: relative;
  font-size: 10px;
  color: #dedede;
  border-radius: 5px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;

  ${(props) => (props.$isFavorite ? isFavoritStyle : "color: #000")}
`;

const isFavoritStyle = css`
  background-color: #000000b5;
  color: #dedede;
  &::after {
    content: "⭐";
    position: absolute;
    font-size: 20px;
    background-color: #d8d8d887;
    border-radius: 50%;
    width: 30px;
    height: 30px;
    text-align: center;
  }
`;

const MovieImage = styled.div`
  height: 100%;
  display: flex;
  background-color: #dedede;

  & > img {
    width: 100%;
    object-fit: cover;
  }
`;

const MovieInfo = styled.div`
  padding: 3px 0;

  & > h1 {
    font-size: 15px;
    font-weight: bold;
  }
`;

export const MovieCard = (props: IResponseType & { children?: ReactNode }) => {
  const { imdbID, Title, Poster, Year, Type } = props;

  const [selected, setSelected] = useRecoilState(toggleEvent);
  const [favorites, setFavorits] = useRecoilState(stateFavoritMovies);

  const handleImgError = (e: React.SyntheticEvent<HTMLImageElement, Event>) => {
    return (e.currentTarget.src = "/images/noImage.jpg");
  };

  const handleFavoritClick =
    (info: string) => (e: React.MouseEvent<HTMLButtonElement>) => {
      e.stopPropagation();
      const parseInfo = JSON.parse(info);
      setSelected([imdbID]);

      return setFavorits((state) => xorBy(state, [parseInfo], "imdbID"));
    };

  const handleOverlayToggle = () => {
    setSelected([imdbID]);
  };

  return (
    <>
      <Card
        id={imdbID}
        $isFavorite={some(favorites, ["imdbID", imdbID])}
        onClick={handleOverlayToggle}
      >
        <OverlayCard
          isShow={includes(selected, imdbID)}
          onFavoritClick={handleFavoritClick(JSON.stringify(props))}
          isFavorite={some(favorites, ["imdbID", imdbID])}
        />
        <MovieImage>
          <img src={Poster} alt={Title} onError={handleImgError} />
        </MovieImage>

        <MovieInfo>
          <h1>{Title}</h1>
          {Year} - {Type}
        </MovieInfo>
      </Card>
    </>
  );
};
