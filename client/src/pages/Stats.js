import React, {useState, useEffect} from 'react';
import StatsForm from "../components/Stats/StatsForm";
import StatsTable from "../components/Stats/StatsTable";
import StatsUpdateForm from "../components/Stats/StatsUpdateForm";


const Stats = () => {

    const [stats, setStats] = useState([]);
    const [pokemon, setPokemon] = useState([]);
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
    const getStats = async () => {
        try {
            const response = await fetch('/api/stats/')
            const data = await response.json()
            setStats(data)
        } catch (error) {
            console.error('error fetching types from pokemon app')
        }
    }

    useEffect(() => {
        getStats()
        getPokemon()
    }, []);


    const updateStats = (rowId, updatedData) => {
        const updatedStat = stats.map((stat) => {
            if (stat.stat_id === rowId) {
                return {...stat, ...updatedData};
            }
            return stat;
        });
        setStats(updatedStat);
    };

    const deleteStat = (rowId) => {
        fetch(`/api/stats/${rowId}`, {
            method: 'DELETE',
        })
            .then((response) => {
                if (response.ok) {
                    setStats(stats.filter((stat) => stat.stat_id !== rowId));
                } else {
                    console.error('Error deleting pokemon');
                }
            })
            .catch((error) => console.error('Error deleting battle:', error));
    }

    const addStat = async (newStatData) => {
        try {
            const response = await fetch('/api/stats/', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(newStatData),
            })
            if (response.ok) {
                const createdStat = await response.json();
                setStats([...stats, createdStat]);
            } else {
                console.error('Error updating stat.');
            }
        } catch (error) {
            console.error('Error updating stat:', error);
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
            <StatsTable data={stats} pokemon={pokemon} onDeleteStat={deleteStat}/>
            <button onClick={openModal}>Add Stat</button>
            {isModalOpen && (
                <div className="modal">
                    <div className="modal-content">
                        <StatsForm pokemon={pokemon} onAddStat={addStat}/>
                        <button onClick={closeModal}>Close</button>
                    </div>
                </div>
            )}
            <button onClick={openUpdateModal}>Update Stat</button>
            {isUpdateModalOpen && (
                <div className="modal">
                    <div className="modal-content">
                        <StatsUpdateForm stats={stats} pokemon={pokemon} onUpdateStat={updateStats}/>
                        <button onClick={closeUpdateModal}>Close</button>
                    </div>
                </div>
            )}

        </div>
    );
}

export default Stats;
