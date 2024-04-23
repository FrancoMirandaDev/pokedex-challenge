"use client";

import useSWR from "swr";
import axios from "axios";
import { useState } from "react";
useState;
import Pokemon from "@/components/Pokemon";
import { useParams } from "next/navigation";

function page() {
  const fetcher = async (url) => {
    const response = await axios.get(url);
    return response.data;
  };
  const { type } = useParams();
  const [offset, setOffset] = useState(0);
  const limit = 20;
  const { data, error, isLoading } = useSWR(
    `http://localhost:9000/type/${type}?offset=${offset}&limit=${limit}`,
    fetcher
  );
  if (error) return <div>Error al cargar los datos...</div>;
  if (!data) return <div>Cargando...</div>;

  return (
    <>
      <h1>Pokemon</h1>
      <section>
        <h2 className="center">Lista de Pokemons</h2>
        {isLoading && <p>Cargando...</p>}
        <ul>
          {data.results.map((pokemon, index) => (
            <Pokemon key={index} pokemon={pokemon} />
          ))}
        </ul>
        <div>
          {offset > 0 && (
            <button onClick={() => setOffset(offset - limit)}>
              Pagina Anterior
            </button>
          )}
          <span>Pagina: {offset / limit + 1}</span>
          {offset + limit < data.count && (
            <button onClick={() => setOffset(offset + limit)}>
              Pagina Siguiente
            </button>
          )}
        </div>
      </section>
    </>
  );
}

export default page;
