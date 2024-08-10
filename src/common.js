//Selectors

export const state = {
  searchJobItems: [],
  currentPage: 1,
  activeJobItem: {},
  bookmarkJobItems: [],
};

export const bookmarksBtnEl = document.querySelector(".bookmarks-btn");
export const errorTextEl = document.querySelector(".error__text");
export const jobDetailsEl = document.querySelector(".job-details");
export const jobDetailsContentEl = document.querySelector(
  ".job-details__content"
);
export const jobListBookmarksEl = document.querySelector(
  ".job-list--bookmarks"
);
export const jobListSearchEl = document.querySelector(".job-list--search");
export const numberEl = document.querySelector(".count__number");
export const paginationEl = document.querySelector(".pagination");
export const paginationBtnNextEl = document.querySelector(
  ".pagination__button--next"
);
export const paginationBtnBackEl = document.querySelector(
  ".pagination__button--back"
);
export const paginationNumberNextEl = document.querySelector(
  ".pagination__number--next"
);
export const paginationNumberBackEl = document.querySelector(
  ".pagination__number--back"
);
export const searchFormEl = document.querySelector(".search");
export const searchInputEl = document.querySelector(".search__input");
export const sortingEl = document.querySelector(".sorting");
export const sortingBtnRelevantEl = document.querySelector(
  ".sorting__button--relevant"
);
export const sortingBtnRecentEl = document.querySelector(
  ".sorting__button--recent"
);
export const spinnerSearchEl = document.querySelector(".spinner--search");
export const spinnerJobDetailsEl = document.querySelector(
  ".spinner--job-details"
);
export const errorEl = document.querySelector(".error");

//Constants

export const BASE_API_URL = "https://bytegrad.com/course-assets/js/2/api";

export const DEFAULT_DISPLAY_TIME = 3500;

export const RESULTS_PER_PAGE = 7;

//Helper Functions

export const getData = async (completeURL) => {
  const response = await fetch(completeURL);

  console.log(response);
  const data = await response.json();
  console.log(response.statusText);
  if (!response.ok) {
    throw new Error(response.status + " " + data.description);
  }

  return data;
};