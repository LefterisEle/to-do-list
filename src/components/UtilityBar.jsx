import { useState } from 'react';
import SearchBar from './SearchBar';
import SelectGroup from './SelectGroup';
import { DarkIcon, SunIcon } from '../assets/icons';

const UtilityBar = ({
    handleThemeChange,
    handleFilterChange,
    searchParams,
    theme,
}) => {
    const typeGroup = searchParams.get('groupTodos');
    const typeSearchText = searchParams.get('searchText');

    const [filterParams, setFilterParams] = useState({
        searchText: typeSearchText ? typeSearchText : '',
        groupTodos: typeGroup ? typeGroup : '',
    });

    const handleFilterState = (e) => {
        const { name, value } = e.target;
        setFilterParams({ ...filterParams, [name]: value });
        handleFilterChange(name, value);
    };

    return (
        <div className='utility-bar'>
            <div className='utility-bar__search-bar'>
                <SearchBar
                    placeholder='Search note...'
                    handler={handleFilterState}
                    value={filterParams.searchText}
                    name='searchText'
                />
            </div>

            <div className='utility-bar__container'>
                <SelectGroup
                    setFilterParams={setFilterParams}
                    value={filterParams}
                    handleFilterChange={handleFilterChange}
                />
                <div className='utility-bar__icon' onClick={handleThemeChange}>
                    {theme === 'light' ? <DarkIcon /> : <SunIcon />}
                </div>
            </div>
        </div>
    );
};

export default UtilityBar;
