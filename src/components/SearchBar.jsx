import { SearchIcon } from '../assets/icons';

const SearchBar = ({ placeholder, handler, value, name }) => {
    return (
        <div className='search-bar'>
            <input
                className='search-bar__input'
                type='text'
                id='searchText'
                name={name}
                placeholder={placeholder}
                value={value}
                onChange={handler}
            />
            {placeholder === 'Search note...' && (
                <div className='search-bar__icon'>
                    <SearchIcon />
                </div>
            )}
        </div>
    );
};

export default SearchBar;
