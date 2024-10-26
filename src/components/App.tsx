import Background from "./Background";
import Container from "./Container";
import Footer from "./Footer";
import Header from "./Header";

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
