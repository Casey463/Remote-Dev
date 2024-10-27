import React, { createContext, useState } from "react";

type JobItemProps = {
  children: React.ReactNode;
};

export const JobItemContext = createContext();

export default function JobItemContextProvider({ children }: JobItemProps) {
  const [jobItems, setJobItems] = useState([]);
  return (
    <JobItemContext value={(jobItems, setJobItems)}>{children}</JobItemContext>
  );
}

export const useJobItemContext = () => React.useContext(JobItemContext); // Custom hook to use the context
