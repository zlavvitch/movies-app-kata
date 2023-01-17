import { Input } from "antd";
import { debounce } from "lodash";

import "./Search.scss";

function Search({ searchMovies }) {
  const debouncedSearch = debounce((value) => {
    searchMovies(value);
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
    />
  );
}

export default Search;

// import { Component } from "react";
// class Search extends Component {
//   constructor(props) {
//     super(props);

//     this.state = {
//       text: "",
//     };

//     console.log("const");
//   }

//   componentDidMount() {
//     console.log("mount");
//     this.onValueChange();
//   }

//   componentDidUpdate(prevProps, prevState) {
//     console.log("update", prevState);
//   }

//   componentWillUnmount() {
//     console.log("unmount");
//   }

//   // eslint-disable-next-line react/sort-comp
//   debouncedSearch = debounce((value) => {
//     const { searchMovies } = this.props;
//     searchMovies(value);
//   }, 500);

//   onValueChange = (e) => {
//     const target = e.target.value;

//     if (target.trim() === "") {
//       return;
//     }

//     this.debouncedSearch(target);
//   };

//   render() {
//     console.log("rendre");

//     return (
//       <Input
//         className="search"
//         placeholder="Type to search..."
//         size="large"
//         onChange={(e) => this.onValueChange(e)}
//         autoFocus
//       />
//     );
//   }
// }
