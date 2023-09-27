import { useMutation } from "react-query";
import { SearchInput } from "../components/SearchInput";
import axios, { AxiosError, AxiosResponse } from "axios";
import { useRecoilState } from "recoil";
import { statePaging, stateSearchKeyword } from "../stores/states";
import useSearchTypes from "../hooks/useSearchTypes";
import { searchDomainResult } from "../stores/selectors/search-domain-result";
import { CardContainer, MovieCard } from "../components/MovieCard";
import { useEffect, useRef } from "react";
import useIntersectionObserver from "../hooks/useIntersectionObserver";
import { styled } from "styled-components";
import { Loading } from "../components/Loading";

const NoResult = styled.div`
  text-align: center;
`;

export default function SearchMovies() {
  const target = useRef(null);

  const { type } = useSearchTypes();

  const [keyword, setKeyword] = useRecoilState(stateSearchKeyword({ type }));

  const [currentPage, setPage] = useRecoilState(statePaging({ type }));

  const [searchResult, setSearchResult] = useRecoilState(
    searchDomainResult({ type })
  );

  const { mutate, isLoading } = useMutation(
    (page = 1) => {
      return axios.get(
        `http://www.omdbapi.com/?apikey=92e32667&s=${encodeURIComponent(
          keyword
        )}&page=${page ?? currentPage + 1}`
      );
    },
    {
      onError: (
        error: AxiosError,
        variables: number | null,
        context: unknown
      ) => {
        // 런타임 에러 화면으로 넘어가지 않게, 에러바운더리등의 처리는 추가하지 않음.
        // 실제 에러가 들어와도, 검색 결과가 없음 화면이 유지되도록 하고, 콘솔로 해당 에러만 확인 할수 있도록 함
        console.log(error.message);
      },
      onSuccess: (res: AxiosResponse["data"]) => {
        const response =
          res.data.Response === "False"
            ? { Search: [], totalResults: 0 }
            : res.data;

        return setSearchResult((state) => ({
          ...state,
          response: {
            result: response.Search,
            totalCount: response.totalResults,
          },
        }));
      },
    }
  );

  const [observe, unobserve] = useIntersectionObserver(() => {
    setPage((state) => state + 1);
    return mutate(null);
  });

  const handleKeywordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setKeyword(e.target.value);
  };

  const handleSearchClick = () => {
    setPage(1);
    return mutate(1);
  };

  useEffect(() => {
    observe(target.current);

    const accumulate = searchResult.response.result.length;
    const totalCount = searchResult.response.totalCount;

    if (0 === accumulate || totalCount <= accumulate) {
      unobserve(target.current);
    }
  }, [currentPage, observe, searchResult.response, unobserve]);

  return (
    <>
      <SearchInput
        onKeywordChange={handleKeywordChange}
        onSearchClick={handleSearchClick}
      />
      <CardContainer>
        {searchResult.response.result.map((item) => (
          <MovieCard key={item.imdbID} {...item} />
        ))}
      </CardContainer>

      <Loading isLoading={isLoading} />

      <NoResult>
        {!searchResult.response.result.length ? "검색 결과가 없습니다." : null}
      </NoResult>

      <div ref={target} style={{ width: "100%", height: 20 }} />
    </>
  );
}
