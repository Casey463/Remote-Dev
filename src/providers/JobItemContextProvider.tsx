import React, { createContext, useCallback, useMemo, useState } from "react";
import { JobItem, PageDirection, SortBy } from "../lib/types";
import { RESULTS_PER_PAGE } from "../lib/constants";
import { useSearchQuery, useSearchTextContext } from "../lib/hooks";

type JobItemProps = {
  children: React.ReactNode;
};

type JobItemContext = {
  jobItems: JobItem[] | undefined;
  jobItemsSortedAndSliced: JobItem[];
  loading: boolean;
  totalNumberOfResults: number;
  totalNumberOfPages: number;
  handleChangePage: (direction: PageDirection) => void;
  handleChangeSortBy: (newSortBy: SortBy) => void;
  currentPage: number;
  sortBy: SortBy;
};

export const JobItemContext = createContext<JobItemContext | null>(null);

export default function JobItemContextProvider({ children }: JobItemProps) {
  const { debouncedSearchText } = useSearchTextContext();

  // State
  const { jobItems, loading } = useSearchQuery(debouncedSearchText);
  const [currentPage, setCurrentPage] = useState(1);
  const [sortBy, setSortBy] = useState<SortBy>("relevant");

  // Derived state
  const jobItemsSorted = useMemo(
    () =>
      [...(jobItems || [])]?.sort((a, b) => {
        if (sortBy === "relevant") {
          return b.relevanceScore - a.relevanceScore;
        } else if (sortBy === "recent") {
          return a.daysAgo - b.daysAgo;
        }
        return 0;
      }),
    [jobItems, sortBy]
  );

  const jobItemsSortedAndSliced = useMemo(
    () =>
      jobItemsSorted.slice(
        currentPage * RESULTS_PER_PAGE - RESULTS_PER_PAGE,
        currentPage * RESULTS_PER_PAGE
      ),
    [currentPage, jobItemsSorted]
  );
  const totalNumberOfResults = jobItems?.length || 0;
  const totalNumberOfPages = totalNumberOfResults / RESULTS_PER_PAGE || 0;

  // Event handlers

  const handleChangePage = useCallback((direction: PageDirection) => {
    if (direction === "next") {
      setCurrentPage((prev) => prev + 1);
    } else if (direction === "prev") {
      setCurrentPage((prev) => prev - 1);
    }
  }, []);

  const handleChangeSortBy = useCallback((newSortBy: SortBy) => {
    setSortBy(newSortBy);
    setCurrentPage(1);
  }, []);

  const contextValue = useMemo(
    () => ({
      jobItems,
      jobItemsSortedAndSliced,
      loading,
      totalNumberOfResults,
      totalNumberOfPages,
      handleChangePage,
      handleChangeSortBy,
      currentPage,
      sortBy,
    }),
    [
      jobItems,
      jobItemsSortedAndSliced,
      loading,
      totalNumberOfResults,
      totalNumberOfPages,
      handleChangePage,
      handleChangeSortBy,
      currentPage,
      sortBy,
    ]
  );
  return (
    <JobItemContext.Provider value={contextValue}>
      ,{children}
    </JobItemContext.Provider>
  );
}

// Custom hook to use the context
