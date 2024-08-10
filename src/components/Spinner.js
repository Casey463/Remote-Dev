import { spinnerJobDetailsEl, spinnerSearchEl } from "../common.js";

const renderSpinner = (element) => {
  const spinnerEl =
    element === "search" ? spinnerSearchEl : spinnerJobDetailsEl;

  spinnerEl.classList.toggle("spinner--visible");
};

export default renderSpinner;
