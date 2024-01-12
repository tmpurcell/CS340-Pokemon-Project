import React, { useState } from 'react';

const initialFormData = {
  trainer_id: '',
  pokemon_id: '',
  nickname: '',
};


const TrainerToPokemonForm = ({ onAddPokematch, pokemon, trainers }) => {
  const [formData, setFormData] = useState(initialFormData);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault()
    onAddPokematch(formData);
    setFormData(initialFormData);
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
    <div>
      <h2>Add a New Pokemon and Trainer relationship</h2>
      <form onSubmit={handleSubmit} >

        <label htmlFor="trainer_id">Trainer ID:</label>
        <select name="trainer_id" value={formData.trainer_id} onChange={handleInputChange}>
          <option >Select a Trainer ID</option>
          {trainers.length > 0 && trainers?.map((trainer)=>(
            <option key={trainer.trainer_id} value={trainer.trainer_id}>{trainer.trainer_id+'-'+getTrainerNameByID(trainer.trainer_id)}</option>
          ))}
        </select>

        <label htmlFor="pokemon_id">Pokemon ID:</label>
        <select name="pokemon_id" value={formData.pokemon_id} onChange={handleInputChange}>
          <option >Select a Pokemon</option>
          {pokemon.length > 0 && pokemon?.map((poke)=>(
            <option key={poke.pokemon_id} value={poke.pokemon_id}>{poke.pokemon_id +'-'+getPokemonNameByID(poke.pokemon_id)}</option>
          ))}
        </select>

        <label htmlFor="nickname">Nickname:</label>
        <input
          type="text"
          name="nickname"
          value={formData.nickname}
          onChange={handleInputChange}
        />

        <button type="submit">Add Relationship</button>
      </form>
    </div>
  );
};

export default TrainerToPokemonForm;
