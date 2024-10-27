import JobListItem from "./JobListItem";
import Spinner from "./Spinner";
import { JobItem } from "../lib/types";

type JobListProps = {
  jobItems: JobItem[];
  loading: boolean;
};

export function JobList({ jobItems, loading }: JobListProps) {
  return (
    <ul className="job-list">
      {loading && <Spinner />}
      {!loading && jobItems.map((jobItem) => <JobListItem jobItem={jobItem} />)}
    </ul>
  );
}

export default JobList;
