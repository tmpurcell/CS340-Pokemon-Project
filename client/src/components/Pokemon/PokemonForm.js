import React, { useState, useEffect } from 'react';

const initialFormData = {
  name: '',
  type_id: '',
  description: '',
  tier_rank: '',
  evolves_into: '',
};



const PokemonForm = ({ onAddPokemon }) => {
  const [formData, setFormData] = useState(initialFormData);
  const [typeData, setTypeData] = useState([]);

  useEffect(() => {
    fetch('/api/types/')
        .then((response) => response.json())
        .then((data) => {setTypeData(data)})
        .catch((error) => console.error('Error fetching contacts:', error));
}, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault()
    onAddPokemon(formData);
    setFormData(initialFormData);
  };

  return (
    <div>
      <h2>Add a New Pokemon</h2>
      <form onSubmit={handleSubmit} >

        <label htmlFor="name">Name:</label>
        <input
          type="text"
          name="name"
          value={formData.name}
          onChange={handleInputChange}
        />

        <label htmlFor="type_id">Type:</label>
        <select name="type_id" value={formData.type_id} onChange={handleInputChange}>
        <option >Select the Type</option>
          {typeData.map((type)=>(
            <option key={type.type_id} value={type.type_id}>{type.type_name}</option>
          ))}
        </select>

        <label htmlFor="description">Description:</label>
        <input
          type="text"
          name="description"
          value={formData.description}
          onChange={handleInputChange}
        />

        <label htmlFor="tier_rank">Tier Rank:</label>
        <select name="tier_rank" value={formData.value} onChange={handleInputChange}>
          <option value="">Select a rank</option>
          <option value="Beginner">Beginner</option>
          <option value="Intermediate">Intermediate</option>
          <option value="Advanced">Advanced</option>
        </select>

        <label htmlFor="evolves_into">Evolves Into:</label>
        <input
          type="text"
          name="evolves_into"
          value={formData.evolves_into}
          onChange={handleInputChange}
        />

        <button type="submit">Add Pokemon</button>
      </form>
    </div>
  );
};

export default PokemonForm;
