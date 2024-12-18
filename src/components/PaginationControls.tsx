import { ArrowLeftIcon, ArrowRightIcon } from "@radix-ui/react-icons";
import { PageDirection } from "../lib/types";
type PaginationProps = {
  onClick: (direction: PageDirection) => void;
  currentPage: number;
  totalNumberOfPages: number;
};

export default function Pagination({
  onClick,
  currentPage,
  totalNumberOfPages,
}: PaginationProps) {
  return (
    <section className="pagination">
      {currentPage > 1 && (
        <PaginationButton
          onClick={() => onClick("prev")}
          currentPage={currentPage}
          direction="prev"
        />
      )}
      {currentPage < totalNumberOfPages && (
        <PaginationButton
          onClick={() => onClick("next")}
          currentPage={currentPage}
          direction="next"
        />
      )}
    </section>
  );
}

function PaginationButton({
  direction,
  currentPage,
  onClick,
}: {
  direction: PageDirection;
  onClick: () => void;
  currentPage: number;
}) {
  return (
    <button
      onClick={(e) => {
        onClick();
        e.currentTarget.blur();
      }}
      className={`pagination__button pagination__button--${direction}`}
    >
      {direction === "prev" && (
        <>
          <ArrowLeftIcon />
          {currentPage - 1}
        </>
      )}
      {direction === "next" && (
        <>
          {currentPage + 1}
          <ArrowRightIcon />
        </>
      )}
    </button>
  );
}
