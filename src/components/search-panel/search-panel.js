import { Form, FormControl, Button } from "react-bootstrap";
import { Link, useHistory } from "react-router-dom";
import { useState } from "react";

const SearchPanel = () => {
  const [query, setQuery] = useState("");
  const history = useHistory();

  function getQuery(e) {
    setQuery(e.target.value);
  }

  function search() {
    if (query.trim() !== "") {
      history.push(`/search_results/${encodeURIComponent(query.trim())}`);
    }
  }

  function clearInputs() {
    setQuery("");
  }

  return (
    <Form className="d-flex" onSubmit={(e) => e.preventDefault()}>
      <FormControl id="search-form" type="search" placeholder="Search" className="me-2" aria-label="Search" value={query} onChange={getQuery} />
      <Link to={`/search_results/${encodeURIComponent(query.trim())}`}>
        <Button variant="outline-light" onClick={clearInputs}>
          Search
        </Button>
      </Link>
    </Form>
  );
};

export default SearchPanel;

// import { Form, FormControl, Button } from "react-bootstrap";
// import { Link } from "react-router-dom";
// import { useState } from "react";

// const SearchPanel = () => {
//   const [query, setQuery] = useState();
//   const [search, setSearch] = useState();

//   function getQuery(e) {
//     setQuery((query) => e.target.value);
//   }

//   function clearInputs() {
//     document.getElementById("search-form").value = "";
//   }

//   function submitSearch(){

//   }

//   return (
//     <Form className="d-flex">
//       <FormControl id="search-form" type="search" placeholder="Search" className="me-2" aria-label="Search" onChange={getQuery} />
//       <Link to={`/search_results/${query}`}>
//         <Button variant="outline-light" onClick={submitSearch} onSubmit={clearInputs}>
//           Search
//         </Button>
//       </Link>
//     </Form>
//   );
// };

// export default SearchPanel;
