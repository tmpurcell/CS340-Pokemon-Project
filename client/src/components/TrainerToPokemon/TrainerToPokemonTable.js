import React from "react";

function TrainerToPokemonTable ({data, trainers, pokemon, onDeletePokematch}) {

      const handleDeleteClick = (rowId) => {
        onDeletePokematch(rowId)
      }

    const getTrainerNameByID = (trainer_id) => {
        const matchedItem = trainers.length > 0 && trainers?.find(trainer => trainer.trainer_id === trainer_id);
        return matchedItem.name
    }
    const getPokemonNameByID = (pokemon_id) => {
        const matchedItem = pokemon.length > 0 && pokemon?.find(poke => poke.pokemon_id === pokemon_id);
        return matchedItem.name
    }

    return (
      <div>
        <h1>Pokemon to Trainer Relationship Table</h1>
        <table>
          <thead>
            <tr>
              <th>Trainer to Pokemon ID</th>
              <th>Trainer ID</th>
              <th>Pokemon ID</th>
              <th>Nickname</th>
            </tr>
          </thead>
          <tbody>
            {data.length > 0 && data?.map((match) => (
              <tr key={match.trainer_pokemon_id}>
                  <td>{match.trainer_pokemon_id}</td>
                <td>
                  {match.trainer_id + '-' + getTrainerNameByID(match.trainer_id)}
                </td>
                <td>
                  {match.pokemon_id + '-' +getPokemonNameByID(match.pokemon_id)}
                </td>
                <td>
                  {match.nickname}
                </td>
                <td>
                  <button onClick={() => handleDeleteClick(match.trainer_pokemon_id)}>Delete</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    );
  };

export default TrainerToPokemonTable;