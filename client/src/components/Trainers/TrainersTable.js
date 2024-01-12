import React from "react";

const TrainersTable = ({ data, onDeleteTrainer }) => {

      const handleDeleteClick = (rowId) => {
        onDeleteTrainer(rowId)
      }



    return (
      <div>
        <h1>Trainers Data Table</h1>
        <table>
          <thead>
            <tr>
              <th>Trainer id</th>
              <th>Name</th>
              <th>Location</th>
              <th>wins</th>
              <th>losses</th>
            </tr>
          </thead>
          <tbody>
            {data.map((trainer) => (
              <tr key={trainer.trainer_id}>
                <td>{trainer.trainer_id}</td>
                <td>
                {trainer.name}
              </td>
              <td>
                {trainer.location}
              </td>
              <td>
                {trainer.wins}
              </td>
              <td>
                {trainer.losses}
              </td>
              <td>
                <button onClick={() => handleDeleteClick(trainer.trainer_id)}>Delete</button>
              </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    );
  };

export default TrainersTable;