import React, { useState } from 'react';

const initialFormData = {
  trainer_id: '',
  name: '',
  location: '',
  wins: '',
  losses: '',
};

const TrainerForm = ({ onAddTrainer }) => {
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
    onAddTrainer(formData);
    setFormData(initialFormData);
  };

  return (
    <div>
      <h2>Add a New Trainer</h2>
      <form onSubmit={handleSubmit} >

        <label htmlFor="name">Name:</label>
        <input
          type="text"
          name="name"
          value={formData.name}
          onChange={handleInputChange}
        />

        <label htmlFor="location">Location:</label>
        <input
          type="text"
          name="location"
          value={formData.location}
          onChange={handleInputChange}
        />

        <label htmlFor="wins">Wins</label>
        <input
          type="text"
          name="wins"
          value={formData.wins}
          onChange={handleInputChange}
        />

        <label htmlFor="losses">Losses:</label>
        <input
          type="text"
          name="losses"
          value={formData.losses}
          onChange={handleInputChange}
        />

        <button type="submit">Add Trainer</button>
      </form>
    </div>
  );
};

export default TrainerForm;
