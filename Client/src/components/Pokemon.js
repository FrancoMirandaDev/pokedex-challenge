import Link from "next/link";

export default function Pokemon({ pokemon }) {
  return (
    <div>
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
    </div>
  );
}
