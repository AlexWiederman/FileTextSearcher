import React, { useEffect, useState } from "react";
import { useStoreContext } from "../../utils/GlobalState";
import { idbPromise } from "../../utils/helpers";


function SearchButtons() {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState([]);

  const handleQueryChange = (event) => {
    setQuery(event.target.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    fetch(`/search?q=${query}`)
      .then((response) => response.json())
      .then((data) => setResults(data))
      .catch((error) => console.log(error));
  };

  return (
    <div>
      {/* <form onSubmit={handleSubmit}> */}
        <input type="text" value={query} onChange={handleQueryChange} />
        <button type="submit" onChange={handleQueryChange} onClick={handleSubmit}>Search</button>
      {/* </form> */}
      <div>
        Hello {results}
      </div>
      {results.length > 0 ? (
        
      <ul>
        
        {results.map((result) => (
          
          <li key={result}>{result}</li>
        ))}
      </ul>
       ) : (
        <ul>
          No Results
        </ul>
       )}

    </div>
  );
}


export default SearchButtons;
