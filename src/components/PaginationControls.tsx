import { ArrowLeftIcon, ArrowRightIcon } from "@radix-ui/react-icons";
import { PageDirection } from "../lib/types";
import { useJobItemContext } from "../lib/hooks";

export default function Pagination() {
  const { handleChangePage, currentPage, totalNumberOfPages } =
    useJobItemContext();
  return (
    <section className="pagination">
      {currentPage > 1 && (
        <PaginationButton
          onClick={() => handleChangePage("prev")}
          currentPage={currentPage}
          direction="prev"
        />
      )}
      {currentPage < totalNumberOfPages && (
        <PaginationButton
          onClick={() => handleChangePage("next")}
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
