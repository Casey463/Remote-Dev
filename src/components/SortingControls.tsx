import { SortBy } from "../lib/types";

export default function Sorting({
  onClick,
  sortBy,
}: {
  onClick: (newSortBy: SortBy) => void;
  sortBy: string;
}) {
  return (
    <section className="sorting">
      <i
        className={`fa-solid fa-arrow-down-short-wide ${
          sortBy === "relevant" && "sorting__button--active"
        }`}
      ></i>

      <button
        onClick={() => onClick("relevant")}
        className="sorting__button sorting__button--relevant"
      >
        Relevant
      </button>

      <button
        onClick={() => onClick("recent")}
        className={`fa-solid fa-arrow-down-short-wide ${
          sortBy === "recent" && "sorting__button--active"
        }`}
      >
        Recent
      </button>
    </section>
  );
}
