import React from 'react';

const SearchBar = ({placeholder}) => {
  return (
    <form className="search-bar d-flex align-center gap-2">
      <ion-icon name="search" className="search-icon"></ion-icon>
      <input
        type="text"
        className="search-input"
        placeholder={placeholder}
      />
    </form>
  );
};

export default SearchBar;