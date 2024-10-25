import { useEffect, useState } from "react";

export default function SearchForm() {
  const [searchText, setSearchText] = useState("");

  useEffect(() => {
    if (!searchText) return;
    try {
      const search = async () => {
        const response = await fetch(
          `https://bytegrad.com/course-assets/projects/rmtdev/api/data?search=${searchText}`
        );
        const data = await response.json();
        console.log(data.jobItems);
      };

      search();
    } catch (error) {
      console.error(`Error fetching data` + error);
    }
  }, [searchText]);

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
      }}
      action="#"
      className="search"
    >
      <button type="submit">
        <i className="fa-solid fa-magnifying-glass"></i>
      </button>

      <input
        value={searchText}
        onChange={(e) => setSearchText(e.target.value)}
        spellCheck="false"
        type="text"
        required
        placeholder="Find remote developer jobs..."
      />
    </form>
  );
}
