import React, {useState} from 'react';

const initialFormData = {
    type_id: '',
    type_name: '',
    weak_against: '',
    strong_against: ''
};


const TypeUpdateForm = ({types, onUpdateType}) => {
    const [formData, setFormData] = useState(initialFormData);
    const [selectedTypeId, setSelectedTypeId] = useState(null)
    const [updatedData, setUpdatedData] = useState(initialFormData);

    const handleTypeChange = (e) => {
        const id = parseInt(e.target.value, 10);
        const selectedType = types.find((type) => type.type_id === id);

        setSelectedTypeId(id);
        setUpdatedData(selectedType);
    };

    const handleChange = (e) => {
        const {name, value} = e.target;
        setUpdatedData((prevData) => ({
            ...prevData,
            [name]: value,
        }));
    };

    const handleSubmit = (e) => {
        e.preventDefault()
        onUpdateType(formData);
        handleUpdateClick(selectedTypeId)
        setFormData(initialFormData);
    };

    const handleUpdateClick = async (rowId) => {
        try {
            const response = await fetch(`/api/types/${rowId}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(updatedData),
            });
            if (response.ok) {
                onUpdateType(rowId, updatedData);
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
            <h2>Update a Type</h2>
            <form onSubmit={handleSubmit}>

                <label htmlFor="type_id">Select a Type to Edit:</label>
                <select name="type_id" value={selectedTypeId} onChange={handleTypeChange}>
                    <option value="">Select a Type</option>
                    {types.length > 0 && types?.map((type) => (
                        <option key={type.type_id} value={type.type_id}>{type.type_id}</option>
                    ))}
                </select>

                <label htmlFor="type_name">Type Name:</label>
                <input
                    type="text"
                    name="type_name"
                    value={updatedData.type_name}
                    onChange={handleChange}
                />

                <label htmlFor="weak_against">Weak Against:</label>
                <select name="weak_against" value={updatedData.weak_against} onChange={handleChange}>
                    <option>Select a Type</option>
                    {types.length > 0 && types?.map((type) => (
                        <option key={type.type_id} value={type.type_id}>{type.type_name}</option>
                    ))}
                </select>

                <label htmlFor="strong_against">Strong Against:</label>
                <select name="strong_against" value={updatedData.strong_against} onChange={handleChange}>
                    <option>Select a Type</option>
                    {types.length > 0 && types?.map((type) => (
                        <option key={type.type_id} value={type.type_id}>{type.type_name}</option>
                    ))}
                </select>

                <button type="submit">Update Type</button>
            </form>
        </div>
    );
};

export default TypeUpdateForm;
