import { useEffect, useState } from 'react';
import SearchBar from './SearchBar';
import { useAddTodoMutation } from '../api/apiSlice';
import utilities from '../handlers/utilities';
import Error from './Error';

const AddTodoModal = ({ handleFilterChange }) => {
    const [newNote, setNewNote] = useState('');
    const [noteError, setNoteError] = useState(false);

    const [addToDo] = useAddTodoMutation();

    const { generateRandomString } = utilities;

    const updateUrl = () => handleFilterChange('addModal', '');

    const handleInputChange = (e) => {
        const { value } = e.target;
        setNewNote(value);
    };

    const handleSubmitBtn = () => {
        addToDo({
            id: generateRandomString(),
            text: newNote,
            isCompleted: false,
        });

        updateUrl();
        setNewNote('');
    };

    useEffect(() => {
        //27 = esc & 13 = enter
        const handleKeyPress = (e) => {
            if (e.keyCode === 27) {
                updateUrl();
            } else if (e.keyCode === 13) {
                if (newNote.trim().length === 0) {
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
                    <h2 className='modal__title'>NEW NOTE</h2>
                    <div className='modal__search-bar'>
                        <SearchBar
                            placeholder={`Input your note...`}
                            handler={handleInputChange}
                            value={newNote}
                            name='text'
                        />
                    </div>
                    {noteError && (
                        <p className='modal__error'>Please add more info</p>
                    )}
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
                        disabled={newNote.trim().length === 0}
                    >
                        APPLY
                    </button>
                </div>
            </div>
        </div>
    );
};

export default AddTodoModal;
