import React, {useState, useEffect} from 'react';
import BattleForm from "../components/Battles/BattleForm";
import BattleTable from "../components/Battles/BattleTable";
import BattleUpdateForm from "../components/Battles/BattleUpdateForm";


const Battles = () => {

  const [battles, setBattles] = useState([]);
  const [trainers, setTrainers] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isUpdateModalOpen, setIsUpdateModalOpen] = useState(false);

  const getTrainers = async () => {
    try {
        const response = await fetch('/api/trainers/')
        const data = await response.json()
        setTrainers(data)
    } catch (error) {
        console.error('error fetching trainers')
    }
  }

  const getBattles = async () => {
    try {
        const response = await fetch('/api/battles/')
        const data = await response.json()
        setBattles(data)
    } catch (error) {
        console.error('error fetching battles')
    }
  }

  useEffect(() => {
    getBattles()
    getTrainers()
  }, []);


  const updateBattle = (rowId, updatedData) => {
    const updatedBattle = battles.map((battle) => {
      if (battle.battle_id === rowId) {
        const ts = updatedData.timestamp;
        updatedData.timestamp = new Date(ts).toString();
        return {...battle, ...updatedData};
      }
      return battle;
    });
    setBattles(updatedBattle);
  };

  const deleteBattle = (rowId) => {
    fetch(`/api/battles/${rowId}`, {
      method: 'DELETE',
    })
        .then((response) => {
          if (response.ok) {
            setBattles(battles.filter((battle) => battle.battle_id !== rowId));
          } else {
            console.error('Error deleting battle');
          }
        })
        .catch((error) => console.error('Error deleting battle:', error));
  }

  const addBattle = async (newBattleData) => {
    try {
      const response = await fetch('/api/battles/', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(newBattleData),
      })
      if (response.ok) {
        const createdBattle = await response.json();
        const ts = createdBattle.timestamp;
        createdBattle.timestamp = new Date(ts).toString();
        setBattles([...battles, createdBattle]);
      } else {
        console.error('Error updating battle.');
      }
    } catch (error) {
      console.error('Error updating battle:', error);
    }
  };

  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  const openUpdateModal = () => {
      setIsUpdateModalOpen(true);
  };

  const closeUpdateModal = () => {
      setIsUpdateModalOpen(false);
  };


  return (
      <div className="container">
        <BattleTable data={battles} trainers={trainers} onUpdateBattle={updateBattle} onDeleteBattle={deleteBattle}/>
        <button onClick={openModal}>Add Battle</button>
        {isModalOpen && (
            <div className="modal">
              <div className="modal-content">
                <BattleForm trainers={trainers} onAddBattle={addBattle}/>
                <button onClick={closeModal}>Close</button>
              </div>
            </div>
        )}
        <button onClick={openUpdateModal}>Update Battle</button>
        {isUpdateModalOpen && (
            <div className="modal">
                <div className="modal-content">
                    <BattleUpdateForm onUpdateBattle={updateBattle} battles={battles} trainers={trainers}  />
                    <button onClick={closeUpdateModal}>Close</button>
                </div>
            </div>
        )}
      </div>
  );
}

export default Battles;
