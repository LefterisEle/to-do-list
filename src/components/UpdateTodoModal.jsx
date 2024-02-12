import { useEffect, useState } from 'react';
import SearchBar from './SearchBar';
import { useUpdateTodoMutation, useGetTodoByIdQuery } from '../api/apiSlice';
import Error from './Error';

import React from 'react';

const UpdateTodoModal = ({ handleFilterChange, id }) => {
    const { data: todo, isLoading, isError, error } = useGetTodoByIdQuery(id);

    const [newNote, setNewNote] = useState('');
    const [noteError, setNoteError] = useState(false);

    const [updateTodo] = useUpdateTodoMutation();

    const updateUrl = () => handleFilterChange('updateModal', '');

    const handleInputChange = (e) => {
        const { value } = e.target;
        setNewNote(value);
    };

    const handleSubmitBtn = () => {
        updateTodo({ ...todo, text: newNote });

        updateUrl();
        setNewNote('');
    };

    useEffect(() => {
        //27 = esc & 13 = enter
        const handleKeyPress = (e) => {
            if (e.keyCode === 27) {
                updateUrl();
            } else if (e.keyCode === 13) {
                if (newNote.trim().length === 0 || newNote === todo.text) {
                    setNoteError(true);
                } else handleSubmitBtn();
            }
        };

        document.addEventListener('keydown', handleKeyPress);

        return () => {
            document.removeEventListener('keydown', handleKeyPress);
        };
    }, [newNote]);

    useEffect(() => {
        setTimeout(() => {
            setNoteError(false);
        }, 6000);
    }, [noteError]);

    useEffect(() => {
        if (todo) {
            setNewNote(todo.text);
        }
    }, [isLoading]);

    if (isLoading) {
        return <p>Loading...</p>;
    } else if (isError) {
        return <Error error={error} />;
    }

    return (
        <div
            className='modal__background'
            onClick={(e) => {
                if (e.target.className === 'modal__background') {
                    updateUrl();
                }
            }}
        >
            <div className='modal'>
                <div className='modal__body'>
                    <h2 className='modal__title'>UPDATE NOTE</h2>
                    <div className='modal__search-bar'>
                        <SearchBar
                            placeholder={`Update your note...`}
                            handler={handleInputChange}
                            value={newNote}
                            name='text'
                        />
                    </div>
                    {noteError && <p className='modal__error'>Please update</p>}
                </div>
                <div className='modal__buttons'>
                    <button
                        className='modal__cancel-button'
                        onClick={() => {
                            setNewNote('');
                            updateUrl();
                        }}
                    >
                        CANCEL
                    </button>
                    <button
                        className='modal__submit-button'
                        onClick={handleSubmitBtn}
                        disabled={
                            newNote.trim().length === 0 || newNote === todo.text
                        }
                    >
                        APPLY
                    </button>
                </div>
            </div>
        </div>
    );
};

export default UpdateTodoModal;
