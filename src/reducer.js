export default function reducer(state, action) {
    switch (action.type) {
        case 'AddTodos':
            return [...state, action.payload];
        case 'removeTodo':
            return state.filter((todo) => todo.id !== action.payload);
        case 'clearCompleted':
            return state.filter((todo) => !todo.completed);

        case 'isChecked':
            return state.map((todo) => {
                if (todo.id === action.payload.id) {
                    return { ...todo, completed: action.payload.completed }
                }
                else {
                    return todo
                }
            })
        default:
            return state;
    }
}