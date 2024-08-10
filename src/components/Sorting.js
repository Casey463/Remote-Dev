import {
  sortingEl,
  sortingBtnRecentEl,
  sortingBtnRelevantEl,
  state,
} from "../common.js";

import renderJobList from "./Joblist.js";
import renderPaginationButtons from "./Pagination.js";

const clickHandler = (e) => {
  //get clicked button Element
  const clickedButtonEl = e.target.closest(".sorting__button");

  if (!clickedButtonEl) return;

  state.currentPage = 1;

  const recent = clickedButtonEl.className.includes("--recent") ? true : false;

  console.log(recent);

  if (recent) {
    sortingBtnRecentEl.classList.add("sorting__button--active");
    sortingBtnRelevantEl.classList.remove("sorting__button--active");
  } else {
    console.log("called");
    sortingBtnRelevantEl.classList.add("sorting__button--active");
    sortingBtnRecentEl.classList.remove("sorting__button--active");
  }

  if (recent) {
    state.searchJobItems.sort((a, b) => {
      return a.daysAgo - b.daysAgo;
    });
  } else {
    state.searchJobItems.sort((a, b) => {
      return b.relevanceScore - a.relevanceScore;
    });
  }

  renderPaginationButtons();

  renderJobList();
};

sortingEl.addEventListener("click", clickHandler);
