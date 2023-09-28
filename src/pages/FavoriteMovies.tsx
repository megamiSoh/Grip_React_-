import { useRecoilState } from "recoil";
import { stateFavoritMovies } from "../stores/states/state-favorite-movies";
import { SearchInput } from "../components/SearchInput";
import { CardContainer, MovieCard } from "../components/MovieCard";
import useSearchTypes from "../hooks/useSearchTypes";
import { stateSearchKeyword } from "../stores/states";
import { includes, findIndex, toLower, delay } from "lodash-es";
import React, { useCallback } from "react";
import { styled } from "styled-components";

const SortButton = styled.button`
  position: fixed;
  z-index: 999;
  background-color: #fff;
  right: 0;
  padding: 5px 10px;
  box-shadow: 0px 0px 10px 4px #343434;
  border-radius: 5px 0 0 5px;
  font-size: 10px;
  font-weight: bold;
`;

export default function FavoriteMovies() {
  const [isSortable, setIsSortable] = React.useState(false);

  const { type } = useSearchTypes();

  const [keyword, setKeyword] = useRecoilState(stateSearchKeyword({ type }));

  const [favorites, setFavorits] = useRecoilState(stateFavoritMovies);

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

  const handleSortableClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    document.body.style.overflow = !isSortable ? "hidden" : "unset";
    setIsSortable((state) => !state);
  };

  /**
   * 요구사항이 웹뷰 구현이므로 터치 이벤트 핸들러만 구현
   * 모바일 시뮬레이터로 확인 가능
   */
  const touchEvent = useCallback(
    (e: React.TouchEvent) => {
      if (!isSortable) return;
      // findIndex helper 함수
      const find = (id: string) =>
        findIndex(favorites, function (o) {
          return o?.imdbID === id;
        });

      // 타겟 ID 추출
      const targetId = (e as React.BaseSyntheticEvent).target.offsetParent.id;

      // 타겟 엘리먼트 지정한다.
      const target = document.getElementById(targetId);

      // 타겟이 없을 경우 함수에서 빠져나간다.
      if (!target) return;

      // 타겟 노드를 복제한다.
      const cloneNode = target.cloneNode(true);

      switch (e.type) {
        case "touchstart":
          // 복제한 노드에 새로운 ID값을 부여한다.
          (cloneNode as Element).id = "cloneNode";

          // 바디에 복사한 노드를 추가한다.
          document.body.appendChild(cloneNode);

          break;

        case "touchend":
          // 복제된 노드 삭제
          document.getElementById("cloneNode")?.remove();

          // 터치 엔드가 되는 시점의 타겟 노드를 찾아 메모리에 저장한다.
          const changedTouch = e.changedTouches[0];
          const replaceTarget = document.elementFromPoint(
            changedTouch.clientX,
            changedTouch.clientY
          ) as Element & { offsetParent: { id: string } };

          // 치환할 대상이 없으면 함수를 빠져나간다.
          if (!replaceTarget) return;

          // 요소 각각의 인덱스 값으로 치환해준다.
          const replaceIdx = find(replaceTarget?.offsetParent?.id ?? targetId);
          const selectedIdx = find(targetId);

          if (replaceIdx < 0) return;

          // 스토어에 저장된 즐겨찾기 데이터를 딥카피하여 메모리에 할당한다.
          const copied = [...favorites];

          copied[replaceIdx] = favorites[selectedIdx];
          copied[selectedIdx] = favorites[replaceIdx];

          // 재정렬된 값을 스토어에 저장한다.
          setFavorits(copied);

          break;

        case "touchmove":
          const getCloned = document.getElementById("cloneNode");
          const root = document.getElementById("root");
          if (!getCloned || !root) break;

          // 마우스의 현재 좌표
          const clientRect = root.getBoundingClientRect();

          const xPos = e.touches[0].clientX - clientRect.left;
          const yPos = e.touches[0].clientY - clientRect.top;

          getCloned.style.cssText = `
          position: absolute;
          width: 100px;
          height: 100px;
          color: transparent;
          left: ${
            xPos > clientRect.width - 110 ? clientRect.width - 110 : xPos
          }px;
          top: ${yPos}px;
          transition: 0s;
          `;

          break;
      }
    },
    [favorites, isSortable, setFavorits]
  );

  return (
    <>
      <SearchInput
        onKeywordChange={handleKeywordChange}
        onSearchClick={handleSearchScroll}
      />
      <SortButton onClick={handleSortableClick}>
        {isSortable ? "그만하기" : "정렬하기"}
      </SortButton>
      <CardContainer
        onTouchStart={touchEvent}
        onTouchEnd={touchEvent}
        onTouchMove={touchEvent}
      >
        {favorites.map((item) => (
          <MovieCard {...item} key={item?.imdbID} />
        ))}
      </CardContainer>
    </>
  );
}
