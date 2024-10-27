import React, { useEffect, useState } from "react";
import { JobItemContext } from "../providers/JobItemContextProvider";
type useJobItemProps = {
  searchText: string;
};

export function useJobItems({ searchText }: useJobItemProps) {
  const [jobItems, setJobItems] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!searchText) return;
    try {
      const search = async () => {
        setLoading(true);
        const response = await fetch(
          `https://byteg  rad.com/course-assets/projects/rmtdev/api/data?search=${searchText}`
        );
        const data = await response.json();
        setLoading(false);
        setJobItems(data.jobItems);
      };

      search();
    } catch (error) {
      console.error(`Error fetching data` + error);
    }
  }, [searchText]);

  return { jobItems, loading };
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

// This line should be inside a component or a custom hook.
