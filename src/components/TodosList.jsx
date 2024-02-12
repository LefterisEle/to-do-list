import { useGetTodosQuery } from '../api/apiSlice';
import Error from './Error';
import Todo from './Todo';
import DetectiveSVG from '../assets/detective.svg';
import filteredtasks from '../handlers/filtering';

const TodosList = ({ handleFilterChange, searchParams }) => {
    const { data: todos, isLoading, isError, error } = useGetTodosQuery();

    const typeGroup = searchParams.get('groupTodos');
    const typeSearchText = searchParams.get('searchText');

    const filteredTodos = filteredtasks(todos, typeSearchText, typeGroup);

    if (isLoading) {
        return <p>Loading...</p>;
    } else if (isError) {
        return <Error error={error} />;
    }

    if (filteredTodos.length === 0) {
        return (
            <div className='todos-list__empty'>
                <img src={DetectiveSVG} alt='DetectiveSVG' />
            </div>
        );
    }

    return (
        <section className='todos-list'>
            {filteredTodos.map((todo) => (
                <Todo
                    todo={todo}
                    key={todo.id}
                    handleFilterChange={handleFilterChange}
                    searchParams={searchParams}
                />
            ))}
        </section>
    );
};

export default TodosList;
