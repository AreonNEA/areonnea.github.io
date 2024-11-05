
import { useReducer } from 'react';
import reducer from './reducer';
import AddTodo from './AddTodo';
import TodoList from './TodoList';
import TodoStats from './TodoStats';
import styles from  './styles/App.module.css';

function App() {
  const [todos, dispatch] = useReducer(reducer, [
    { id: Math.random(), text: 'Do morning exercise', isCompleted: false },
    { id: Math.random(), text: 'Read a book', isCompleted: false },
    { id: Math.random(), text: 'Finish work project', isCompleted: false }
  ]
  )
  return (
    <div className={styles.App}>
      <AddTodo dispatch={dispatch} />
      <TodoList todos={todos} dispatch={dispatch} />
      <TodoStats todos={todos} dispatch={dispatch} />
    </div>
  );
}

export default App;
