import React from "react";
import { useRecoilValue } from "recoil";
import styled from "styled-components";
import useSearchTypes from "../hooks/useSearchTypes";
import { stateSearchKeyword } from "../stores/states";

const SearchInputContainer = styled.div`
  display: flex;
  z-index: 999;
  position: sticky;
  top: 0;
  padding: 10px;
  flex-direction: row;
  background-color: #fff;
  gap: 2px;
`;

const Input = styled.input`
  width: 100%;
  border: 1px solid gray;
  flex: 1;
  padding: 5px;
  border-radius: 5px;
`;

const Button = styled.button`
  padding: 10px;
  border-radius: 5px;
  border: 1px solid gray;
`;

const WaringMessage = styled.div`
  font-size: 10px;
  color: red;
  padding: 0 0 0 10px;
`;

type SearchInputProps = {
  onKeywordChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onSearchClick: (e?: React.MouseEvent<HTMLButtonElement>) => void;
};

export const SearchInput = ({
  onKeywordChange,
  onSearchClick,
}: SearchInputProps) => {
  const { type } = useSearchTypes();
  const [warnMessage, setWarnMessage] = React.useState("");
  const keyword = useRecoilValue(stateSearchKeyword({ type }));

  const handleSearchClick = () => {
    const isEmptyKeywords = !keyword;
    setWarnMessage(isEmptyKeywords ? "키워드를 입력해 주세요." : "");

    if (isEmptyKeywords) {
      return;
    }
    return onSearchClick();
  };

  const activeEnter = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      e.stopPropagation();
      e.preventDefault();
      return handleSearchClick();
    }
  };

  return (
    <>
      <SearchInputContainer>
        <Input
          type="text"
          placeholder="검색어 입력"
          onChange={onKeywordChange}
          onKeyDown={activeEnter}
          value={keyword}
        />
        <Button onClick={handleSearchClick}>검색</Button>
      </SearchInputContainer>
      <WaringMessage>{warnMessage}</WaringMessage>
    </>
  );
};
