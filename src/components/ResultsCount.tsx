import { useJobItemContext } from "../lib/hooks";

export default function ResultsCount() {
  const { totalNumberOfResults } = useJobItemContext(); // Ensure context is used to avoid warnings

  return (
    <p className="count">
      <span className="u-bold">{totalNumberOfResults}</span> results
    </p>
  );
}
