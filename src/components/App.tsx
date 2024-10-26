import { useEffect, useState } from "react";
import Background from "./Background";
import Container from "./Container";
import Footer from "./Footer";
import Header, { HeaderTop } from "./Header";
import Logo from "./Logo";
import BookmarksButton from "./BookmarksButton";
import SearchForm from "./SearchForm";
import Sidebar, { SidebarTop } from "./Sidebar";
import JobItemContent from "./JobItemContent";
import ResultsCount from "./ResultsCount";
import JobList from "./JobList";
import PaginationControls from "./PaginationControls";
import SortingControls from "./SortingControls";

function App() {
  const [jobItems, setJobItems] = useState([]);
  const [searchText, setSearchText] = useState("");
  useEffect(() => {
    if (!searchText) return;
    try {
      const search = async () => {
        const response = await fetch(
          `https://byteg  rad.com/course-assets/projects/rmtdev/api/data?search=${searchText}`
        );
        const data = await response.json();
        setJobItems(data.jobItems);
      };

      search();
    } catch (error) {
      console.error(`Error fetching data` + error);
    }
  }, [searchText]);
  return (
    <>
      <Background />

      <Header />

      <Container />
      <Footer />
    </>
  );
}

export default App;
