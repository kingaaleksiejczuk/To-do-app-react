import React, { useState, useEffect, useContext } from 'react'
import Todo from './Todo';
import TodoForm from './TodoForm'
import { useFetch } from "../components/CustomHooks";


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

    const URL = 'https://jsonplaceholder.typicode.com/users/1/todos';
    const data = useFetch(URL);


    // useMemo 
    const memoValue = React.useMemo(() => {
        return data.map((item) => {
            return { id: item.id, text: item.title };
        });
    }, [data]);

    React.useEffect(() => {

        if (todos.length === 0) {
            setTodos(memoValue)
        }
    }, [memoValue, setTodos, todos]);


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
        <div className='todo-app'>
            <h1>To do list</h1>
            <TodoForm onSubmit={addTodo} />
            <Todo
                todos={todos}
                completeTodo={completeTodo} removeTodo={removeTodo} updateTodo={updateTodo} />
        </div>
    );
}

export default ToDoList;

