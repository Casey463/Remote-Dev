import JobListItem from "./JobListItem";
import Spinner from "./Spinner";

import { useActiveIDContext } from "../lib/hooks";
import { JobItem } from "../lib/types";

export function JobList({
  jobItems,
  loading,
}: {
  jobItems: JobItem[];
  loading: boolean;
}) {
  const { activeId } = useActiveIDContext();
  return (
    <ul className="job-list">
      {loading && <Spinner />}
      {!loading &&
        jobItems.map((jobItem) => (
          <JobListItem
            key={jobItem.id}
            jobItem={jobItem}
            isActive={activeId === jobItem.id}
          />
        ))}
    </ul>
  );
}

export default JobList;
