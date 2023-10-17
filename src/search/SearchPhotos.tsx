import React, { useState } from "react";
import QuerySanitizer from "../helpers/QuerySanitizer";
export default function SearchPhotos() {
  const [query, setQuery] = useState("");
  console.log(query);

  const handleQuery = async (e: { preventDefault: () => void; }) => {
    e.preventDefault();

    console.log("Submit")
    const sanitizedQuery = QuerySanitizer(query)
    console.log(`Sanitzed: ${sanitizedQuery}`)

  };

  return (
    <>
      <form className="form" onSubmit={handleQuery}>
        <label className="label" htmlFor="query">
          {" "}
          
        </label>
        <input
          type="text"
          name="query"
          className="input"
          placeholder={`Try "dog" or "apple"`}
          value={query}
          onChange={(e) => setQuery(e.target.value)}
        />
        <button type="submit" className="button">
          Search
        </button>
      </form>
    </>
  );
}