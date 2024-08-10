//--Search Component-//
import {
  searchInputEl,
  searchFormEl,
  jobListSearchEl,
  numberEl,
  BASE_API_URL,
  sortingBtnRecentEl,
  sortingBtnRelevantEl,
  getData,
  state,
} from "../common.js";

import renderError from "./Error.js";
import renderSpinner from "./Spinner.js";
import renderJobList from "./Joblist.js";
import renderPaginationButtons from "./Pagination.js";

const newJobItemHTML = (jobItem) => {
  return `
    <li class="job-item">
      <a class="job-item__link" href="${jobItem.id}">
        <div class="job-item__badge">${jobItem.badgeLetters}</div>
        <div class="job-item__middle">
          <h3 class="third-heading">${jobItem.title}</h3>
          <p class="job-item__company">${jobItem.company}</p>
          <div class="job-item__extras">
            <p class="job-item__extra">
              <i class="fa-solid fa-clock job-item__extra-icon"></i> ${jobItem.duration}
            </p>
            <p class="job-item__extra">
              <i class="fa-solid fa-money-bill job-item__extra-icon"></i> ${jobItem.salary}
            </p>
            <p class="job-item__extra">
              <i class="fa-solid fa-location-dot job-item__extra-icon"></i> ${jobItem.location}
            </p>
          </div>
        </div>
        <div class="job-item__right">
          <i class="fa-solid fa-bookmark job-item__bookmark-icon"></i>
          <time class="job-item__time">${jobItem.daysAgo}d</time>
        </div>
      </a>
    </li>
  `;
};

searchFormEl.addEventListener("submit", (e) => {
  e.preventDefault();
  const searchText = searchInputEl.value;

  const forbiddenPattern = /[0-9]/;

  const patternMatch = forbiddenPattern.test(searchText);

  if (patternMatch) {
    renderError("You seatch may not contain numbers");
    return;
  } else {
    renderSpinner("search");

    searchInputEl.blur();

    jobListSearchEl.innerHTML = "";

    sortingBtnRelevantEl.classList.add("sorting__button--active");
    sortingBtnRecentEl.classList.remove("sorting__button--active");

    //Search Query Sever function
    const search = async () => {
      try {
        const { jobItems } = await getData(
          `${BASE_API_URL}/jobs?search=${searchText}`
        );

        state.searchJobItems = jobItems;

        state.currentPage = 1;

        renderPaginationButtons();

        renderSpinner("search");

        numberEl.textContent = jobItems.length;

        renderJobList();
      } catch (error) {
        renderSpinner("search");
        renderError(error.message);
        return;
      }
    };

    search();
  }
});
