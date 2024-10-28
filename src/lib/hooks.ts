import React, { useEffect, useState } from "react";
import { JobItem, JobItemExpanded } from "./types.ts";
import { JobItemContext } from "../providers/JobItemContextProvider";
import { BASE_API_URL } from "./constants.ts";

export function useJobItem(id: number | null) {
  const [jobItem, setJobItem] = useState<JobItemExpanded | null>(null);

  useEffect(() => {
    if (!id) return;
    try {
      const getJobData = async () => {
        const response = await fetch(`${BASE_API_URL}/${id}`);
        const data = await response.json();
        setJobItem(data.jobItem);
      };
      getJobData();
    } catch (error) {
      console.error(`Error fetching job data: ${error}`);
    }
  }, [id]);

  return jobItem;
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

  return [jobItemsSliced, loading] as const;
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
