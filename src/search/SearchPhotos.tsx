import React, { useState } from "react";
import QuerySanitizer from "../helpers/QuerySanitizer";
import { searchImages } from "./PerformSearch";




export default function SearchPhotos() {
  const [query, setQuery] = useState("");
  const [allImages, setImages] = useState<any[]>([]);
  const [totalPages, setTotalPages] = useState(0);
  console.log(query);

  const handleQuery = async (e: { preventDefault: () => void; }) => {
    e.preventDefault();

    // console.log("Submit")
    const sanitizedQuery = QuerySanitizer(query)
    // console.log(`Sanitzed: ${sanitizedQuery}`)
    const data  = await searchImages(sanitizedQuery);
  //   if (data == null) {
  //     console.log('Instance is null or undefined');
  // } else {
  //     console.log(data!.name); // ok now
  // }
    setImages(data.results);
    setTotalPages(data.total_pages);
    console.log('data: ', data);
    console.log('images', allImages);
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

      <div className="card-list">
        {allImages.map((pic) => (
          <div className="card" key={pic.id}>
            <img
              className="card--image"
              alt={pic.alt_description}
              src={pic.urls.full}
              width="50%"
              height="50%"
            ></img>
          </div>
        ))}{" "}
      </div>

    </>
  );
}