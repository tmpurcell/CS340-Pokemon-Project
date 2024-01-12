import React, { useState } from 'react';
import DatePicker from "react-datepicker";

const initialFormData = {
  trainer_1: '',
  trainer_2: '',
  outcome: '',
  timestamp: '',
};



const BattleUpdateForm = ({ onUpdateBattle, battles, trainers}) => {
  const [selectedBattleId, setSelectedBattleId] = useState(null)
  const [battleData, setBattleData] = useState(initialFormData);

  const handleBattleChange = (e) => {
    const id = parseInt(e.target.value, 10);
    const selectedBattle = battles.find((battle) => battle.battle_id === id);

    setSelectedBattleId(id);
    const ts = new Date(selectedBattle.timestamp)
    selectedBattle.timestamp = ts
    setBattleData(selectedBattle);
  };

    const handleChange = (e) => {
      const { name, value } = e.target;
      setBattleData((prevData) => ({
        ...prevData,
        [name]: value,
      }));
    };

    const handleDateChange = (date) => {
      setBattleData({
        ...battleData,
        timestamp: date,
      });
    };

  const handleSubmit = (e) => {
    e.preventDefault()
    onUpdateBattle(battleData);
    handleUpdateClick(selectedBattleId)
    setBattleData(initialFormData);
  };

   const handleUpdateClick = async (rowId) => {
      try {
        const response = await fetch(`/api/battles/${rowId}`, {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(battleData),
        });
        if (response.ok) {
          onUpdateBattle(rowId, battleData);
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
      <h2>Update a Battle</h2>
      <form onSubmit={handleSubmit} >

        <label htmlFor="battle_id">Select Battle to Edit:</label>

        <select name="battle_id" value={selectedBattleId} onChange={handleBattleChange}>
          <option value="">Select a Battle</option>
          {battles.length > 0 && battles?.map((battle)=>(
            <option key={battle.battle_id} value={battle.battle_id}>{battle.battle_id}</option>
          ))}
        </select>

          <label htmlFor="trainer_1">Trainer 1:</label>
        <select name="trainer_1" value={battleData.trainer_id} onChange={handleChange}>
          <option >Select Trainer 1</option>
          {trainers.length > 0 && trainers?.map((trainer)=>(
            <option key={trainer.trainer_id} value={trainer.trainer_id}>{trainer.name}</option>
          ))}
        </select>

        <label htmlFor="trainer_2">Trainer 2:</label>
        <select name="trainer_2" value={battleData.trainer_id} onChange={handleChange}>
          <option >Select Trainer 2</option>
          {trainers.length > 0 && trainers?.map((trainer)=>(
            <option key={trainer.trainer_id} value={trainer.trainer_id}>{trainer.name}</option>
          ))}
        </select>

        <label htmlFor="description">Outcome:</label>
        <input
          type="text"
          name="outcome"
          value={battleData.outcome}
          onChange={handleChange}
        />

        <label htmlFor="timestamp">Timestamp:</label>
        <DatePicker
          selected={battleData.timestamp}
          onChange={handleDateChange}
          showTimeSelect
          timeFormat="HH:mm"
          timeIntervals={15}
          dateFormat="dd MMM yyyy HH:mm"
          timeCaption="Time"
        />

        <button type="submit">Update Battle</button>
      </form>
    </div>
  );
};

export default BattleUpdateForm;
