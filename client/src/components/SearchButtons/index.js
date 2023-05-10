import React, { useState } from "react";
// import { useStoreContext } from "../../utils/GlobalState";
// import { idbPromise } from "../../utils/helpers";


function SearchButtons() {
  const [query, setQuery] = useState('');
  const [directory, setDirectory] = useState('');
  const [results, setResults] = useState([]);

  const handleQueryChange = (event) => {
    setQuery(event.target.value);
  };
  const handleDirectoryChange = (event) => {
    setDirectory(event.target.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    fetch(`/search?q=${query}&d=${directory}`)
      .then((response) => response.json())
      .then((data) =>{
        console.log('Data:', data);
        setResults(data);
      })
      .catch((error) => console.log('Error:', error));
  };

  return (
    <div>

<div>
  <p>
    This will search for the Text in either file names or text that is various file types, such as .xls, .doc, or .txt.
  </p>
        Search Text: 
        <input type="text" value={query} onChange={handleQueryChange} />
      </div>
      
      <div>
        Search Location: 
        <input type="text" value={directory} onChange={handleDirectoryChange} />
        Ex: C:\ExampleKnowledgebase
      </div>
      <div>
        <button type="submit" onClick={handleSubmit}>Search</button>
      </div>
      <p>
        *Will not work with files larger than 2gb and not reccomended to use a One Drive directory.
      </p>
      {/* <form onSubmit={handleSubmit}> */}
        {/* <input type="text" value={query} onChange={handleQueryChange} />
        <button type="submit" onChange={handleQueryChange} onClick={handleSubmit}>Search</button> */}
      {/* </form> */}
      <p>Results:</p>
      
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
