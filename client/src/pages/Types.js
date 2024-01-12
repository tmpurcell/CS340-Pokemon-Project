import React, {useEffect, useState} from 'react';
import TypesTable from "../components/Types/TypesTable";
import TypeForm from "../components/Types/TypeForm";
import TypeUpdateForm from "../components/Types/TypeUpdateForm";


const Types = () => {
    const [types, setTypes] = useState([]);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isUpdateModalOpen, setIsUpdateModalOpen] = useState(false);

    useEffect(() => {
        fetch('/api/types/')
            .then((response) => response.json())
            .then((data) => {
                setTypes(data)
            })
            .catch((error) => console.error('Error fetching contacts:', error));
    }, []);

    const addType = async (newTypeData) => {
        try {
            const response = await fetch('/api/types/', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(newTypeData),
            })
            if (response.ok) {
                const createdType = await response.json();
                setTypes([...types, createdType]);
            } else {
                console.error('Error updating type.');
            }
        } catch (error) {
            console.error('Error updating type:', error);
        }
    };

    const updateType = (rowId, updatedData) => {
        const updatedType = types.map((type) => {
            if (type.type_id === rowId) {
                return {...type, ...updatedData};
            }
            return type;
        });
        setTypes(updatedType);
    };

    const deleteType = (rowId) => {
        fetch(`/api/types/${rowId}`, {
            method: 'DELETE',
        })
            .then((response) => {
                if (response.ok) {
                    setTypes(types.filter((type) => type.type_id !== rowId));
                    ;
                } else {
                    console.error('Error deleting type');
                }
            })
            .catch((error) => console.error('Error deleting type:', error));
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
            <TypesTable data={types} onUpdateType={updateType} onDeleteType={deleteType}/>
            <button onClick={openModal}>Add type</button>
            {isModalOpen && (
                <div className="modal">
                    <div className="modal-content">
                        <TypeForm types={types} onAddType={addType}/>
                        <button onClick={closeModal}>Close</button>
                    </div>
                </div>
            )}
            <button onClick={openUpdateModal}>Edit Type</button>
            {isUpdateModalOpen && (
                <div className="modal">
                    <div className="modal-content">
                        <TypeUpdateForm types={types} onUpdateType={updateType}/>
                        <button onClick={closeUpdateModal}>Close</button>
                    </div>
                </div>
            )}
        </div>
    );
};

export default Types;
