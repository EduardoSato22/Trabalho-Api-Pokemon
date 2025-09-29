import { useState, useEffect, useCallback, useMemo } from "react";
import PokemonCard from "../components/PokemonCard";
import SearchFilter from "../components/SearchFilter";
import LoadingSpinner from "../components/LoadingSpinner";
import { fetchPokemons, fetchPokemonDetails } from "../services/api";
import "./Home.css";

const generationRanges = {
  all: { limit: 151, offset: 0 }, // Primeira geração completa inicialmente
  1: { limit: 151, offset: 0 },
  2: { limit: 100, offset: 151 },
  3: { limit: 135, offset: 251 },
  4: { limit: 107, offset: 386 },
  5: { limit: 156, offset: 493 },
  6: { limit: 72, offset: 649 },
  7: { limit: 88, offset: 721 },
  8: { limit: 96, offset: 809 },
  9: { limit: 120, offset: 905 },
};

const Home = () => {
  const [allPokemons, setAllPokemons] = useState([]);
  const [filteredPokemons, setFilteredPokemons] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [generation, setGeneration] = useState("all");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const [currentPage, setCurrentPage] = useState(1);
  const pokemonsPerPage = 12; // Reduzido para melhor visualização em telas menores

  const loadPokemons = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);
      setCurrentPage(1); // Reset página ao carregar nova geração
      
      const { limit, offset } = generationRanges[generation];
      let pokemons = [];
      
      if (generation === 'all') {
        // Carrega todos os pokémons
        const [gen1, gen2] = await Promise.all([
          fetchPokemons(0, 151),
          fetchPokemons(151, 100)
        ]);
        pokemons = [...gen1, ...gen2];
      } else {
        const newPokemons = await fetchPokemons(offset, limit);
        if (newPokemons && Array.isArray(newPokemons)) {
          pokemons = newPokemons;
        } else {
          throw new Error("Formato de dados inválido");
        }
      }
      
      setAllPokemons(pokemons);
      
    } catch (err) {
      setError("Falha ao carregar os Pokémons. Tente novamente mais tarde.");
      console.error("Erro ao carregar pokémons:", err);
    } finally {
      setLoading(false);
    }
  }, [generation]);

  useEffect(() => {
    loadPokemons();
  }, [loadPokemons]);

  useEffect(() => {
    // Filtra os pokémons baseado no termo de busca
    const filtered = searchTerm
      ? allPokemons.filter((pokemon) =>
          pokemon.name.toLowerCase().includes(searchTerm.toLowerCase())
        )
      : allPokemons;

    setFilteredPokemons(filtered);
    setCurrentPage(1);
  }, [searchTerm, allPokemons]);

  const paginatedPokemons = useMemo(() => {
    const startIndex = (currentPage - 1) * pokemonsPerPage;
    return filteredPokemons.slice(startIndex, startIndex + pokemonsPerPage);
  }, [filteredPokemons, currentPage, pokemonsPerPage]);

  const totalPages = Math.ceil(filteredPokemons.length / pokemonsPerPage);

  const handleSearch = useCallback((term) => {
    setSearchTerm(term);
  }, []);

  const handleGenerationChange = useCallback((gen) => {
    setGeneration(gen);
    // Mantém o termo de busca ao mudar de geração
    setCurrentPage(1);
  }, []);

  const renderContent = () => {
    return (
      <>
        <SearchFilter
          onSearch={handleSearch}
          onGenerationChange={handleGenerationChange}
        />
        
        <div className={`content-container ${loading ? 'loading' : ''}`}>
          {loading && <LoadingSpinner />}
          
          {!loading && error && (
            <div className="error-container">
              <div className="error-content">
                <svg className="error-icon" viewBox="0 0 24 24">
                  <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 15h-2v-2h2v2zm0-4h-2V7h2v6z"/>
                </svg>
                <p>{error}</p>
                <button onClick={loadPokemons} className="retry-button">
                  Tentar Novamente
                </button>
              </div>
            </div>
          )}
          
          {!loading && !error && (
            <>
              {paginatedPokemons.length > 0 ? (
                <div className="pokemon-grid">
                  {paginatedPokemons.map((pokemon) => (
                    <PokemonCard key={pokemon.id} pokemon={pokemon} />
                  ))}
                </div>
              ) : (
                <div className="no-results">
                  <svg className="search-icon" viewBox="0 0 24 24">
                    <path d="M15.5 14h-.79l-.28-.27C15.41 12.59 16 11.11 16 9.5 16 5.91 13.09 3 9.5 3S3 5.91 3 9.5 5.91 16 9.5 16c1.61 0 3.09-.59 4.23-1.57l.27.28v.79l5 4.99L20.49 19l-4.99-5zm-6 0C7.01 14 5 11.99 5 9.5S7.01 5 9.5 5 14 7.01 14 9.5 11.99 14 9.5 14z"/>
                  </svg>
                  <p>Nenhum Pokémon encontrado.</p>
                </div>
              )}

              {totalPages > 1 && (
                <div className="pagination">
                  <button
                    onClick={() => setCurrentPage(p => Math.max(1, p - 1))}
                    disabled={currentPage === 1}
                    className="pagination-button"
                  >
                    Anterior
                  </button>
                  <div className="pagination-info">
                    Página <span className="current-page">{currentPage}</span> de {totalPages}
                  </div>
                  <button
                    onClick={() => setCurrentPage(p => Math.min(totalPages, p + 1))}
                    disabled={currentPage === totalPages}
                    className="pagination-button"
                  >
                    Próxima
                  </button>
                </div>
              )}
            </>
          )}
        </div>
      </>
    );
  };

  return (
    <div className="home-container">
      {renderContent()}
    </div>
  );
};

export default Home;
