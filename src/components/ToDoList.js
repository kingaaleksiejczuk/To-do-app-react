import React, { useState } from 'react'
import Todo from './Todo';
import TodoForm from './TodoForm'

function useLocalStorageState(key, defaultValue) {
    const [value, setValue] = React.useState(() => {
        const valueFromLocalStorage = window.localStorage.getItem(key);
        if (valueFromLocalStorage) {
            return JSON.parse(valueFromLocalStorage);
        }
        return typeof defaultValue === 'function' ? defaultValue() : defaultValue;
    });


    React.useEffect(() => {
        window.localStorage.setItem(key, JSON.stringify(value));
    }, [value, key]);
    return [value, setValue];
}

function ToDoList() {

    const [todos, setTodos] = useLocalStorageState("todos", []);

    const addTodo = todo => {
        if (!todo.text) {
            return;
        }

        const newTodos = [...todos, todo]
        setTodos(newTodos)
    };


    const updateTodo = (todoId, newValue) => {
        if (!newValue.text) {
            return;
        }
        setTodos(prev => prev.map(item => (item.id === todoId ? newValue : item))
        );
    }


    const removeTodo = id => {
        const removeArr = [...todos].filter(todo => todo.id !== id)

        setTodos(removeArr)
    }


    const completeTodo = id => {
        let updatedTodos = todos.map(todo => {
            if (todo.id === id) {
                todo.isComplete = !todo.isComplete
            }
            return todo;
        });

        setTodos(updatedTodos);
    };

    return (
        <div>
            <h1>To do list</h1>
            <TodoForm onSubmit={addTodo} />
            <Todo
                todos={todos}
                completeTodo={completeTodo} removeTodo={removeTodo} updateTodo={updateTodo} />
        </div>
    );
}

export default ToDoList

