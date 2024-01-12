import React, {useState} from 'react';

const initialFormData = {
    pokemon_id: '',
    hit_points: '',
    attack_power: '',
    defense_power: '',
    speed: '',
};

const StatsForm = ({pokemon, onAddStat}) => {
    const [formData, setFormData] = useState(initialFormData);

    const handleInputChange = (e) => {
        const {name, value} = e.target;
        setFormData({
            ...formData,
            [name]: value,
        });
    };

    const handleSubmit = (e) => {
        e.preventDefault()
        onAddStat(formData);
        setFormData(initialFormData);
    };

    return (
        <div>
            <h2>Add a New Stat</h2>
            <form onSubmit={handleSubmit}>

                <label htmlFor="pokemon_id">Pokemon ID:</label>
                <select name="pokemon_id" value={formData.pokemon_id} onChange={handleInputChange}>
                  <option >Select a Pokemon ID</option>
                  {pokemon.length > 0 && pokemon?.map((poke)=>(
                    <option key={poke.pokemon_id} value={poke.pokemon_id}>{poke.pokemon_id + ' | ' + poke.name}</option>
                  ))}
                </select>

                <label htmlFor="hit_points">hit points:</label>
                <input
                    type="text"
                    name="hit_points"
                    value={formData.hit_points}
                    onChange={handleInputChange}
                />

                <label htmlFor="attack_power">attack_power:</label>
                <input
                    type="text"
                    name="attack_power"
                    value={formData.attack_power}
                    onChange={handleInputChange}
                />

                <label htmlFor="defense_power">Defense Power:</label>
                <input
                    type="text"
                    name="defense_power"
                    value={formData.defense_power}
                    onChange={handleInputChange}
                />

                <label htmlFor="speed">speed:</label>
                <input
                    type="text"
                    name="speed"
                    value={formData.speed}
                    onChange={handleInputChange}
                />

                <button type="submit">Add Stat</button>
            </form>
        </div>
    );
};

export default StatsForm;
