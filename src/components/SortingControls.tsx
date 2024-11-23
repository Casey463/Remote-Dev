import { SortBy } from "../lib/types";

export default function Sorting({
  onClick,
  sortBy,
}: {
  onClick: (newSortBy: SortBy) => void;
  sortBy: string;
}) {
export default function Sorting({ onClick, sortBy }: SortingControlsProps) {
  return (
    <section className="sorting">
      <i className="fa-solid fa-arrow-down-short-wide "></i>

      <button
      <SortingButton
        onClick={() => onClick("relevant")}
        isActive={sortBy === "relevant"}
      >
        Relevant
      </SortingButton>
      <SortingButton
        onClick={() => onClick("relevant")}
        isActive={sortBy === "recent"}
      >
        Recent
      </button>
      </SortingButton>
    </section>
  );
}

function SortingButton({ children, onClick, isActive }: SortingButtonProps) {
  return (
    <button
      onClick={onClick}
      className={`sorting__button sorting__button--recent ${
        isActive && "sorting__button--active"
      }`}
    >
      {children}
    </button>
  );
}
