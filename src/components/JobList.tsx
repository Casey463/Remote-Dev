import JobListItem from "./JobListItem";
import Spinner from "./Spinner";

export function JobList({ jobItems, loading }) {
  return (
    <ul className="job-list">
      {loading && <Spinner />}
      {!loading && jobItems.map((jobItem) => <JobListItem jobItem={jobItem} />)}
    </ul>
  );
}

export default JobList;
