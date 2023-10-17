import React, { useState,  FormEvent, useEffect} from "react";
import QuerySanitizer from "../helpers/QuerySanitizer";
import { searchImages } from "./PerformSearch";
import InfiniteScroll from "react-infinite-scroll-component";



export default function SearchPhotos() {
  const [query, setQuery] = useState("");
  const [allImages, setImages] = useState<any[]>([]);
  const [totalPages, setTotalPages] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);
  // console.log(query);

  const fetchMoreImages = async (page: number) => {
    if (query.length === 0) {
      return;
    }

    const sanitizedQuery = QuerySanitizer(query);
    const data = await searchImages(sanitizedQuery, page);

    if (data) {
      console.log("Found data")
      setImages([...allImages, ...data.results]);
      setTotalPages(data.total_pages);
      console.log("Images: ", allImages)
    }
  };


  const handleQuery = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    // setCurrentPage(1); // Reset to the first page when submitting the form
    // console.log("total pages: ", totalPages)
    // setTotalPages(0);
    // console.log("total pages: ", totalPages)
    // setImages([]);
    // console.log("Resetting");
    // console.log("Images: ", allImages)
    await fetchMoreImages(1);
  };
  

  const loadMoreImages = () => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
    }
  };
  
  useEffect(() => {
    if (currentPage > 1) {
      fetchMoreImages(currentPage);
    }
  }, [currentPage]);

  useEffect(() => {
    setCurrentPage(1); // Reset to the first page when submitting the form
    setTotalPages(0);
    setImages([]);
  }, [query]);

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
          placeholder={`Let's see what we can find!`}
          value={query}
          onChange={(e) => setQuery(e.target.value)}
        />
        <button type="submit" className="button">
          Search
        </button>
      </form>

      
      <InfiniteScroll
        dataLength={allImages.length}
        next={loadMoreImages} // Call the loadMoreImages function when scrolling down
        hasMore={currentPage < totalPages}
        loader={<h4>Loading...</h4>}
      >
 <div className='images'>
        {allImages.map((image) => (
          <img
            key={image.id}
            src={image.urls.small}
            alt={image.alt_description}
            className='image'
          />
        ))}
      </div>
      </InfiniteScroll>

    </>
  );
}