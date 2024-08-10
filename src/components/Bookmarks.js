import {
  state,
  bookmarksBtnEl,
  jobDetailsEl,
  jobListBookmarksEl,
} from "../common.js";

import renderJobList from "./Joblist.js";

//Bookmark / Unbookmark

const clickHandler = (e) => {
  if (!e.target.className.includes("bookmark")) return;

  if (
    state.bookmarkJobItems.some(
      (bookmarkJobItem) => bookmarkJobItem.id === state.activeJobItem.id
    )
  ) {
    state.bookmarkJobItems = state.bookmarkJobItems.filter(
      (bookmarkJobItem) => bookmarkJobItem.id !== state.activeJobItem.id
    );
  } else {
    state.bookmarkJobItems.push(state.activeJobItem);
  }

  //Persist Data with local storage

  localStorage.setItem(
    "bookmarkJobItems",
    JSON.stringify(state.bookmarkJobItems)
  );

  document
    .querySelector(".job-info__bookmark-icon")
    .classList.toggle("job-info__bookmark-icon--bookmarked");

  //Render Search Joblist
  renderJobList();
};

const mouseEnterHandler = () => {
  bookmarksBtnEl.classList.add("bookmarks-btn--active");

  jobListBookmarksEl.classList.add("job-list--visible");

  renderJobList("bookmarks");
};

const mouseLeaveHandler = () => {
  bookmarksBtnEl.classList.remove("bookmarks-btn--active");

  jobListBookmarksEl.classList.remove("job-list--visible");
};

bookmarksBtnEl.addEventListener("mouseenter", mouseEnterHandler);
jobListBookmarksEl.addEventListener("mouseleave", mouseLeaveHandler);

jobDetailsEl.addEventListener("click", clickHandler);