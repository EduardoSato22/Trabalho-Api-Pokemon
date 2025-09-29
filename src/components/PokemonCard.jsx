import { Link } from "react-router-dom";
import "./PokemonCard.css";

const PokemonCard = ({ pokemon }) => {
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

  return (
    <Link to={`/pokemon/${pokemon.name}`} className="pokemon-card">
      <div className="pokemon-card-content" style={{
        background: pokemon.types && pokemon.types.length > 0
          ? `linear-gradient(135deg, ${getTypeColor(pokemon.types[0])}88 0%, ${pokemon.types[1] 
            ? getTypeColor(pokemon.types[1])+'88' 
            : getTypeColor(pokemon.types[0])+'66'} 100%)`
          : 'linear-gradient(135deg, #64646488 0%, #32323266 100%)'
      }}>
        <span className="pokemon-id">#{String(pokemon.id).padStart(3, '0')}</span>
        <img src={pokemon.image} alt={pokemon.name} className="pokemon-image" />
        <h3>{pokemon.name.charAt(0).toUpperCase() + pokemon.name.slice(1)}</h3>
        <div className="pokemon-types">
          {pokemon.types && pokemon.types.map((type) => (
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
    </Link>
  );
};

export default PokemonCard;
