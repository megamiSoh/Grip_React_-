# React with Typescript

기본 구성 [Create React App](https://github.com/facebook/create-react-app).
- React-Query, Recoil, Styled-component, localforage, lodash

## 기본 컨셉

Directory Architecture 심플하게 pages, components, hooks, stores로 구성하였습니다.
도메인 로직은 pages안에서만 핸들링하게끔 하였습니다.

비동기 도메인 상태는 React-Query를 컴포넌트 간의 상태 관리는 Recoil을 사용하였습니다.


## 느낀 점

Recoil은 처음 사용해보았는데, 꽤 재미있었다. 
다만, 처음 사용한지라 여러모로 익숙치 않고 제대로 사용하고 있는건지 확인할 시간이 부족해서 좀 아쉬웠다.
즐겨찾기 데이터는 컬렉션 형식의 데이터라 localforage를 처음 써보았는데 정말 쉽고 편했다.
일전에 mdn 순정 indexedDB썼을때는 생각처럼 핸들링이 되지 않아 고생했던 기억이 있는데, localforage는 localstorage와 usage가 거의 동일해서 정말 편하게 사용했다.



## 그 외,

즐겨찾기 정렬은 터치 이벤트로 구현되어, 모바일 시뮬레이터로 확인해야 합니다.
참고 부탁드리겠습니다!



## 실행

클론하여 내려 받은 후,

1. npm install 또는 npm i
2. npm run start 또는 npm start
