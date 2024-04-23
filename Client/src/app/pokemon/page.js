"use client";

import { useEffect, useState } from "react";
import useSWR from "swr";
import axios from "axios";

import Pokemon from "@/components/Pokemon";

export default function PokemonPage() {
  const fetcher = async (url) => {
    const response = await axios.get(url);
    return response.data;
  };
  const [search, setSearch] = useState("");
  const [offset, setOffset] = useState(0);

  const limit = 20;

  const { data, isLoading } = useSWR(
    search
      ? `http://localhost:9000/search/?offset=${offset}&limit=${limit}&name=${search}`
      : `http://localhost:9000/?offset=${offset}&limit=${limit}`,
    fetcher
  );

  if (!data) {
    return <div>Cargando...</div>;
  }

  if (data.error) {
    return <div>Error al cargar los datos...</div>;
  }

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
  const handleSearch = () => {
    setOffset(0);
    setSearch(search);
  };

  console.log(data.count);

  const pokemons = data.results || [];

  return (
    <main>
      <h1>Pokemon</h1>
      <input
        type="text"
        value={search}
        placeholder="Buscar por nombre"
        onChange={(e) => {
          setSearch(e.target.value);
        }}
      />
      <button onClick={handleSearch}>Buscar</button>

      <section>
        <h2 className="center">Lista de Pokemons</h2>

        {isLoading && <p>Cargando...</p>}
        <ul>
          {pokemons.map((pokemon, index) => (
            <Pokemon key={index} pokemon={pokemon} />
          ))}
        </ul>

        <div>
          {offset > 0 && (
            <button onClick={handlePrevPage}>Pagina Anterior</button>
          )}
          <span className="center">Pagina: {offset / limit + 1}</span>
          {offset + limit < data.count && (
            <button onClick={handleNextPage}>Pagina Siguiente</button>
          )}
        </div>
      </section>
    </main>
  );
}
