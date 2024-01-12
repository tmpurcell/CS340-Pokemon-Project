import React from "react";

const StatsTable = ({data, pokemon, onDeleteStat}) => {

    const handleDeleteClick = (rowId) => {
        onDeleteStat(rowId)
    }

    const getPokemonNameByID = (pokemon_id) => {
        if (pokemon.length > 0) {
            if (pokemon_id === undefined || pokemon_id === null) {
                return ''
            }
            const matchedItem = pokemon?.find(poke => poke.pokemon_id === pokemon_id);
            return matchedItem.name
        }
        else { return pokemon_id }
    }

    return (
        <div>
            <h1>Stats Data Table</h1>
            <table>
                <thead>
                <tr>
                    <th>Stat id</th>
                    <th>pokemon_id and Name</th>
                    <th>hit points</th>
                    <th>attack power</th>
                    <th>defense power</th>
                    <th>speed</th>
                </tr>
                </thead>
                <tbody>
                {data.map((stat) => (
                    <tr key={stat.stat_id}>
                        <td>{stat.stat_id}</td>
                        <td>
                            {stat.pokemon_id + '-' + getPokemonNameByID(stat.pokemon_id)}
                        </td>
                        <td>
                            {stat.hit_points}
                        </td>
                        <td>
                            {stat.attack_power}
                        </td>
                        <td>
                            {stat.defense_power}
                        </td>
                        <td>
                            {stat.speed}
                        </td>
                        <td>
                            <button onClick={() => handleDeleteClick(stat.stat_id)}>Delete</button>
                        </td>
                    </tr>
                ))}
                </tbody>
            </table>
        </div>
    );
};

export default StatsTable;