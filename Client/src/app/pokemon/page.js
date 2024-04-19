"use client";

import { useState } from "react";
import useSWR from "swr";
import axios from "axios";
import Link from "next/link";

export default function PokemonPage() {
  const fetcher = async (url) => {
    const response = await axios.get(url);
    return response.data;
  };
  const [offset, setOffset] = useState(0);

  const limit = 10;

  const { data, error, isLoading } = useSWR(
    `http://localhost:9000/?offset=${offset}&limit=${limit}`,
    fetcher
  );
  if (error) return <div>Error al cargar los datos...</div>;
  if (!data) return <div>Cargando...</div>;

  console.log(data.count);
  const pokemons = data.results || [];

  const handlePrevPage = () => {
    if (offset > 0) {
      setOffset(offset - limit);
    }
  };

  const handleNextPage = () => {
    if (offset + limit < data.count) {
      setOffset(offset + limit);
    }
  };

  return (
    <main>
      <h1>Pokemon</h1>

      <section>
        <h2 className="center">Lista de Pokemons</h2>

        {isLoading && <p>Cargando...</p>}
        <ul>
          {pokemons.map((pokemon, index) => (
            <div key={index}>
              <li>
                <Link href={pokemon.url}>
                  <h2>{pokemon.name}</h2>
                  <img src={pokemon.image} alt={pokemon.name} />
                </Link>
                <p>Types: {pokemon.types.join(", ")}</p>
                <p>Stats:</p>
                <ul>
                  {pokemon.stats.map((stat) => (
                    <li key={stat.name}>
                      {stat.name}: {stat.value}
                    </li>
                  ))}
                </ul>
              </li>
            </div>
          ))}
        </ul>

        <div>
          {offset > 0 && (
            <button onClick={handlePrevPage}>Pagina Anterior</button>
          )}
          <span>Pagina: {offset / limit + 1}</span>
          {offset + limit < data.count && (
            <button onClick={handleNextPage}>Pagina Siguiente</button>
          )}
        </div>
      </section>
    </main>
  );
}
