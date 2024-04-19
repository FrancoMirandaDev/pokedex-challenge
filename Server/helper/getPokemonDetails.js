export default async function getPokemonDetails(pokemon) {
  const response = await fetch(pokemon.url);
  const pokemonData = await response.json();
  return {
    url: pokemon.url,
    image: pokemonData.sprites.front_default,
    name: pokemonData.name,
    types: pokemonData.types.map((type) => type.type.name),
    stats: pokemonData.stats.map((stat) => ({
      name: stat.stat.name,
      value: stat.base_stat,
    })),
  };
}
