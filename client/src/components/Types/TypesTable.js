import React from "react";

const TypesTable = ({ data, onDeleteType }) => {

      const handleDeleteClick = (rowId) => {
        onDeleteType(rowId)
      }

    const getTypeNameByID = (type_id) => {
      const matchedItem = data.find(type => type.type_id === type_id);
      if (matchedItem && matchedItem.type_name !== null) {
        return matchedItem.type_name
      } else {
        return 'no type selected';
      }
      
    };

    return (
      <div>
        <h1>Types Data Table</h1>
        <table>
          <thead>
            <tr>
              <th>Type id</th>
              <th>Name</th>
              <th>weak against</th>
              <th>strong against</th>
            </tr>
          </thead>
          <tbody>
            {data.map((type) => (
              <tr key={type.type_id}>
                <td>{type.type_id}</td>
                <td>
                {type.type_name}
              </td>
              <td>
                {getTypeNameByID(type.weak_against)}
              </td>
              <td>
                {getTypeNameByID(type.strong_against)}
              </td>
              <td>
                <button onClick={() => handleDeleteClick(type.type_id)}>Delete</button>
              </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    );
  };

export default TypesTable;