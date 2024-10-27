import React, { createContext, useState } from "react";
import { JobItem } from "../lib/types";

type JobItemProps = {
  children: React.ReactNode;
};

type JobItemContext = {
  jobItems: JobItem[];
  setJobItems: React.Dispatch<React.SetStateAction<JobItem[]>>;
};

export const JobItemContext = createContext<JobItemContext | null>(null);

export default function JobItemContextProvider({ children }: JobItemProps) {
  const [jobItems, setJobItems] = useState<JobItem[]>([]);
  return (
    <JobItemContext.Provider value={{ jobItems, setJobItems }}>
      {children}
    </JobItemContext.Provider>
  );
}

// Custom hook to use the context
