import React, { useState } from "react";

type JobItemProps = {};

export const JobItemContext = React.createContext("");

export default function JobItemContextProvider({ children }) {
  const [jobItems, setJobItems] = useState([]);
  return (
    <JobItemContext.Provider value={[jobItems, setJobItems]}>
      {children}
    </JobItemContext.Provider>
  );
}

export const useJobItemContext = () => React.useContext(JobItemContext); // Custom hook to use the context
