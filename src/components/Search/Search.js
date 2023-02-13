import { Input } from "antd";
import { debounce } from "lodash";

import "./Search.scss";

function Search({ searchMovies }) {
  const debouncedSearch = debounce((currValue) => {
    searchMovies(currValue);
  }, 500);

  const onValueChange = (event) => {
    const target = event.target.value;

    if (target.trim() === "") {
      debouncedSearch("");
    }

    debouncedSearch(target);
  };

  return (
    <Input
      className="search"
      placeholder="Type to search..."
      size="large"
      onChange={onValueChange}
      autoFocus
      allowClear
    />
  );
}

export default Search;
