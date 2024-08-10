import {
  RESULTS_PER_PAGE,
  jobListSearchEl,
  jobDetailsContentEl,
  BASE_API_URL,
  getData,
  state,
  jobListBookmarksEl,
} from "../common.js";

import renderSpinner from "./Spinner.js";
import renderJobDetails from "./Jobdetails.js";
import renderError from "./Error.js";

const newJobItemHTML = (jobItem) => {
  return `
    <li class="job-item ${
      state.activeJobItem.id === jobItem.id && "job-item--active"
    }">
      <a class="job-item__link" href="${jobItem.id}">
        <div class="job-item__badge">${jobItem.badgeLetters}</div>
        <div class="job-item__middle">
          <h3 class="third-heading">${jobItem.title}</h3>
          <p class="job-item__company">${jobItem.company}</p>
          <div class="job-item__extras">
            <p class="job-item__extra">
              <i class="fa-solid fa-clock job-item__extra-icon"></i> ${
                jobItem.duration
              }
            </p>
            <p class="job-item__extra">
              <i class="fa-solid fa-money-bill job-item__extra-icon"></i> ${
                jobItem.salary
              }
            </p>
            <p class="job-item__extra">
              <i class="fa-solid fa-location-dot job-item__extra-icon"></i> ${
                jobItem.location
              }
            </p>
          </div>
        </div>
        <div class="job-item__right">
          <i class="fa-solid fa-bookmark job-item__bookmark-icon  ${
            state.bookmarkJobItems.some(
              (bookmarkJobItem) => bookmarkJobItem.id === jobItem.id
            ) && "job-item__bookmark-icon--bookmarked"
          }"></i>
          <time class="job-item__time">${jobItem.daysAgo}d</time>
        </div>
      </a>
    </li>
  `;
};

//--Job List Component--//

const renderJobList = (whichJobList = "search") => {
  const jobListEl =
    whichJobList === "search" ? jobListSearchEl : jobListBookmarksEl;

  jobListEl.innerHTML = "";

  let jobItems;
  if (whichJobList === "search") {
    jobItems = state.searchJobItems.slice(
      state.currentPage * RESULTS_PER_PAGE - RESULTS_PER_PAGE,
      state.currentPage * RESULTS_PER_PAGE
    );
  } else if (whichJobList === "bookmarks") {
    jobItems = state.bookmarkJobItems;
  }

  jobItems.forEach((jobItem) => {
    jobListEl.insertAdjacentHTML("beforeend", newJobItemHTML(jobItem));
  });
};

const clickHandler = (e) => {
  //Set Stage for loading new data
  e.preventDefault();
  const clickedEl = e.target.closest(".job-item");

  document
    .querySelectorAll(".job-item--active")
    .forEach((jobItemActiveClass) =>
      jobItemActiveClass.classList.remove("job-item--active")
    );

  jobDetailsContentEl.innerHTML = "";

  renderSpinner("job-details");

  const id = clickedEl.children[0].getAttribute("href");

  const allJobItems = [...state.searchJobItems, ...state.bookmarkJobItems];

  //set Active Item

  state.activeJobItem = allJobItems.find((jobItem) => jobItem.id === +id);

  //render search job list to show active item from bookmarks click
  renderJobList();

  history.pushState(null, "", `/#${id}`);

  //Server Query details function
  const fetchJobDetails = async () => {
    try {
      const data = await getData(`${BASE_API_URL}/jobs/${id}`);

      const { jobItem } = data;

      renderSpinner("job-details");

      jobDetailsContentEl.innerHTML = renderJobDetails(jobItem);
    } catch (error) {
      renderSpinner("job-details");
      renderError(error.message);
    }
  };
  fetchJobDetails();
};

jobListSearchEl.addEventListener("click", clickHandler);
jobListBookmarksEl.addEventListener("click", clickHandler);

export default renderJobList;