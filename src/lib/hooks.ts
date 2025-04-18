import React, { useEffect, useState } from "react";
import { JobItem, JobItemExpanded } from "./types.ts";
import { JobItemContext } from "../providers/JobItemContextProvider";
import { BASE_API_URL } from "./constants.ts";
import { useQueries, useQuery } from "@tanstack/react-query";

import { handleErrors } from "./utils.ts";
import { BookmarksContext } from "../providers/BookmarksContextProvider.tsx";
import { ActiveIDContext } from "../providers/ActiveIDContexrProvider.tsx";
import { SearchTextContext } from "../providers/SearchTextContextProvider.tsx";

type JobItemResponse = {
  public: boolean;
  jobItem: JobItemExpanded;
};

const fetchJobItem = async (id: number): Promise<JobItemResponse> => {
  const response = await fetch(`${BASE_API_URL}/${id}`);
  if (!response.ok) {
    const errorData = await response.json();
    throw new Error(errorData.description);
  }
  const data = await response.json();
  return data;
};

export function useJobItem(id: number | null) {
  const { data, isInitialLoading } = useQuery(
    ["job-item", id],
    () => (id ? fetchJobItem(id) : null),
    {
      staleTime: 1000 * 60 * 60,
      refetchOnWindowFocus: false,
      enabled: Boolean(id),
      onError: (error) => handleErrors(error),
    }
  );

  return { jobItem: data?.jobItem, isLoading: isInitialLoading } as const;
}

//=========================================================

export function useActiveId() {
  const [activeID, setActiveID] = useState<null | number>(null);

  useEffect(() => {
    const handleHashChange = () => {
      setActiveID(+window.location.hash.slice(1));
    };
    handleHashChange();

    window.addEventListener("hashchange", handleHashChange);

    return () => {
      window.removeEventListener("hashchange", handleHashChange);
    };
  }, []);
  return activeID;
}

type JobItemsApiResponse = {
  jobItems: JobItem[];
  public: boolean;
  sorted: boolean;
};

//=========================================================
const fetchJobItems = async (
  searchText: string
): Promise<JobItemsApiResponse> => {
  const response = await fetch(`${BASE_API_URL}?search=${searchText}`);
  if (!response.ok) {
    const errorData = await response.json();
    throw new Error(errorData.description);
  }
  const data = await response.json();
  return data;
};

//=========================================================
export function useSearchQuery(searchText: string) {
  const { data, isInitialLoading } = useQuery(
    ["job-items", searchText],
    () => fetchJobItems(searchText),
    {
      staleTime: 1000 * 60 * 60,
      refetchOnWindowFocus: false,
      enabled: Boolean(searchText),
      onError: (error) => handleErrors(error),
    }
  );

  return { jobItems: data?.jobItems, loading: isInitialLoading } as const;
}

//=========================================================
export function useJobItems(ids: number[]) {
  const results = useQueries({
    queries: ids.map((id) => ({
      queryKey: ["job-item", id],
      queryFn: () => fetchJobItem(id),

      staleTime: 1000 * 60 * 60,
      refetchOnWindowFocus: false,
      retry: false,
      enabled: Boolean(id),
      onError: handleErrors,
    })),
  });
  console.log(results);
  const jobItems = results
    .map((result) => result.data?.jobItem)
    .filter((jobItem) => Boolean(jobItem)) as JobItemExpanded[];
  const isLoading = results.some((result) => result.isLoading);

  return { jobItems, isLoading } as const;
}

//=========================================================

export const useJobItemContext = () => {
  const context = React.useContext(JobItemContext);
  if (!context) {
    throw new Error(
      "useJobItemContext must be used within a JobItemContextProvider"
    );
  }
  return context;
};

//=========================================================

export function useDebounce<T>(value: T, delay = 250): T {
  const [debouncedValue, setDebouncedValue] = useState(value);

  useEffect(() => {
    const timerId = setTimeout(() => setDebouncedValue(value), delay);
    return () => clearTimeout(timerId);
  }, [value, delay]);

  return debouncedValue;
}

//=========================================================

export const useBookmarksContext = () => {
  const context = React.useContext(BookmarksContext);
  if (!context) {
    throw new Error(
      "useBookmarks must be used within a BookmarksContextProvider"
    );
  }
  return context;
};

//=========================================================

export const useActiveIDContext = () => {
  const context = React.useContext(ActiveIDContext);
  if (!context) {
    throw new Error(
      "useActiveID must be used within a ActiveIDContextProvider"
    );
  }
  return context;
};

//=========================================================

export const useSearchTextContext = () => {
  const context = React.useContext(SearchTextContext);
  if (!context) {
    throw new Error(
      "useSearchText must be used within a SearchTextContextProvider"
    );
  }
  return context;
};

//=========================================================

export function useLocalStorage<T>(
  key: string,
  initialValue: T
): [T, React.Dispatch<React.SetStateAction<T>>] {
  const [value, setValue] = useState(() =>
    JSON.parse(localStorage.getItem(key) || JSON.stringify(initialValue))
  );
  useEffect(() => {
    localStorage.setItem(key, JSON.stringify(value));
  }, [value, key]);

  return [value, setValue] as const;
}

//=========================================================
export function useOnClickOutside(
  refs: React.RefObject<HTMLElement>[],
  handler: () => void
) {
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        event.target instanceof HTMLElement &&
        refs.every((ref) => !ref.current?.contains(event.target as Node))
      ) {
        handler();
      }
    };

    document.addEventListener("click", handleClickOutside);
    return () => {
      document.removeEventListener("click", handleClickOutside);
    };
  }, [refs, handler]);
}
