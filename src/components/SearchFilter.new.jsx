import { useState, useRef, useCallback } from 'react';
import './SearchFilter.css';

const SearchFilter = ({ onSearch, onGenerationChange }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [generation, setGeneration] = useState('all');
  const searchTimeoutRef = useRef(null);

  // Busca com debounce para melhor performance
  const handleSearch = useCallback((value) => {
    setSearchTerm(value);
    
    if (searchTimeoutRef.current) {
      clearTimeout(searchTimeoutRef.current);
    }

    searchTimeoutRef.current = setTimeout(() => {
      onSearch(value);
    }, 500);
  }, [onSearch]);

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    onSearch(searchTerm);
  };

  const handleSearchBlur = () => {
    if (searchTerm.trim()) {
      onSearch(searchTerm);
    }
  };

  const handleGenerationChange = (value) => {
    setGeneration(value);
    onGenerationChange(value);
  };

  return (
    <div className="search-filter">
      <form onSubmit={handleSearchSubmit} className="search-box">
        <input
          type="text"
          placeholder="Buscar Pokémon..."
          value={searchTerm}
          onChange={(e) => handleSearch(e.target.value)}
          onBlur={handleSearchBlur}
          aria-label="Buscar Pokémon"
        />
        <button type="submit" className="search-button" aria-label="Buscar">
          <svg className="search-icon" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
            <path d="M15.5 14h-.79l-.28-.27C15.41 12.59 16 11.11 16 9.5 16 5.91 13.09 3 9.5 3S3 5.91 3 9.5 5.91 16 9.5 16c1.61 0 3.09-.59 4.23-1.57l.27.28v.79l5 4.99L20.49 19l-4.99-5zm-6 0C7.01 14 5 11.99 5 9.5S7.01 5 9.5 5 14 7.01 14 9.5 11.99 14 9.5 14z"/>
          </svg>
        </button>
      </form>
      <select 
        value={generation}
        onChange={(e) => handleGenerationChange(e.target.value)}
        className="generation-select"
        aria-label="Selecionar Geração"
      >
        <option value="all">Todas Gerações</option>
        <option value="1">Geração 1 (1-151)</option>
        <option value="2">Geração 2 (152-251)</option>
        <option value="3">Geração 3 (252-386)</option>
        <option value="4">Geração 4 (387-493)</option>
        <option value="5">Geração 5 (494-649)</option>
        <option value="6">Geração 6 (650-721)</option>
        <option value="7">Geração 7 (722-809)</option>
        <option value="8">Geração 8 (810-898)</option>
      </select>
    </div>
  );
};

export default SearchFilter;