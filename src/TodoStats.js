import styles from  './styles/TodoStats.module.css';


export default function TodoStats({ todos, dispatch }) {
    const completedTodos = todos.filter(todo => todo.completed).length;
    return (<div  className={styles.container}>
        <span>{completedTodos}/{todos.length}  is Completed</span>
        <button onClick={()=>{
            dispatch({type:'clearCompleted'})
        }}>Clear Completed</button>
    </div>)

}
