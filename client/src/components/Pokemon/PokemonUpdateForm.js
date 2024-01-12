import React, { useState } from 'react';

const initialFormData = {
  pokemon_id: '',
  name: '',
  type_id: '',
  description: '',
  tier_rank: '',
  evolves_into: '',
};



const PokemonUpdateForm = ({ onUpdatePokemon, types, pokemon }) => {
  const [formData, setFormData] = useState(initialFormData);
  const [selectedPokemonId, setSelectedPokemonId] = useState(null)
  const [pokemonData, setPokemonData] = useState(initialFormData);

  const handlePokemonChange = (e) => {
    const id = parseInt(e.target.value, 10);
    const selectedPokemon = pokemon.find((poke) => poke.pokemon_id === id);

      setSelectedPokemonId(id);
      setPokemonData(selectedPokemon);
    };

    const handleChange = (e) => {
      const { name, value } = e.target;
      setPokemonData((prevData) => ({
        ...prevData,
        [name]: value,
      }));
    };

  const handleSubmit = (e) => {
    e.preventDefault()
    onUpdatePokemon(formData);
    handleUpdateClick(selectedPokemonId)
    setFormData(initialFormData);
  };

   const handleUpdateClick = async (rowId) => {
      try {
        const response = await fetch(`/api/pokemon/${rowId}`, {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(pokemonData),
        });
        if (response.ok) {
          onUpdatePokemon(rowId, pokemonData);
        } else {
          // TODO: refactor this to display fields with an error
          console.error('Error updating contact.');
        }
      } catch (error) {
        console.error('Error updating contact:', error);
      }
    };

  return (
    <div>
      <h2>Update a Pokemon</h2>
      <form onSubmit={handleSubmit} >

        <label htmlFor="Pokemon ID">Select Pokemon to Edit:</label>

        <select name="pokemon_id" value={selectedPokemonId} onChange={handlePokemonChange}>
          <option value="">Select a Pokemon</option>
          {pokemon.length > 0 && pokemon?.map((poke)=>(
            <option key={poke.pokemon_id} value={poke.pokemon_id}>{poke.pokemon_id}</option>
          ))}
        </select>

        <label htmlFor="name">Name:</label>
        <input
          type="text"
          name="name"
          value={pokemonData.name}
          onChange={handleChange}
        />

        <label htmlFor="type_id">Type:</label>
        <select name="type_id" value={pokemonData.type_id} onChange={handleChange}>
          <option >Select the Type</option>
          {types.length > 0 && types?.map((type)=>(
            <option key={type.type_id} value={type.type_id}>{type.type_name}</option>
          ))}
        </select>

        <label htmlFor="description">Description:</label>
        <input
          type="text"
          name="description"
          value={pokemonData.description}
          onChange={handleChange}
        />

        <label htmlFor="tier_rank">Tier Rank:</label>
        <select name="tier_rank" value={pokemonData.value} onChange={handleChange}>
          <option value="">Select a rank</option>
          <option value="Beginner">Beginner</option>
          <option value="Intermediate">Intermediate</option>
          <option value="Advanced">Advanced</option>
        </select>

        <label htmlFor="evolves_into">Evolves Into:</label>
        <input
          type="text"
          name="evolves_into"
          value={pokemonData.evolves_into}
          onChange={handleChange}
        />

        <button type="submit">Update Pokemon</button>
      </form>
    </div>
  );
};

export default PokemonUpdateForm;
