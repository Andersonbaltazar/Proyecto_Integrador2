import { useState, useEffect } from 'react';
import useDebounce from '../../hooks/useDebounce';
import PropTypes from 'prop-types';

const EnhancedSearchBar = ({ placeholder, onSearch, className = '' }) => {
  const [query, setQuery] = useState('');
  const [isFocused, setIsFocused] = useState(false);
  const debouncedQuery = useDebounce(query, 500);

  useEffect(() => {
    onSearch(debouncedQuery.trim());
  }, [debouncedQuery, onSearch]);

  const handleFocus = () => setIsFocused(true);
  const handleBlur = () => setIsFocused(false);

  return (
    <div className={`enhanced-search-section ${className}`}>
      <div className={`enhanced-search-bar ${isFocused ? 'focused' : ''}`}>
        <ion-icon 
          name="search" 
          className="enhanced-search-icon"
          style={{ 
            transform: isFocused ? 'scale(1.1)' : 'scale(1)',
            transition: 'transform 0.3s ease'
          }}
        ></ion-icon>
        <input
          type="text"
          className="enhanced-search-input"
          value={query}
          onChange={e => setQuery(e.target.value)}
          onFocus={handleFocus}
          onBlur={handleBlur}
          placeholder={placeholder}
        />
        {query && (
          <button
            onClick={() => setQuery('')}
            style={{
              background: 'none',
              border: 'none',
              cursor: 'pointer',
              color: 'var(--text-muted)',
              fontSize: 'calc(var(--size) * 4)',
              opacity: 0.7,
              transition: 'opacity 0.3s ease'
            }}
            onMouseEnter={e => e.target.style.opacity = '1'}
            onMouseLeave={e => e.target.style.opacity = '0.7'}
          >
            <ion-icon name="close-circle"></ion-icon>
          </button>
        )}
      </div>
    </div>
  );
};

EnhancedSearchBar.propTypes = {
  placeholder: PropTypes.string.isRequired,
  onSearch: PropTypes.func.isRequired,
  className: PropTypes.string,
};

export default EnhancedSearchBar; 