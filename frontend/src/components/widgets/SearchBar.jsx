import React from 'react';

const SearchBar = ({placeholder}) => {
  return (
    <div className="search-bar d-flex align-center">
      <ion-icon name="search"></ion-icon>
      <input
        type="text"
        className="search-input"
        placeholder={placeholder}
      />
    </div>
  );
};

export default SearchBar;