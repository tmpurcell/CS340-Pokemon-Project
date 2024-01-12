import React, {useState} from "react";

const BattleTable = ({ data, trainers, onDeleteBattle }) => {
    
      const handleDeleteClick = (rowId) => {
        onDeleteBattle(rowId)
      }

      const formatTimestamp = (timestamp) => {
        const options = {
          day: 'numeric',
          month: 'short',
          year: 'numeric',
          hour: 'numeric',
          minute: 'numeric',
        };
      
        const formattedTimestamp = new Intl.DateTimeFormat('en-US', options).format(new Date(timestamp));
        return formattedTimestamp;
      };

      const getTrainerNameByID = (trainer_id) => {
          if (trainers.length > 0) {
            const matchedItem = trainers?.find(trainer => trainer.trainer_id === trainer_id);
            return matchedItem.name
          }
          else { return trainer_id }
    }

    return (
      <div>
        <h1>Battles Data Table</h1>
        <table>
          <thead>
            <tr>
              <th>Battle ID</th>
              <th>Trainer 1</th>
              <th>Trainer 2</th>
              <th>Outcome</th>
              <th>Timestamp</th>
            </tr>
          </thead>
          <tbody>
            {data.map((battle) => (
              <tr key={battle.battle_id}>
                <td>{battle.battle_id}</td>
                <td>
                {getTrainerNameByID(battle.trainer_1)}
              </td>
              <td>
                {getTrainerNameByID(battle.trainer_2)}
              </td>
              <td>
                {battle.outcome}
              </td>
              <td>
                {formatTimestamp(battle.timestamp)}
              </td>
              <td>
                <button onClick={() => handleDeleteClick(battle.battle_id)}>Delete</button>
              </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    );
  };

export default BattleTable;