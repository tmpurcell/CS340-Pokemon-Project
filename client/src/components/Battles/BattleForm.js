import React, { useState } from 'react';

import DatePicker from 'react-datepicker';

import 'react-datepicker/dist/react-datepicker.css';

const initialFormData = {
  trainer_1: '',
  trainer_2: '',
  outcome: '',
  timestamp: '',
};

const BattleForm = ({ trainers, onAddBattle }) => {
  const [formData, setFormData] = useState(initialFormData);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleDateChange = (date) => {
    setFormData({
      ...formData,
      timestamp: date,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault()
    onAddBattle(formData);
    setFormData(initialFormData);
  };

  return (
    <div>
      <h2>Add a New Battle</h2>
      <form onSubmit={handleSubmit} >

        <label htmlFor="trainer_1">Trainer 1:</label>
        <select name="trainer_1" value={formData.trainer_id} onChange={handleInputChange}>
          <option >Select Trainer 1</option>
          {trainers.length > 0 && trainers?.map((trainer)=>(
            <option key={trainer.trainer_id} value={trainer.trainer_id}>{trainer.name}</option>
          ))}
        </select>

        <label htmlFor="trainer_2">Trainer 2:</label>
        <select name="trainer_2" value={formData.trainer_id} onChange={handleInputChange}>
          <option >Select Trainer 2</option>
          {trainers.length > 0 && trainers?.map((trainer)=>(
            <option key={trainer.trainer_id} value={trainer.trainer_id}>{trainer.name}</option>
          ))}
        </select>

        <label htmlFor="outcome">Outcome:</label>
        <input
          type="text"
          name="outcome"
          value={formData.outcome}
          onChange={handleInputChange}
        />

        <label htmlFor="timestamp">Timestamp:</label>
        <DatePicker
          selected={formData.timestamp}
          onChange={handleDateChange}
          showTimeSelect
          timeFormat="HH:mm"
          timeIntervals={15}
          dateFormat="dd MMM yyyy HH:mm:ss 'GMT'"
          timeCaption="Time"
        />

        <button type="submit">Add Battle</button>
      </form>
    </div>
  );
};

export default BattleForm;
