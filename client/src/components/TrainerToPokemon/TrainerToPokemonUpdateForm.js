import React, { useState } from 'react';

const initialFormData = {
  trainer_pokemon_id: '',
  trainer_id: '',
  pokemon_id: '',
  nickname: '',

};



const TrainerToPokemonUpdateForm = ({ pokeMatchs, trainers, pokemon, onUpdatePokeMatch }) => {
  const [formData, setFormData] = useState(initialFormData);
  const [selectedPokeMatchId, setSelectedPokeMatchId] = useState(null)
  const [updatedData, setUpdatedData] = useState(initialFormData);

  const handlePokeMatchChange = (e) => {
    const id = parseInt(e.target.value, 10);
    const selectedPokeMatch = pokeMatchs.find((pokeMatch) => pokeMatch.trainer_pokemon_id === id);

      setSelectedPokeMatchId(id);
      setUpdatedData(selectedPokeMatch);
    };

    const handleChange = (e) => {
      const { name, value } = e.target;
      setUpdatedData((prevData) => ({
        ...prevData,
        [name]: value,
      }));
    };

  const handleSubmit = (e) => {
    e.preventDefault()
    onUpdatePokeMatch(formData);
    handleUpdateClick(selectedPokeMatchId)
    setFormData(initialFormData);
  };

   const handleUpdateClick = async (rowId) => {
      try {
        const response = await fetch(`/api/pokematch/${rowId}`, {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(updatedData),
        });
        if (response.ok) {
          onUpdatePokeMatch(rowId, updatedData);
        } else {
          // TODO: refactor this to display fields with an error
          console.error('Error updating contact.');
        }
      } catch (error) {
        console.error('Error updating contact:', error);
      }
    };

       const getTrainerNameByID = (trainer_id) => {
        const matchedItem = trainers.find(trainer => trainer.trainer_id === trainer_id);
        return matchedItem.name
    }
    const getPokemonNameByID = (pokemon_id) => {
        const matchedItem = pokemon.find(poke => poke.pokemon_id === pokemon_id);
        return matchedItem.name
    }

  return (
    //   TODO: HAVE TO REFACTOR THIS TO INCLUDE AL AVAILABLE TRAINERS AND POKEMON
    <div>
      <h2>Update a Pokemon</h2>
      <form onSubmit={handleSubmit} >

        <label htmlFor="trainer_pokemon_id">Select Pokemon to Trainer Relationship to Edit:</label>

        <select name="trainer_pokemon_id" value={selectedPokeMatchId} onChange={handlePokeMatchChange}>
          <option value="">Select a Relationship</option>
          {pokeMatchs.length > 0 && pokeMatchs?.map((pokeMatch)=>(
            <option key={pokeMatch.trainer_pokemon_id} value={pokeMatch.trainer_pokemon_id}>{pokeMatch.trainer_pokemon_id}</option>
          ))}
        </select>

        <label htmlFor="trainer_id">Trainer ID:</label>
        <select name="trainer_id" value={updatedData.trainer_id} onChange={handleChange}>
          <option >Select a Trainer ID</option>
          {trainers.length > 0 && trainers?.map((trainer)=>(
            <option key={trainer.trainer_id} value={trainer.trainer_id}>{trainer.trainer_id+'-'+getTrainerNameByID(trainer.trainer_id)}</option>
          ))}
        </select>

        <label htmlFor="pokemon_id">Pokemon ID:</label>
        <select name="pokemon_id" value={updatedData.pokemon_id} onChange={handleChange}>
          <option >Select a Pokemon</option>
          {pokemon.length > 0 && pokemon?.map((poke)=>(
            <option key={poke.pokemon_id} value={poke.pokemon_id}>{poke.pokemon_id +'-'+getPokemonNameByID(poke.pokemon_id)}</option>
          ))}
        </select>

        <label htmlFor="nickname">Nickname:</label>
        <input
          type="text"
          name="nickname"
          value={updatedData.description}
          onChange={handleChange}
        />

        <button type="submit">Update Pokemon</button>
      </form>
    </div>
  );
};

export default TrainerToPokemonUpdateForm;
