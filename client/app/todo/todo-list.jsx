import React from 'react';
import PropTypes from 'prop-types';
import Todo from './todo';

const TodoList = ({ actions, todos }) => (
  <div>
    <h1>Todo</h1>
    {todos.map(todo => <Todo key={todo._id || todo.transactionId} todo={todo} actions={actions} />)}
  </div>
);

TodoList.propTypes = {
  actions: PropTypes.object.isRequired, // eslint-disable-line react/forbid-prop-types
  todos: PropTypes.array.isRequired // eslint-disable-line react/forbid-prop-types
};

export default TodoList;
