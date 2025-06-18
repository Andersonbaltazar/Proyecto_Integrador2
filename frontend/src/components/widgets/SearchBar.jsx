import { useState, useEffect } from 'react';
import useDebounce from '../../hooks/useDebounce';
import PropTypes from 'prop-types';

const SearchBar = ({ placeholder, onSearch }) => {
  const [query, setQuery] = useState('');
  const debouncedQuery = useDebounce(query, 500);

  useEffect(() => {
    onSearch(debouncedQuery.trim());
  }, [debouncedQuery, onSearch]);

  return (
    <form className="search-bar d-flex align-center gap-2">
      <ion-icon name="search" className="search-icon"></ion-icon>
      <input
        type="text"
        className="search-input"
        onChange={e => setQuery(e.target.value)}
        placeholder={placeholder}
      />
    </form>
  );
};

SearchBar.propTypes = {
  placeholder: PropTypes.string.isRequired,
  onSearch: PropTypes.func.isRequired,
};

export default SearchBar;