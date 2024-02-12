import React, { useState } from 'react';
import { useUpdateTodoMutation, useDeleteTodoMutation } from '../api/apiSlice';
import { DeleteIcon, EditIcon } from '../assets/icons';

const Todo = ({ todo, handleFilterChange }) => {
    const [isHovered, setIsHovered] = useState(false);

    const [updateTodo] = useUpdateTodoMutation();
    const [deleteTodo] = useDeleteTodoMutation();

    return (
        <div
            onMouseOver={() => setIsHovered(true)}
            onMouseOut={() => setIsHovered(false)}
            className='todo'
        >
            <div className='todo__container'>
                <div className='todo__checkbox-container'>
                    <input
                        className='todo__checkbox-input'
                        type='checkbox'
                        id={todo.id}
                        name='todo-checkbox'
                        checked={todo.isCompleted}
                        value={todo.isCompleted}
                        onChange={(e) =>
                            updateTodo({
                                ...todo,
                                isCompleted: !todo.isCompleted,
                            })
                        }
                    />
                    <label
                        htmlFor={todo.id}
                        className={
                            todo.isCompleted
                                ? 'todo__title todo__title-completed'
                                : 'todo__title'
                        }
                    >
                        {todo.text}
                    </label>
                </div>
            </div>
            {isHovered && (
                <div className='todo__utilities'>
                    <div
                        onClick={() => {
                            deleteTodo(todo);
                        }}
                    >
                        <DeleteIcon />
                    </div>
                    <div
                        onClick={() => {
                            handleFilterChange('updateModal', `${todo.id}`);
                        }}
                    >
                        <EditIcon />
                    </div>
                </div>
            )}
        </div>
    );
};

export default Todo;
