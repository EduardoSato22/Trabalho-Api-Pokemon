import { useState, useEffect } from 'react';
import './PokemonDetails.css';
import { useParams, Link } from 'react-router-dom';
import LoadingSpinner from '../components/LoadingSpinner';
import { fetchPokemonDetails } from '../services/api';

const PokemonDetails = () => {
  const { name } = useParams();
  const [pokemon, setPokemon] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const loadDetails = async () => {
      try {
        setLoading(true);
        const data = await fetchPokemonDetails(name);
        setPokemon(data);
        setError(null);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    loadDetails();
  }, [name]);

  if (loading) return <LoadingSpinner />;
  if (error) return <div className="error">{error} <Link to="/">Voltar à Home</Link></div>;

  const getTypeColor = (type) => {
    const typeColors = {
      normal: "#A8A878",
      fire: "#F08030",
      water: "#6890F0",
      electric: "#F8D030",
      grass: "#78C850",
      ice: "#98D8D8",
      fighting: "#C03028",
      poison: "#A040A0",
      ground: "#E0C068",
      flying: "#A890F0",
      psychic: "#F85888",
      bug: "#A8B820",
      rock: "#B8A038",
      ghost: "#705898",
      dragon: "#7038F8",
      dark: "#705848",
      steel: "#B8B8D0",
      fairy: "#EE99AC"
    };
    return typeColors[type] || "#68A090";
  };

  const getStatColor = (value) => {
    if (value >= 150) return "#4CAF50";
    if (value >= 100) return "#8BC34A";
    if (value >= 70) return "#CDDC39";
    if (value >= 50) return "#FFC107";
    return "#FF5722";
  };

  // 🔹 Traduções das estatísticas
  const statTranslations = {
    hp: "HP",
    attack: "Ataque",
    defense: "Defesa",
    "special-attack": "Ataque Especial",
    "special-defense": "Defesa Especial",
    speed: "Velocidade"
  };

  return (
    <div className="details">
      <Link to="/" className="back-link">← Voltar à Home</Link>
      <div className="pokemon-header" style={{
        background: pokemon.types && pokemon.types.length > 0
          ? `linear-gradient(135deg, ${getTypeColor(pokemon.types[0])}88 0%, ${pokemon.types[1] 
            ? getTypeColor(pokemon.types[1])+'88' 
            : getTypeColor(pokemon.types[0])+'66'} 100%)`
          : 'linear-gradient(135deg, #64646488 0%, #32323266 100%)'
      }}>
        <div className="pokemon-info">
          <h2>{pokemon.name.charAt(0).toUpperCase() + pokemon.name.slice(1)}</h2>
          <p className="pokemon-number">#{String(pokemon.id).padStart(3, '0')}</p>
          <div className="pokemon-types">
            {pokemon.types.map(type => (
              <span 
                key={type} 
                className="type-badge"
                style={{ backgroundColor: getTypeColor(type) }}
              >
                {type.charAt(0).toUpperCase() + type.slice(1)}
              </span>
            ))}
          </div>
        </div>
        <img 
          src={pokemon.image} 
          alt={pokemon.name}
          className="pokemon-image" 
        />
      </div>
      
      <div className="pokemon-details-grid">
        <div className="details-card">
          <h3>Características</h3>
          <div className="characteristics">
            <div className="characteristic">
              <span className="label">Altura</span>
              <span className="value">{(pokemon.height / 10).toFixed(1)}m</span>
            </div>
            <div className="characteristic">
              <span className="label">Peso</span>
              <span className="value">{(pokemon.weight / 10).toFixed(1)}kg</span>
            </div>
          </div>
        </div>

        <div className="details-card stats-card">
          <h3>Estatísticas</h3>
          <div className="stats-grid">
            {pokemon.stats.map(stat => (
              <div key={stat.name} className="stat-item">
                {/* 🔹 Usa tradução se existir, senão mantém original */}
                <div className="stat-label">
                  {statTranslations[stat.name] || stat.name}
                </div>
                <div className="stat-bar-container">
                  <div 
                    className="stat-bar" 
                    style={{
                      width: `${Math.min(100, (stat.value / 200) * 100)}%`,
                      backgroundColor: getStatColor(stat.value)
                    }}
                  ></div>
                </div>
                <div className="stat-value">{stat.value}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default PokemonDetails;
