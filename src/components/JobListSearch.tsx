import { useJobItemContext } from "../lib/hooks";
import JobList from "./JobList";

export default function JobListSearch() {
  const { jobItemsSortedAndSliced, loading } = useJobItemContext();
  return (
    <div>
      <JobList jobItems={jobItemsSortedAndSliced} loading={loading} />
    </div>
  );
}
