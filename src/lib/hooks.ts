import React, { useEffect, useState } from "react";
import { JobItem, JobItemExpanded } from "./types.ts";
import { JobItemContext } from "../providers/JobItemContextProvider";
import { BASE_API_URL } from "./constants.ts";
import { useQuery } from "@tanstack/react-query";

// const [jobItem, setJobItem] = useState<JobItemExpanded | null>(null);
// const [isLoading, setIsLoading] = useState(false);

// useEffect(() => {
//   if (!id) return;
//   try {
//     const getJobData = async () => {
//       setIsLoading(true);
//       const response = await fetch(`${BASE_API_URL}/${id}`);
//       const data = await response.json();
//       setIsLoading(false);
//       setJobItem(data.jobItem);
//     };
//     getJobData();
//   } catch (error) {
//     console.error(`Error fetching job data: ${error}`);
//   }
// }, [id]);

// return [jobItem, isLoading] as const;

export function useJobItem(id: number | null) {
  const { data, isLoading } = useQuery(
    ["job-item", id],
    async () => {
      const response = await fetch(`${BASE_API_URL}/${id}`);
      const data = await response.json();
      return data;
    },
    {
      staleTime: 1000 * 60 * 60,
      refetchOnWindowFocus: false,
      enabled: Boolean(id),
      onError: (error) => console.error(`Error fetching job data: ${error}`),
    }
  );

  return [data?.jobItem, isLoading] as const;
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
  const totalNumberOfResults = jobItems.length;

  const jobItemsSliced = jobItems.slice(0, 7);

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

  return { jobItemsSliced, loading, totalNumberOfResults } as const;
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