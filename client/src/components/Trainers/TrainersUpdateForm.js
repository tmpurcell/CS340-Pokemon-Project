import React, { useState } from 'react';

const initialFormData = {
  trainer_id: '',
  name: '',
  location: '',
  wins: '',
  losses: '',
};

const TrainerUpdateForm = ({ trainers, onUpdateTrainer }) => {
    const [formData, setFormData] = useState(initialFormData);
    const [selectedTrainerId, setSelectedTrainerId] = useState(null)
    const [updatedData, setUpdatedData] = useState(initialFormData);

    const handleTrainerChange = (e) => {
        const id = parseInt(e.target.value, 10);
        const selectedStat = trainers.find((trainer) => trainer.trainer_id === id);

        setSelectedTrainerId(id);
        setUpdatedData(selectedStat);
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
    onUpdateTrainer(formData);
    handleUpdateClick(selectedTrainerId)
    setFormData(initialFormData);
  };

  const handleUpdateClick = async (rowId) => {
      try {
        const response = await fetch(`/api/trainers/${rowId}`, {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(updatedData),
        });
        if (response.ok) {
          onUpdateTrainer(rowId, updatedData);
          setSelectedTrainerId(null);
          setFormData(initialFormData)
          setUpdatedData(initialFormData)
        } else {
          // TODO: refactor this to display fields with an error
          console.error('Error updating trainer.');
        }
      } catch (error) {
        console.error('Error updating trainer:', error);
      }
    };

  return (
    <div>
      <h2>Update a Trainer</h2>
      <form onSubmit={handleSubmit} >

        <label htmlFor="trainer_id">Select Trainer to Edit:</label>
        <select name="stats_id" value={selectedTrainerId} onChange={handleTrainerChange}>
            <option value="">Select a Trainer</option>
            {trainers.length > 0 && trainers?.map((trainer) => (
                <option key={trainer.trainer_id} value={trainer.trainer_id}>{trainer.trainer_id}</option>
            ))}
        </select>

        <label htmlFor="name">Name:</label>
        <input
          type="text"
          name="name"
          value={updatedData.name}
          onChange={handleChange}
        />

        <label htmlFor="location">Location:</label>
        <input
          type="text"
          name="location"
          value={updatedData.location}
          onChange={handleChange}
        />

        <label htmlFor="wins">Wins:</label>
        <input
          type="text"
          name="wins"
          value={updatedData.wins}
          onChange={handleChange}
        />

        <label htmlFor="losses">Losses:</label>
        <input
          type="text"
          name="losses"
          value={updatedData.losses}
          onChange={handleChange}
        />

        <button type="submit">Update Trainer</button>
      </form>
    </div>
  );
};

export default TrainerUpdateForm;
