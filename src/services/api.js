import axios from "axios";

const API_BASE = "https://pokeapi.co/api/v2";

export const fetchPokemons = async (offset = 0, limit = 20) => {
  try {
    console.log(`Buscando pokémons: offset=${offset}, limit=${limit}`);
    const response = await axios.get(
      `${API_BASE}/pokemon?offset=${offset}&limit=${limit}`
    );

    const pokemonPromises = response.data.results.map(async (result) => {
      try {
        const details = await axios.get(result.url);
        return {
          id: details.data.id,
          name: details.data.name,
          image: details.data.sprites.other["official-artwork"].front_default || 
                details.data.sprites.front_default,
          types: details.data.types.map((t) => t.type.name),
        };
      } catch (detailError) {
        console.error(`Erro ao buscar detalhes do Pokémon ${result.name}:`, detailError);
        return null;
      }
    });

    const pokemons = await Promise.all(pokemonPromises);
    // Filtra os pokémons que foram carregados com sucesso
    const validPokemons = pokemons.filter(pokemon => pokemon !== null);
    
    if (validPokemons.length === 0) {
      throw new Error("Nenhum Pokémon foi carregado com sucesso.");
    }

    console.log(`${validPokemons.length} pokémons carregados com sucesso.`);
    return validPokemons;
  } catch (error) {
    console.error("Erro ao buscar lista de Pokémons:", error);
    throw new Error("Não foi possível carregar os Pokémons. Por favor, verifique sua conexão e tente novamente.");
  }
};

export const fetchPokemonDetails = async (name) => {
  try {
    const response = await axios.get(`${API_BASE}/pokemon/${name}`);
    return {
      id: response.data.id,
      name: response.data.name,
      image:
        response.data.sprites.other["official-artwork"].front_default ||
        response.data.sprites.front_default,
      types: response.data.types.map((t) => t.type.name),
      height: response.data.height,
      weight: response.data.weight,
      stats: response.data.stats.map((stat) => ({
        name: stat.stat.name,
        value: stat.base_stat,
      })),
    };
  } catch (error) {
    throw new Error("Pokémon não encontrado!");
  }
};
