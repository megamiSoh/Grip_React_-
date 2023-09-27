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

export default function SearchMovies() {
  const target = useRef(null);

  const { type } = useSearchTypes();

  const [keyword, setKeyword] = useRecoilState(stateSearchKeyword({ type }));

  const [currentPage, setPage] = useRecoilState(statePaging({ type }));

  const [searchResult, setSearchResult] = useRecoilState(
    searchDomainResult({ type })
  );

  const { mutate } = useMutation(
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
        console.log(`rolling back optimistic update with id `);
      },
      onSuccess: (res: AxiosResponse["data"]) => {
        return setSearchResult(res.data);
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
    if (currentPage === 1) observe(target.current);

    const accumulate = searchResult.response.result.length;
    const totalCount = searchResult.response.totalCount;

    if (0 === accumulate || totalCount <= accumulate) {
      unobserve(target.current);
    }
  }, [currentPage, observe, searchResult.response, unobserve]);

  return (
    <div>
      <SearchInput
        onKeywordChange={handleKeywordChange}
        onSearchClick={handleSearchClick}
      />
      <CardContainer>
        {searchResult.response.result.map((item) => (
          <MovieCard key={item.imdbID} {...item} />
        ))}
      </CardContainer>
      <div ref={target} style={{ width: "100%", height: 20 }} />
    </div>
  );
}
