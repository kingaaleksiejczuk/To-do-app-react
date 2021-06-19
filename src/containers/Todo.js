import React from 'react';
import TodoForm from './TodoForm';
import { RiCloseCircleLine } from 'react-icons/ri';
import { TiEdit } from 'react-icons/ti';


function Todo({ todos, completeTodo, removeTodo, updateTodo }) {

    // const [edit, setEdit] = useState({
    //     id: null,
    //     value: '',
    // });

    const initialState = {
        edit: {
            id: null,
            value: ''
        }
    }

    const reducer = (state, action) => {
        console.log(state, action);
        switch (action.type) {
            case 'edit': return {
                ...state,
                edit: action.payload
            };

            default: return state;
        }
    }


    const [state, dispatch] = React.useReducer(reducer, initialState)


    const submitUpdate = value => {
        updateTodo(state.edit.id, value)
        dispatch(
            {
                type: 'edit',
                payload: {
                    id: null,
                    value: ''
                }
            }
        )
    };

    if (state.edit.id) {
        return <TodoForm edit={state.edit} onSubmit={submitUpdate} />;
    };

    return todos.map((todo, index) => (

        <div
            className={`todo-row ${todo.isComplete && 'complete'}`}
            key={index}
        >
            <div key={todo.id} onClick={() => completeTodo(todo.id)}>
                {todo.text}
            </div>

            <div className="icons">
                <RiCloseCircleLine
                    onClick={() => removeTodo(todo.id)}
                    className='delete-icon'
                />
                <TiEdit
                    onClick={() => dispatch({ type: 'edit', payload: { id: todo.id, value: todo.text } })}
                    className='edit-icon'
                />
            </div>
        </div>
    ));
};

export default Todo
