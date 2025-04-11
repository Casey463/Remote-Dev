import React from "react";
import ReactDOM from "react-dom/client";
import App from "./components/App.tsx";
import "./index.css";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import BookmarksContextProvider from "./providers/BookmarksContextProvider.tsx";
import ActiveIDContextProvider from "./providers/ActiveIDContexrProvider.tsx";
import SearchTextContextProvider from "./providers/SearchTextContextProvider.tsx";

import JobItemContextProvider from "./providers/JobItemContextProvider.tsx";

const queryClient = new QueryClient();
ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <QueryClientProvider client={queryClient}>
      <BookmarksContextProvider>
        <ActiveIDContextProvider>
          <SearchTextContextProvider>
            <JobItemContextProvider>
              <App />
            </JobItemContextProvider>
          </SearchTextContextProvider>
        </ActiveIDContextProvider>
      </BookmarksContextProvider>
    </QueryClientProvider>
  </React.StrictMode>
);
