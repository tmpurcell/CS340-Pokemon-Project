import React, {useEffect, useState} from 'react';
import TrainersTable from "../components/Trainers/TrainersTable";
import TrainerForm from "../components/Trainers/TrainersForm";
import TrainerUpdateForm from "../components/Trainers/TrainersUpdateForm";


const Trainers = () => {
    const [trainers, setTrainers] = useState([]);
      const [isModalOpen, setIsModalOpen] = useState(false);
const [isUpdateModalOpen, setIsUpdateModalOpen] = useState(false);

    useEffect(() => {
        fetch('/api/trainers/')
            .then((response) => response.json())
            .then((data) => {setTrainers(data)})
            .catch((error) => console.error('Error fetching contacts:', error));
    }, []);

  const addTrainer = async (newTrainerData) => {
    try {
      const response = await fetch('/api/trainers/', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(newTrainerData),
      })
      if (response.ok) {
        const createdTrainer = await response.json();
        setTrainers([...trainers, createdTrainer]);
      } else {
        console.error('Error updating stat.');
      }
    } catch (error) {
      console.error('Error updating stat:', error);
    }
  };

    const updateTrainer = (rowId, updatedData) => {
    const updatedTrainer = trainers.map((trainer) => {
      if (trainer.trainer_id === rowId) {
        return {...trainer, ...updatedData};
      }
      return trainer;
    });
    setTrainers(updatedTrainer);
  };

  const deleteTrainer = (rowId) => {
    fetch(`/api/trainers/${rowId}`, {
      method: 'DELETE',
    })
        .then((response) => {
          if (response.ok) {
            setTrainers(trainers.filter((trainer) => trainer.trainer_id !== rowId));
            ;
          } else {
            console.error('Error deleting trainer');
          }
        })
        .catch((error) => console.error('Error deleting trainer:', error));
  }

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
        <TrainersTable data={trainers} onDeleteTrainer={deleteTrainer}/>
        <button onClick={openModal}>Add Trainer</button>
        {isModalOpen && (
            <div className="modal">
              <div className="modal-content">
                <TrainerForm onAddTrainer={addTrainer}/>
                <button onClick={closeModal}>Close</button>
              </div>
            </div>
        )}
            <button onClick={openUpdateModal}>Update Trainer</button>
            {isUpdateModalOpen && (
                <div className="modal">
                    <div className="modal-content">
                        <TrainerUpdateForm onUpdateTrainer={updateTrainer} trainers={trainers}  />
                        <button onClick={closeUpdateModal}>Close</button>
                    </div>
                </div>
            )}
      </div>
  );
};

export default Trainers;
