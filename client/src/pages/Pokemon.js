import React, {useEffect, useState} from "react";
import PokemonForm from "../components/Pokemon/PokemonForm";
import PokemonTable from "../components/Pokemon/PokemonTable";
import PokemonUpdateForm from "../components/Pokemon/PokemonUpdateForm";


function PokemonAPI () {
    const [pokemon, setPokemon] = useState([]);
    const [typeData, setTypeData] = useState([]);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isUpdateModalOpen, setIsUpdateModalOpen] = useState(false);

    const getPokemon = async () => {
        try {
            const response = await fetch('/api/pokemon/')
            const data = await response.json()
            setPokemon(data)
        } catch (error) {
            console.error('error fetching types from pokemon app')
        }
    }

    const getTypes = async () => {
        try {
            const response = await fetch('/api/types/')
            const data = await response.json()
            setTypeData(data)
        } catch (error) {
            console.error('error fetching types from pokemon app')
        }

    }

    useEffect(() => {
        getTypes()
        getPokemon()
    }, []);

    const updatePokemon = (rowId, updatedData) => {
        const updatedPokemons = pokemon.map((pokemon) => {
            if (pokemon.pokemon_id === rowId) {
                return {...pokemon, ...updatedData};
            }
            return pokemon;
        });
        setPokemon(updatedPokemons);
    };

    const deletePokemon = (rowId) => {
        fetch(`/api/pokemon/${rowId}`, {
            method: 'DELETE',
        })
            .then((response) => {
                if (response.ok) {
                      setPokemon(pokemon.filter((pokemon) => pokemon.pokemon_id !== rowId));;
                } else {
                    console.error('Error deleting pokemon');
                }
            })
            .catch((error) => console.error('Error deleting pokemon:', error));
    }

    const addPokemon = async (newPokemonData) => {
        try {
            const response = await fetch('/api/pokemon/', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(newPokemonData),
            })
            if (response.ok) {
                const createdPokemon = await response.json();
                setPokemon([...pokemon, createdPokemon]);
                closeModal()
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
            <PokemonTable pokemonData={pokemon} onDeletePokemon={deletePokemon}/>
            <button onClick={openModal}>Add Pokemon</button>
            {isModalOpen && (
                <div className="modal">
                    <div className="modal-content">
                        <PokemonForm onAddPokemon={addPokemon}/>
                        <button onClick={closeModal}>Close</button>
                    </div>
                </div>
            )}
            <button onClick={openUpdateModal}>Update Pokemon</button>
            {isUpdateModalOpen && (
                <div className="modal">
                    <div className="modal-content">
                        <PokemonUpdateForm onUpdatePokemon={updatePokemon} types={typeData} pokemon={pokemon}  />
                        <button onClick={closeUpdateModal}>Close</button>
                    </div>
                </div>
            )}
        </div>
    )
};

const PokemonSearch = () => {
    const [searchProperty, setSearchProperty] = useState('name');
    const [searchKeyword, setSearchKeyword] = useState('');
    const [searchResults, setSearchResults] = useState([]);

    const handleSearchPropertyChange = (event) => {
        setSearchProperty(event.target.value);
    };

    const handleSearchKeywordChange = (event) => {
        setSearchKeyword(event.target.value);
    };

    const searchPokemon = async () => {
        try {
            const response = await fetch(`/api/pokemon/?property=${searchProperty}&keyword=${searchKeyword}`);

            if (response.ok) {
                const searchResults = await response.json();

                // Update state with the search results
                setSearchResults(searchResults);
            } else {
                console.error('Error searching pokemon:', response.statusText);
            }
        } catch (error) {
            console.error('Error searching pokemon:', error);
        } finally {
        }
    };

    return (
        <div>
            {/* First Section: Search Pokemon */}
            <div id="search" style={{display: 'block'}}>
                <p><strong>Search Pokemon</strong></p>
                <form id="pokemonSearchForm">
                    <fieldset className="fields">
                        <label htmlFor="searchProperty">Search by:</label>
                        <select id="searchProperty" value={searchProperty} onChange={handleSearchPropertyChange}>
                            <option value="name">Name</option>
                            <option value="type">Type</option>
                            <option value="description">Description</option>
                            <option value="tier_rank">Tier Rank</option>
                            <option value="evolves_into">Evolves Into</option>
                        </select>
                        <input
                            type="text"
                            id="searchKeyword"
                            placeholder="Search keyword"
                            value={searchKeyword}
                            onChange={handleSearchKeywordChange}
                        />
                    </fieldset>
                    <input className="btn" type="button" value="Search" onClick={searchPokemon}/>
                </form>
                <p>&nbsp;</p>
                <div id="searchResults">
                    {/* Display search results here */}
                    {searchResults.map(result => (
                        <div key={result.pokemon_id}>
                            <p><strong>ID:</strong> {result.pokemon_id}</p>
                            <p><strong>Name:</strong> {result.name}</p>
                            <p><strong>Type:</strong> {result.type}</p>
                            <p><strong>Description:</strong> {result.description}</p>
                            <p><strong>Tier Rank:</strong> {result.tier_rank}</p>
                            <p><strong>Evolves Into:</strong> {result.evolves_into}</p>
                            <hr/>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    )};


function Pokemon () {
    return (
        <div className="container">
            {/* First Section: Search Pokemon */}
            <PokemonSearch />
            {/* Second Section: Pokemon Table and Modal */}
            <PokemonAPI />
        </div>
    )
}

export default Pokemon;
