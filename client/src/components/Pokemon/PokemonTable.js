import React from "react";

function PokemonTable ({pokemonData, onDeletePokemon}) {
    
      const handleDeleteClick = (rowId) => {
        onDeletePokemon(rowId)
      }

    return (
      <div>
        <h1>Pokemon Data Table</h1>
        <table>
          <thead>
            <tr>
              <th>Pokemon ID</th>
              <th>Name</th>
              <th>Type</th>
              <th>Description</th>
              <th>Tier Rank</th>
              <th>Evolves Into</th>
            </tr>
          </thead>
          <tbody>
            {pokemonData.length > 0 && pokemonData?.map((pokemon) => (
              <tr key={pokemon.pokemon_id}>
                  <td>{pokemon.pokemon_id}</td>
                <td>
                  {pokemon.name}
                </td>
                <td>
                  {pokemon.type_id}
                </td>
                <td>
                  {pokemon.description}
                </td>
                <td>
                  {pokemon.tier_rank}
                </td>
                <td>
                    {pokemon.evolves_into}
                </td>
                <td>
                  <button onClick={() => handleDeleteClick(pokemon.pokemon_id)}>Delete</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    );
  };

export default PokemonTable;