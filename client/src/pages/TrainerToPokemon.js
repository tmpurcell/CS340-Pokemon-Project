import React, {useEffect, useState} from "react";
import TrainerToPokemonTable from "../components/TrainerToPokemon/TrainerToPokemonTable";
import TrainerToPokemonForm from "../components/TrainerToPokemon/TrainerToPokemonForm";
import TrainerToPokemonUpdateForm from "../components/TrainerToPokemon/TrainerToPokemonUpdateForm";




function TrainerToPokemon () {
    const [pokeMatchs, setPokeMatch] = useState([]);
    const [trainers, setTrainers] = useState([]);
    const [pokemon, setPokemon] = useState([]);

    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isUpdateModalOpen, setIsUpdateModalOpen] = useState(false);

    const getPokemon = async () => {
        try {
            const response = await fetch('/api/pokemon/')
            const data = await response.json()
            setPokemon(data)
        } catch (error) {
            console.error('error fetching pokemon')
        }
    }

    const getTrainers = async () => {
        try {
            const response = await fetch('/api/trainers/')
            const data = await response.json()
            setTrainers(data)
        } catch (error) {
            console.error('error fetching trainers')
        }
    }
    const getPokeMatch = async () => {
        try {
            const response = await fetch('/api/pokematch/')
            const data = await response.json()
            setPokeMatch(data)
        } catch (error) {
            console.error('error fetching pokemon to trainer matches')
        }
    }

    useEffect(() => {
        getPokeMatch()
        getTrainers()
        getPokemon()
    }, []);


    const updatePokeMatch = (rowId, updatedData) => {
      const updatedPokeMatch = pokeMatchs.map((pokeMatch) => {
          if (pokeMatch.trainer_pokemon_id === rowId) {
              return {...pokeMatch, ...updatedData};
          }
          return pokeMatch;
      });
      setPokeMatch(updatedPokeMatch);
  };

  const deletePokeMatch = (rowId) => {
      fetch(`/api/pokematch/${rowId}`, {
          method: 'DELETE',
      })
          .then((response) => {
              if (response.ok) {
                  setPokeMatch(pokeMatchs.filter((pokematch) => pokematch.trainer_pokemon_id !== rowId));;
              } else {
                  console.error('Error deleting pokemon');
              }
          })
          .catch((error) => console.error('Error deleting pokemon:', error));
  }

  const addPokeMatch = async (newPokeMatchData) => {
      try {
          const response = await fetch('/api/pokematch/', {
              method: 'POST',
              headers: {
                  'Content-Type': 'application/json',
              },
              body: JSON.stringify(newPokeMatchData),
          })
          if (response.ok) {
              const createdPokeMatch = await response.json();
              setPokeMatch([...pokeMatchs, createdPokeMatch]);
          } else {
              console.error('Error updating pokemon.');
          }
      } catch (error) {
          console.error('Error updating pokemon:', error);
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
      <TrainerToPokemonTable data={pokeMatchs} trainers={trainers} pokemon={pokemon} onDeletePokematch={deletePokeMatch} />
      <button onClick={openModal}>Add Relationship</button>
            {isModalOpen && (
                <div className="modal">
                    <div className="modal-content">
                        <TrainerToPokemonForm onAddPokematch={addPokeMatch} pokemon={pokemon} trainers={trainers} />
                        <button onClick={closeModal}>Close</button>
                    </div>
                </div>
            )}
                    <button onClick={openUpdateModal}>Edit Relationship</button>
            {isUpdateModalOpen && (
                <div className="modal">
                    <div className="modal-content">
                        <TrainerToPokemonUpdateForm pokeMatchs={pokeMatchs} trainers={trainers} pokemon={pokemon} onUpdatePokeMatch={updatePokeMatch}/>
                        <button onClick={closeUpdateModal}>Close</button>
                    </div>
                </div>
            )}
    </div>
  );
};

export default TrainerToPokemon;

