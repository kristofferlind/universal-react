import apiService from '../../components/api.service';
import { apiEndpoints } from '../../config';
import actions from '../../config/actions';
import TRANSACTION from '../../components/transaction.constants';
import { generateId } from '../utilities';
import socketActionsPackage from '../../components/socket.actions-package';

const todoActions = {
  ...socketActionsPackage({ entity: 'TODO' }),
  loadTodos: () => (dispatch) => {
    dispatch({ type: actions.LOAD_TODOS });
    return apiService.get(apiEndpoints.TODO)
      .then((data) => {
        dispatch({ type: actions.LOAD_TODOS_SUCCESS, todos: data });
      })
      .catch((error) => {
        dispatch({ type: actions.LOAD_TODOS_ERROR, error });
        console.error(error); // eslint-disable-line
      });
  },
  createTodo: text => (dispatch) => {
    const transactionId = generateId();
    const todo = {
      transactionId,
      text,
      isDone: false
    };
    dispatch({
      type: actions.CREATE_TODO,
      todo,
      transaction: { type: TRANSACTION.BEGIN, id: transactionId }
    });
    return apiService.post(apiEndpoints.TODO, todo)
    .then((data) => {
      dispatch({
        type: actions.CREATE_TODO_SUCCESS,
        todo: data,
        transaction: { type: TRANSACTION.COMMIT, id: transactionId }
      });
    })
    .catch((error) => {
      dispatch({
        type: actions.CREATE_TODO_ERROR,
        error,
        transaction: { type: TRANSACTION.ROLLBACK, id: transactionId }
      });
      console.error(error); // eslint-disable-line
    });
  },
  updateTodo: (todo, text) => (dispatch) => {
    const newTodo = {
      ...todo,
      text
    };
    const transactionId = generateId();
    dispatch({
      type: actions.UPDATE_TODO,
      item: newTodo,
      transaction: { type: TRANSACTION.BEGIN, id: transactionId }
    });
    return apiService.put(`${apiEndpoints.TODO}/${todo._id}`, newTodo)
      .then((data) => {
        dispatch({
          type: actions.UPDATE_TODO_SUCCESS,
          item: data,
          transaction: { type: TRANSACTION.COMMIT, id: transactionId }
        });
      })
      .catch((error) => {
        dispatch({
          type: actions.UPDATE_TODO_ERROR,
          error,
          transaction: { type: TRANSACTION.ROLLBACK, id: transactionId }
        });
      });
  },
  deleteTodo: todo => (dispatch) => {
    const transactionId = generateId();
    dispatch({
      type: actions.DELETE_TODO,
      item: todo,
      transaction: { type: TRANSACTION.BEGIN, id: transactionId }
    });
    return apiService.delete(`${apiEndpoints.TODO}/${todo._id}`)
      .then(() => {
        dispatch({
          type: actions.DELETE_TODO_SUCCESS,
          transaction: { type: TRANSACTION.COMMIT, id: transactionId }
        });
      })
      .catch((error) => {
        dispatch({
          type: actions.DELETE_TODO_ERROR,
          error,
          transaction: { type: TRANSACTION.ROLLBACK, id: transactionId }
        });
      });
  },
  toggleTodo: todo => (dispatch) => {
    const newTodo = {
      ...todo,
      isDone: !todo.isDone
    };
    const transactionId = generateId();
    dispatch({
      type: actions.UPDATE_TODO,
      item: newTodo,
      transaction: { type: TRANSACTION.BEGIN, id: transactionId }
    });
    return apiService.put(`${apiEndpoints.TODO}/${todo._id}`, newTodo)
      .then((data) => {
        dispatch({
          type: actions.UPDATE_TODO_SUCCESS,
          item: data,
          transaction: { type: TRANSACTION.COMMIT, id: transactionId }
        });
      })
      .catch((error) => {
        dispatch({
          type: actions.UPDATE_TODO_ERROR,
          error,
          transaction: { type: TRANSACTION.ROLLBACK, id: transactionId }
        });
      });
  }
};

export default todoActions;
