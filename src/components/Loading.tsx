import { memo } from "react";
import { styled } from "styled-components";

const LoadingContainer = styled.div`
  font-size: 10px;
  margin: 40px auto;
  text-indent: -9999em;
  width: 25px;
  height: 25px;
  border-radius: 50%;
  background: #ffffff;
  background: -moz-linear-gradient(left, gray 10%, rgba(255, 255, 255, 0) 42%);
  background: -webkit-linear-gradient(
    left,
    gray 10%,
    rgba(255, 255, 255, 0) 42%
  );
  background: -o-linear-gradient(left, gray 10%, rgba(255, 255, 255, 0) 42%);
  background: -ms-linear-gradient(left, gray 10%, rgba(255, 255, 255, 0) 42%);
  background: linear-gradient(to right, gray 10%, rgba(255, 255, 255, 0) 42%);
  position: relative;
  -webkit-animation: spinner 1.4s infinite linear;
  animation: spinner 1.4s infinite linear;
  -webkit-transform: translateZ(0);
  -ms-transform: translateZ(0);
  transform: translateZ(0);

  &::before {
    width: 50%;
    height: 50%;
    background: gray;
    border-radius: 100% 0 0 0;
    position: absolute;
    top: 0;
    left: 0;
    content: "";
  }
  &::after {
    background: #fff;
    width: 75%;
    height: 75%;
    border-radius: 50%;
    content: "";
    margin: auto;
    position: absolute;
    top: 0;
    left: 0;
    bottom: 0;
    right: 0;
  }
  @-webkit-keyframes spinner {
    0% {
      -webkit-transform: rotate(0deg);
      transform: rotate(0deg);
    }
    100% {
      -webkit-transform: rotate(360deg);
      transform: rotate(360deg);
    }
  }
  @keyframes spinner {
    0% {
      -webkit-transform: rotate(0deg);
      transform: rotate(0deg);
    }
    100% {
      -webkit-transform: rotate(360deg);
      transform: rotate(360deg);
    }
  }
`;
export const Loading = memo(({ isLoading }: { isLoading: boolean }) => {
  if (!isLoading) {
    return null;
  }
  return <LoadingContainer />;
});
