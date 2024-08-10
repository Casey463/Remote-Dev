import {
  jobDetailsContentEl,
  BASE_API_URL,
  getData,
  state,
} from "../common.js";

import renderJobList from "./Joblist.js";

import renderSpinner from "./Spinner.js";
import renderJobDetails from "./Jobdetails.js";
import renderError from "./Error.js";

const loadHashChangeHandler = async () => {
  const id = window.location.hash.substring(1);

  //Set Stage for loading job details from hash
  if (id) {
    document
      .querySelectorAll(".job-item--active")
      .forEach((jobItemActiveClass) =>
        jobItemActiveClass.classList.remove("job-item--active")
      );

    jobDetailsContentEl.innerHTML = "";
    renderSpinner("job-details");

    //Load Job Details from Hash
    try {
      const { jobItem } = await getData(`${BASE_API_URL}/jobs/${id}`);

      state.activeJobItem = jobItem;

      renderJobList();

      renderSpinner("job-details");

      jobDetailsContentEl.innerHTML = renderJobDetails(jobItem);
    } catch (error) {
      renderSpinner("job-details");
      renderError(error.message);
    }
  }
};

window.addEventListener("DOMContentLoaded", loadHashChangeHandler);
window.addEventListener("hashchange", loadHashChangeHandler);

export default loadHashChangeHandler;
