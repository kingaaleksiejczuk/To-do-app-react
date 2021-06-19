import React, { useState } from 'react'

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

function TodoForm(props) {

    const [input, setInput] = useState('');
    const [lastId, setLastId] = useLocalStorageState('lastId', 0);

    const handleChange = e => {
        setInput(e.target.value)
    }

    const handleSubmit = e => {
        e.preventDefault();

        props.onSubmit({
            text: input,
            id: lastId
        })
        setInput('');
        setLastId(lastId + 1);
    }

    return (
        <form onSubmit={handleSubmit} className='todo-form'>
            {props.edit ? (
                <>
                    <input
                        placeholder='Update your item'
                        value={input}
                        onChange={handleChange}
                        name='text'
                        className='todo-input edit'
                    />
                    <button onClick={handleSubmit} className='todo-button edit'>
                        Update
          </button>
                </>
            ) : (
                    <>
                        <input
                            placeholder='Add a todo'
                            value={input}
                            onChange={handleChange}
                            name='text'
                            className='todo-input'
                        />
                        <button onClick={handleSubmit} className='todo-button'>
                            Add todo
          </button>
                    </>
                )}
        </form>
    );
}


export default TodoForm
