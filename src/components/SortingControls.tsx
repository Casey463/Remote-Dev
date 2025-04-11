import { useJobItemContext } from "../lib/hooks";

type SortingButtonProps = {
  children: React.ReactNode;
  onClick: () => void;
  isActive?: boolean;
};

export default function Sorting() {
  const { sortBy, handleChangeSortBy } = useJobItemContext();
  return (
    <section className="sorting">
      <i className="fa-solid fa-arrow-down-short-wide "></i>

      <SortingButton
        onClick={() => handleChangeSortBy("relevant")}
        isActive={sortBy === "relevant"}
      >
        Relevant
      </SortingButton>
      <SortingButton
        onClick={() => handleChangeSortBy("relevant")}
        isActive={sortBy === "recent"}
      >
        Recent
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
