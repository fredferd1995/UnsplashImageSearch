## AppStem Demo

### Overview
Create an app/website that allows users to search for and retrieve images. The site should implement an "infinite scroll" functionality. Do not use any off-the-shelf APIs that encapsulate communication with the image provider (e.g. unsplash package)

### Example Usage

Try searching for "cat" or "dog". Scroll to your heart's content.
 ***

NOTE: Users should register as a developer for unsplash and receive their own API Access Key when cloning this project.
- See [this website](https://www.smashingmagazine.com/2023/05/safest-way-hide-api-keys-react/) for more information.
    - `npm install dotenv --save`
    - Create `.env` in root folder
    - Add: `REACT_APP_API_KEY = ENTER_YOUR_VERY_SECRET_API_KEY`
    - Add .env to .gitignore
    - Optional: See how to add env vars if deploying to a site like Heroku.
****


### Assumptions
- Small amount of users
- Small amount of searches (<50 per hour)
- Displayed images should reset upon searching for a new term
- We should not hit the API for empty search terms
- The site does not need to be pretty (yet)
- We should balance the amount of images that users can see at one time with the amount of network usage required for (possibly) large amounts of response data
    - I.e We should not request 10000s of images at one time. Rather we should think about how many images can reasonably be displayed on a single monitor and maybe fetch 2x that to provide for a smoother image viewing experience
    - To add to this, it is not likely that users will spend hours and hours searching for images in my opinion. Perhaps the average user will only search and view 20 results before leaving or initiating a new search.
- Unsplash will always be available

### Possible Extensions
- Implement a login service such that users can favorite images and save them
    - would require Authorization and Authentication service, database functionality
    - Users Database
    - Favorites Database (probably store links to content)
- Implement a cache for common search terms to avoid repeated API calls

### Known Gaps
- I recognize that there are standard paradigms and design patterns when designing both Front End and React Apps in general. I had to balance learning and utilizing some of these patterns with getting a working application out to you. 
- The error handling could be more robust -> currently an invalid API response will crash the app (i.e. anything other than a `200 OK`). 

### Architecture
Overall, I tried to separate out responsibilites when structuring my code. 
#### Dependencies
- `axios`: API requests
- `react-infinite-scroll-component`: Off-the-shelf lib for infinite scrolling

#### High-Level
- Users enter query in search bar
- Upon submission, the query is passed to the image search module, which ultimately will return the API response.
    - For this, I reviewed the [Unsplash documentation](https://unsplash.com/documentation#search-photos) to see the structure of their API.
    - at minimum, `query`, `page`, and `per_page` will be passed. This is the smallest amount of information that we need to successfully retrieve images.
    - We can use `axios.get` for simplicity to pass in the correct `url`, the required `params`, as well as our `user authentication`
- The response will contain links to images (along with other metadata) -> we can pass this response data to an allImages state variable. If we are scrolling, we can append the new results to this state variable as new results are requested.

#### Infinite Scroll
- As users scroll, the InfiniteScroll component detects when users have scrolled to 80% of the total height of the view
- This triggers a call to the `loadMoreImages` fn, which increments the `currentPage` stateVarable by `1`
- Upon a state change of `currentPage`, the application will call `fetchMoreImages` (which is the layer above/that interacts with the API) with the new page to fetch
- Overall this means we are fetching 1 page of results at a time, each time the user scrolls through (nearly) all results.
- KNOWN GAP: What happens when there are no more pages to return? There should be error handling, but I did not have time to implement this. I was thinking of displaying some message to the user. I can check this using the `totalPages` response value, as well as the `hasMore` and `endMessage` props of the infinite scroll library. What this means is that I could keep track of the current page, and once it reaches the same value as total pages, I would no longer make any additional API requests.

- Whenever a user makes a change to their query, I clear the results. This is so that old image searches do not persist. The assumption is that the user wants to see only images that pertain to their query at any given time regardless of the search history.
    - I ran into some issues attempting to change the state of the allImages variable when trying to reset/clear it at the time a new search is **executed**. I think there is a way to do it by keeping track of some additional state (like `isNewSearch`) and by leveraging `useEffect` or callback functions.
    - The best I could do is something like this with the time given:
    ``` 
    useEffect(() => {
    setCurrentPage(1); // Reset to the first page when submitting the form
    setTotalPages(0);
    setImages([]);
  }, [query]);
  ```
  - This means results are cleared whenever the user changes what is currently in the search field, even if they have not initiated the search yet. This is not ideal, but I think it is at least a partially valid assumption that users would not purposefully touch the content in the search field until they are ready to start a new search. It is a bit jarring and is not sensitive to, say,  accidental keyboard input, though.