import { useState, useCallback, useEffect } from "react";
import "./SearchFilter.css";

const SearchFilter = ({ onSearch, onGenerationChange }) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [generation, setGeneration] = useState(() => {
    return localStorage.getItem('selectedGeneration') || "all";
  });

  const debounce = (func, wait) => {
    let timeout;
    return (...args) => {
      clearTimeout(timeout);
      timeout = setTimeout(() => func(...args), wait);
    };
  };

  // Cria uma versão debounced da função de busca
  const debouncedSearch = useCallback(
    debounce((value) => {
      onSearch(value);
    }, 300),
    [onSearch]
  );

  const handleInputChange = useCallback((e) => {
    const value = e.target.value;
    setSearchTerm(value);
    debouncedSearch(value);
  }, [debouncedSearch]);

  const handleGenerationChange = useCallback((e) => {
    const newGeneration = e.target.value;
    setGeneration(newGeneration);
    localStorage.setItem('selectedGeneration', newGeneration);
    onGenerationChange(newGeneration);
  }, [onGenerationChange]);

  // Limpa o timeout do debounce ao desmontar o componente
  useEffect(() => {
    return () => {
      debouncedSearch.cancel?.();
    };
  }, [debouncedSearch]);

  return (
    <div className="search-filter">
      <div className="search-box">
        <input
          type="text"
          placeholder="Buscar Pokémon..."
          value={searchTerm}
          onChange={handleInputChange}
          className="search-input"
          autoComplete="off"
        />
        <button 
          className="search-button"
          onClick={() => onSearch(searchTerm)}
          aria-label="Buscar"
        >
          <svg 
            className="search-icon" 
            viewBox="0 0 24 24" 
            xmlns="http://www.w3.org/2000/svg"
          >
            <path d="M15.5 14h-.79l-.28-.27A6.471 6.471 0 0016 9.5 6.5 6.5 0 109.5 16c1.61 0 3.09-.59 4.23-1.57l.27.28v.79l5 4.99L20.49 19l-4.99-5zm-6 0C7.01 14 5 11.99 5 9.5S7.01 5 9.5 5 14 7.01 14 9.5 11.99 14 9.5 14z"/>
          </svg>
        </button>
      </div>
      <select 
        value={generation}
        onChange={handleGenerationChange}
        className="generation-select"
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
        <option value="9">Geração 9 (899+)</option>
      </select>
    </div>
  );
};

export default SearchFilter;
