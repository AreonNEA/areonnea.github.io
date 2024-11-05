import { useState } from "react";
import styles from './styles/AddTodo.module.css';

export default function AddTodo({ dispatch, todos }) {
    const [newTodo, setNewTodo] = useState("");
    const [error, setError] = useState("");

    const handleSubmit = (evt) => {
        evt.preventDefault();
        if (newTodo && !todos.some(todo => todo.text === newTodo)) {
            dispatch({ type: "AddTodos", payload: { id: Math.random(), text: newTodo, isCompleted: false } });
            setNewTodo("");
            setError(""); 
        } else {
            setError("A task with this text already exists!");
        }
    };

    return (
        <div className={styles.container}>
            <form onSubmit={handleSubmit}>
                <input
                    onChange={(evt) => setNewTodo(evt.target.value)}
                    type="text"
                    placeholder="Add Todo"
                    value={newTodo}
                />
                <button type="submit">Add</button>
            </form>
            {error && <div className={styles.error}>{error}</div>}  
        </div>
    );
}
