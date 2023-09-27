import React from "react";
import "./App.css";
import { QueryClient, QueryClientProvider } from "react-query";
import { RecoilRoot } from "recoil";
import Main from "./pages/Main";

const queryClient = new QueryClient();

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <RecoilRoot>
        <React.Suspense fallback={<div>...loading</div>}>
          <Main />
        </React.Suspense>
      </RecoilRoot>
    </QueryClientProvider>
  );
}

export default App;
