import {
  state,
  paginationEl,
  paginationBtnBackEl,
  paginationBtnNextEl,
  paginationNumberBackEl,
  paginationNumberNextEl,
} from "../common.js";

import renderJobList from "./Joblist.js";

const renderPaginationButtons = () => {
  if (state.currentPage > 1) {
    paginationBtnBackEl.classList.remove("pagination__button--hidden");
  } else {
    paginationBtnBackEl.classList.add("pagination__button--hidden");
  }

  if (state.searchJobItems.length / 7 <= state.currentPage) {
    console.log("called hide");
    paginationBtnNextEl.classList.add("pagination__button--hidden");
  } else {
    paginationBtnNextEl.classList.remove("pagination__button--hidden");
  }

  paginationNumberNextEl.textContent = state.currentPage + 1;
  paginationNumberBackEl.textContent = state.currentPage - 1;

  paginationBtnBackEl.blur();
  paginationBtnNextEl.blur();
};

const clickHandler = (e) => {
  const clickedButtonEl = e.target.closest(".pagination__button");

  if (!clickedButtonEl) return;

  const nextPage = clickedButtonEl.className.includes("--next") ? true : false;

  nextPage ? state.currentPage++ : state.currentPage--;

  renderJobList();
  renderPaginationButtons();
};

paginationEl.addEventListener("click", clickHandler);

export default renderPaginationButtons;
