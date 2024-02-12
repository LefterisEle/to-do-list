import { useState } from 'react';

import TodosList from '../components/TodosList';
import UtilityBar from '../components/UtilityBar';
import AddTodoModal from '../components/AddTodoModal';
import UpdateTodoModal from '../components/UpdateTodoModal';
import { useSearchParams } from 'react-router-dom';
import { PlusIcon } from '../assets/icons';

const IndexPage = () => {
    const [theme, setTheme] = useState('light');

    const handleThemeChange = () => {
        setTheme((prev) => (prev === 'light' ? 'dark' : 'light'));
    };
    const [searchParams, setSearchParams] = useSearchParams();
    const isAddModalOpen = searchParams.get('addModal');
    const isUpdateModalOpen = searchParams.get('updateModal');

    const handleFilterChange = (key, value) => {
        setSearchParams((prevParams) => {
            if (!value) {
                prevParams.delete(key);
            } else {
                prevParams.set(key, value);
            }
            return prevParams;
        });
    };

    return (
        <div className='landing-page' data-theme={theme}>
            <h2 className='landing-page__title'>TODO LIST</h2>
            <UtilityBar
                handleThemeChange={handleThemeChange}
                handleFilterChange={handleFilterChange}
                searchParams={searchParams}
                theme={theme}
            />
            <TodosList
                handleFilterChange={handleFilterChange}
                searchParams={searchParams}
            />
            <button
                className='landing-page__open-modal-button'
                onClick={() => {
                    handleFilterChange('addModal', 'open');
                }}
            >
                <PlusIcon />
            </button>
            {isAddModalOpen && (
                <AddTodoModal handleFilterChange={handleFilterChange} />
            )}

            {isUpdateModalOpen && (
                <UpdateTodoModal
                    handleFilterChange={handleFilterChange}
                    id={isUpdateModalOpen}
                />
            )}
        </div>
    );
};

export default IndexPage;
