import { isEmpty } from "lodash-es";
import React from "react";
import { useRecoilValue } from "recoil";
import styled from "styled-components";
import useSearchTypes from "../hooks/useSearchTypes";
import { stateSearchKeyword } from "../stores/states";

const SearchInputContainer = styled.div`
  display: flex;
  position: sticky;
  top: 0;
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

type SearchInputProps = {
  onKeywordChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onSearchClick: (e?: React.MouseEvent<HTMLButtonElement>) => void;
};

export const SearchInput = ({
  onKeywordChange,
  onSearchClick,
}: SearchInputProps) => {
  const { type } = useSearchTypes();
  const keyword = useRecoilValue(stateSearchKeyword({ type }));

  const activeEnter = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter" && !isEmpty(keyword)) {
      e.stopPropagation();
      e.preventDefault();
      return onSearchClick();
    }
  };

  return (
    <SearchInputContainer>
      <Input type="text" onChange={onKeywordChange} onKeyDown={activeEnter} />
      <Button onClick={onSearchClick}>go</Button>
    </SearchInputContainer>
  );
};
