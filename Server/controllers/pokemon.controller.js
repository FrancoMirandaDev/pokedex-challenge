import getPokemonDetails from "../helper/getPokemonDetails.js";

export const getPokemon = async (req, res) => {
  let { offset = 0, limit = 20 } = req.query;

  if (isNaN(offset) || isNaN(limit)) {
    res.status(400).json({ error: "Offset y limit deben ser números validos" });
    return;
  }
  offset = parseInt(offset);
  limit = parseInt(limit);

  console.log(`Este es el offset: ${offset},    Este es el limit: ${limit}`);

  try {
    const data = await fetch(
      `https://pokeapi.co/api/v2/pokemon?offset=${offset}&limit=${limit}`
    );

    const pokemons = await data.json();

    // Obtiene los resultados y la cantidad de pokemons totales
    const { results, count } = pokemons;

    // Obtiene los detalles de cada pokemon
    const pokemonDataPromises = results.map(async (pokemon) => {
      return getPokemonDetails(pokemon);
    });

    const pokemonData = await Promise.all(pokemonDataPromises);

    res.json({ count, results: pokemonData });
  } catch (error) {
    console.error(error);
    res
      .status(500)
      .json({ error: "Error al obtener datos de la API de Pokemon" });
  }
};

export const getPokemonTypes = async (req, res) => {
  const { type } = req.params;
  let { offset = 0, limit = 20 } = req.query;

  if (isNaN(offset) || isNaN(limit)) {
    res.status(400).json({ error: "Offset y limit deben ser números válidos" });
    return;
  }

  offset = parseInt(offset);
  limit = parseInt(limit);

  console.log(`Este es el offset: ${offset},    Este es el limit: ${limit}`);

  try {
    const data = await fetch("https://pokeapi.co/api/v2/type");

    // Obtiene los tipos de pokemon
    const types = await data.json();

    // Filtra los tipos de pokemon por el tipo solicitado
    const filteredResults = types.results.filter((typeApi) => {
      return typeApi.name.toLowerCase() === type.toLowerCase();
    });

    // Si el tipo solicitado existe
    if (filteredResults.length > 0) {
      const typeData = await fetch(filteredResults[0].url);
      const typeDataJson = await typeData.json();

      // Obtiene la cantidad de pokemons de ese tipo
      const count = typeDataJson.pokemon.length;

      // Aplica la paginacion a los resultados
      const paginatedResults = typeDataJson.pokemon.slice(
        offset,
        offset + limit
      );

      // Obtiene los detalles de cada pokemon
      const pokemonPromises = paginatedResults.map(async (pokemon) => {
        return getPokemonDetails(pokemon.pokemon);
      });

      // Espera a que todas las promesas se resuelvan
      const pokemonDataArray = await Promise.all(pokemonPromises);

      res.json({ count: count, results: pokemonDataArray });
    } else {
      res.json({ error: "Tipo no encontrado" });
    }
  } catch (error) {
    console.error(error);
    res
      .status(500)
      .json({ error: "Error al obtener datos de la API de Pokemon" });
  }
};

export const getPokemonName = async (req, res) => {
  let { offset = 0, limit = 20, name = "" } = req.query;

  if (isNaN(offset) || isNaN(limit)) {
    res.status(400).json({ error: "Offset y limit deben ser números válidos" });
    return;
  }
  offset = parseInt(offset);
  limit = parseInt(limit);

  console.log(`Este es el offset: ${offset},    Este es el limit: ${limit}`);

  try {
    const data = await fetch(
      `https://pokeapi.co/api/v2/pokemon/?offset=0&limit=1`
    );

    const apiInfo = await data.json();

    // Obtiene la cantidad de pokemons totales de la API
    let count = apiInfo.count;

    // Obtiene todos los pokemons de la API
    const pokemonsAll = await fetch(
      `https://pokeapi.co/api/v2/pokemon/?offset=0&limit=${count}`
    );
    const pokemons = await pokemonsAll.json();

    // Filtra los pokemons por nombre
    const filteredResults = pokemons.results.filter((pokemon) =>
      pokemon.name.includes(name)
    );

    // Aplica la paginacion a los resultados filtrados
    const paginatedResults = filteredResults.slice(offset, offset + limit);

    // Obtiene los detalles de cada pokemon
    const pokemonDataPromises = paginatedResults.map(async (pokemon) => {
      return getPokemonDetails(pokemon);
    });

    // Espera a que todas las promesas se resuelvan
    const pokemonData = await Promise.all(pokemonDataPromises);

    count = filteredResults.length;
    console.log(count);

    res.json({ count, results: pokemonData });
  } catch (error) {
    console.error(error);
    res
      .status(500)
      .json({ error: "Error al obtener datos de la API de Pokemon" });
  }
};
