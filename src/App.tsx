import React from 'react';
import './App.css';
import SearchPhotos from './search/SearchPhotos.tsx';

function App() {
  return (
    <div className="App">
      <div className="container">
        <h1 className="title">Image Search</h1>
        <SearchPhotos />
      </div>
    </div>
  );
} export default App;