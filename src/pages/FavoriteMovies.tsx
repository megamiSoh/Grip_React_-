import { useRecoilState, useRecoilValue } from "recoil";
import { stateFavoritMovies } from "../stores/states/state-favorite-movies";
import { SearchInput } from "../components/SearchInput";
import { CardContainer, MovieCard } from "../components/MovieCard";
import useSearchTypes from "../hooks/useSearchTypes";
import { stateSearchKeyword } from "../stores/states";
import { includes, findIndex, toLower, delay } from "lodash-es";
import React from "react";

export default function FavoriteMovies() {
  const { type } = useSearchTypes();

  const [keyword, setKeyword] = useRecoilState(stateSearchKeyword({ type }));

  const favorites = useRecoilValue(stateFavoritMovies);

  // NOTE: 사용자 입력값 파싱
  const parseKeyword = (value: string) => toLower(value).replaceAll(" ", "");

  // NOTE: 웹 스토리지에 저장되어 있는 데이터 부합하는 데이터 카드로 이동 및 스타일 트랜지션
  // 각각의 데이터 엘리먼트를 전부 참조 제어가 아닌, 직접 돔을 제어하는 쪽으로 구현
  const handleSearchScroll = () => {
    const idx = findIndex(favorites, (item) =>
      includes(parseKeyword(item.Title), parseKeyword(keyword))
    );

    if (idx < 0) {
      return;
    }

    const target = document.getElementById(favorites[idx].imdbID);

    if (target) {
      target.style.filter = "sepia(1)";

      delay(() => (target.style.filter = "sepia(0)"), 1500);

      target?.scrollIntoView({
        behavior: "smooth",
        block: "center",
        inline: "center",
      });
    }
  };

  const handleKeywordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setKeyword(e.target.value);
    handleSearchScroll();
  };

  return (
    <>
      <SearchInput
        onKeywordChange={handleKeywordChange}
        onSearchClick={handleSearchScroll}
      />
      <CardContainer>
        {favorites.map((item) => (
          <MovieCard {...item} key={item.imdbID} />
        ))}
      </CardContainer>
    </>
  );
}
