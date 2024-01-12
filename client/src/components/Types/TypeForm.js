import React, { useState } from 'react';

const initialFormData = {
  type_name: '',
  weak_against: '',
  strong_against: '',
};

const TypeForm = ({ types, onAddType }) => {
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
    onAddType(formData);
    setFormData(initialFormData);
  };

  return (
    <div>
      <h2>Add a New Type</h2>
      <form onSubmit={handleSubmit} >

        <label htmlFor="type_name">Type Name:</label>
        <input
          type="text"
          name="type_name"
          value={formData.type_name}
          onChange={handleInputChange}
        />

      <label htmlFor="weak_against">Weak Against:</label>
      <select name="weak_against" value={formData.weak_against} onChange={handleInputChange}>
          <option>Select a Type</option>
          <option value={0}>Placeholder</option>
          {types.length > 0 && types?.map((type) => (
              <option key={type.type_id} value={type.type_id}>{type.type_name}</option>
          ))}
      </select>

      <label htmlFor="strong_against">Strong Against:</label>
      <select name="strong_against" value={formData.strong_against} onChange={handleInputChange}>
          <option>Select a Type</option>
          <option value={0}>Placeholder</option>
          {types.length > 0 && types?.map((type) => (
              <option key={type.type_id} value={type.type_id}>{type.type_name}</option>
          ))}
      </select>

        <button type="submit">Add Type</button>
      </form>
    </div>
  );
};

export default TypeForm;
