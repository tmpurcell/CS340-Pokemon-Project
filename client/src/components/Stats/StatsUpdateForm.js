import React, {useState} from 'react';

const initialFormData = {
    stat_id: '',
    pokemon_id: '',
    hit_points: '',
    attack_power: '',
    defense_power: '',
    speed: ''
};


const StatsUpdateForm = ({stats, pokemon, onUpdateStat}) => {
    const [formData, setFormData] = useState(initialFormData);
    const [selectedStatId, setSelectedStatId] = useState(null)
    const [updatedData, setUpdatedData] = useState(initialFormData);



    const handleStatsChange = (e) => {
        const id = parseInt(e.target.value, 10);
        const selectedStat = stats.find((stat) => stat.stat_id === id);

        setSelectedStatId(id);
        setUpdatedData(selectedStat);
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
        onUpdateStat(formData);
        handleUpdateClick(selectedStatId)
        setFormData(initialFormData);
    };

    const handleUpdateClick = async (rowId) => {
        try {
            const response = await fetch(`/api/stats/${rowId}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(updatedData),
            });
            if (response.ok) {
                onUpdateStat(rowId, updatedData);
            } else {
                // TODO: refactor this to display fields with an error
                console.error('Error updating contact.');
            }
        } catch (error) {
            console.error('Error updating contact:', error);
        }
    };

    return (
        //   TODO: HAVE TO REFACTOR THIS TO INCLUDE AL AVAILABLE TRAINERS AND POKEMON
        <div>
            <h2>Update a Stat</h2>
            <form onSubmit={handleSubmit}>

                <label htmlFor="stat_id">Select Stat to Edit:</label>

                <select name="stat_id" value={selectedStatId} onChange={handleStatsChange}>
                    <option value="">Select a Stat</option>
                    {stats.length > 0 && stats?.map((stat) => (
                        <option key={stat.stat_id} value={stat.stat_id}>{stat.stat_id}</option>
                    ))}
                </select>

                <label htmlFor="pokemon_id">Pokemon ID:</label>
                <select name="pokemon_id" value={updatedData.pokemon_id} onChange={handleChange}>
                    <option>Select a Pokemon ID</option>
                    {pokemon.length > 0 && pokemon?.map((poke) => (
                        <option key={poke.pokemon_id} value={poke.pokemon_id}>{poke.pokemon_id}</option>
                    ))}
                </select>

                <label htmlFor="hit_points">Hit Points:</label>
                <input
                    type="text"
                    name="hit_points"
                    value={updatedData.hit_points}
                    onChange={handleChange}
                />

                <label htmlFor="attack_power">Attack Power:</label>
                <input
                    type="text"
                    name="attack_power"
                    value={updatedData.attack_power}
                    onChange={handleChange}
                />

                <label htmlFor="defense_power">Defense Power:</label>
                <input
                    type="text"
                    name="defense_power"
                    value={updatedData.defense_power}
                    onChange={handleChange}
                />

                <label htmlFor="speed">Speed:</label>
                <input
                    type="text"
                    name="speed"
                    value={updatedData.speed}
                    onChange={handleChange}
                />

                <button type="submit">Update Stat</button>
            </form>
        </div>
    );
};

export default StatsUpdateForm;
