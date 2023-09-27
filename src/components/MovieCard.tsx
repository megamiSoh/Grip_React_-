import { styled } from "styled-components";
import { IResponseType } from "../stores/interfaces";
import { useRecoilState } from "recoil";
import { stateFavoritMovies } from "../stores/states/state-favorite-movies";
import { some, xorBy } from "lodash-es";

export const CardContainer = styled.div`
  margin-bottom: 50px;
  display: grid;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  gap: 3px;
`;

const Card = styled.div<{ $isFavorite: boolean }>`
  padding: 5px;
  font-size: 10px;
  color: #dedede;
  border-radius: 5px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;

  ${(props) =>
    props.$isFavorite
      ? "border: 3px solid #000; background-color: #000; color: #dedede;"
      : "color: #000"}
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

export const MovieCard = (props: IResponseType) => {
  const { imdbID, Title, Poster, Year, Type } = props;

  const [favorites, setFavorits] = useRecoilState(stateFavoritMovies);

  const handleImgError = (e: React.SyntheticEvent<HTMLImageElement, Event>) => {
    return (e.currentTarget.src = "/images/noImage.jpg");
  };

  const handleFavoritClick = (e: React.MouseEvent<HTMLDivElement>) => {
    const info = e.currentTarget.getAttribute("data-value") ?? "";
    const parseInfo = JSON.parse(info);
    return setFavorits((state) => xorBy(state, [parseInfo], "imdbID"));
  };

  return (
    <Card
      data-value={JSON.stringify(props)}
      onClick={handleFavoritClick}
      $isFavorite={some(favorites, ["imdbID", imdbID])}
    >
      <MovieImage>
        <img src={Poster} alt={Title} onError={handleImgError} />
      </MovieImage>

      <MovieInfo>
        <h1>{Title}</h1>
        {Year} - {Type}
      </MovieInfo>
    </Card>
  );
};
