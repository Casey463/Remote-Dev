import JobListItem from "./JobListItem";
import Spinner from "./Spinner";
import { JobItem } from "../lib/types";
import { useActiveId } from "../lib/hooks";

type JobListProps = {
  jobItems: JobItem[];
  loading: boolean;
};

export function JobList({ jobItems, loading }: JobListProps) {
  const activeId = useActiveId();
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
