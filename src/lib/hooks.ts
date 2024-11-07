import React, { useEffect, useState } from "react";
import { JobItem, JobItemExpanded } from "./types.ts";
import { JobItemContext } from "../providers/JobItemContextProvider";
import { BASE_API_URL } from "./constants.ts";
import { useQuery } from "@tanstack/react-query";

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
      onError: (error) => console.error(`Error fetching job data: ${error}`),
    }
  );
  const jobItem = data?.jobItem;
  const isLoading = isInitialLoading;
  return { jobItem, isLoading } as const;
}

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

export function useJobItems(searchText: string) {
  const [jobItems, setJobItems] = useState<JobItem[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!searchText) return;
    try {
      const search = async () => {
        setLoading(true);
        const response = await fetch(`${BASE_API_URL}?search=${searchText}`);
        const data = await response.json();
        setLoading(false);
        setJobItems(data.jobItems);
      };

      search();
    } catch (error) {
      console.error(`Error fetching data` + error);
    }
  }, [searchText]);

  return { jobItems, loading } as const;
}

export const useJobItemContext = () => {
  const context = React.useContext(JobItemContext);
  if (!context) {
    throw new Error(
      "useJobItemContext must be used within a JobItemContextProvider"
    );
  }
  return context;
};

export function useDebounce<T>(value: T, delay = 250): T {
  const [debouncedValue, setDebouncedValue] = useState(value);

  useEffect(() => {
    const timerId = setTimeout(() => setDebouncedValue(value), delay);
    return () => clearTimeout(timerId);
  }, [value, delay]);

  return debouncedValue;
}
