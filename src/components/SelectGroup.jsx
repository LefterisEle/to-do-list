import Select from 'react-select';

const options = [
    { label: 'All', value: '' },
    { label: 'Completed', value: 'completed' },
    { label: 'Incompleted', value: 'incompleted' },
];

const SelectGroup = ({ setFilterParams, value, handleFilterChange }) => {
    const handleChange = (select) => {
        setFilterParams({ ...value, ['groupTodos']: select.value });
        handleFilterChange('groupTodos', select.value);
    };

    return (
        <Select
            styles={{
                control: (baseStyles, state) => ({
                    ...baseStyles,
                    color: '#fff',
                    outline: 'none',
                    border: 'none',
                    boxShadow: 'none',
                    backgroundColor: state.isFocused ? '#5850dd' : '#6c63ff',
                    blur: 'none',
                    fontSize: '14px',
                }),
                option: (baseStyles, state) => ({
                    ...baseStyles,
                    color: '#5850dd',
                    backgroundColor: state.isFocused ? '#a29dff' : '#fff',
                    fontSize: '14px',
                }),
                indicatorSeparator: () => ({
                    display: 'none',
                }),
                dropdownIndicator: (baseStyles, state) => ({
                    ...baseStyles,
                    color: state.isFocused ? '#fff' : '#fff',
                }),
                singleValue: (provided) => ({
                    ...provided,
                    color: '#fff',
                    fontSize: '12px',
                }),
            }}
            className='react-select-container'
            value={options.filter(
                (option) => option.value === value.groupTodos
            )}
            placeholder=''
            defaultValue={value.groupTodos}
            onChange={handleChange}
            options={options}
        />
    );
};

export default SelectGroup;
