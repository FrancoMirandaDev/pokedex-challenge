"use client";

import Link from "next/link";

function page() {
  const types = [
    "normal",
    "fighting",
    "flying",
    "poison",
    "ground",
    "rock",
    "bug",
    "ghost",
    "steel",
    "fire",
    "water",
    "grass",
    "electric",
    "psychic",
    "ice",
    "dragon",
    "dark",
    "fairy",
    "unknown",
    "shadow",
  ];

  return (
    <>
      <h1 className="center">Types</h1>
      <h4>Estos son los tipos disponibles:</h4>
      <ul>
        {types.map((type, index) => (
          <Link href={`/types/${type}`}>
            <li key={index}>{type}</li>
          </Link>
        ))}
      </ul>
    </>
  );
}

export default page;
