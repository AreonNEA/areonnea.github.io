import { useState } from "react"
import styles from './styles/AddTodo.module.css';

export default function AddTodo({ dispatch }) {
    const [todos, setTodos] = useState("");
    return (
        <div className={styles.container}>
            <form onSubmit={(evt) => {
                evt.preventDefault();
                if (todos) {
                    dispatch({ type: "AddTodos", payload: { id: Math.random(), text: todos, isCompleted: false } });
                }
                setTodos("")
            }}>
                <input onChange={(evt) => setTodos(evt.target.value)} type="text" placeholder="Add Todo" value={todos} />
                <button>Add</button>
            </form>
        </div>
    )
}



