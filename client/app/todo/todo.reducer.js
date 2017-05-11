import actions from '../../config/actions';
import listReducerPackage from '../../components/list.reducer-package';

const {
  CREATE_TODO,
  CREATE_TODO_SUCCESS,
  LOAD_TODOS,
  LOAD_TODOS_SUCCESS
} = actions;

const initialState = {
  todos: []
};

const reducerActions = {
  ...listReducerPackage({ entity: 'TODO', listProperty: 'todos' }),
  [LOAD_TODOS]: state => ({ ...state, isFetching: true }),
  [LOAD_TODOS_SUCCESS]: (state, action) => ({ ...state, isFetching: false, todos: action.todos }),
  [CREATE_TODO]: (state, action) => ({ ...state, todos: [action.todo, ...state.todos] }),
  [CREATE_TODO_SUCCESS]: (state, action) => {
    const todoIndex = state.todos.map(todo => todo.transactionId).indexOf(action.transaction.id);
    return {
      ...state,
      todos: [
        ...state.todos.slice(0, todoIndex),
        action.todo,
        ...state.todos.slice(todoIndex + 1)
      ]
    };
  }
};

const todoReducer = (state = initialState, action) => {
  if (!reducerActions[action.type]) {
    return state;
  }
  return reducerActions[action.type](state, action);
};

export default todoReducer;
