import React from 'react';
import PropTypes from 'prop-types';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import TodoList from './todo-list';
import TodoActions from './todo.actions';
import TextInput from '../common/text-input';

class TodoView extends React.Component {
  componentWillMount() {
    const { todoActions, todo, todos } = this.props;
    if (!todo.isFetching && !todos.length) {
      todoActions.loadTodos();
    }
  }
  createTodo = (text) => {
    const { todoActions } = this.props;
    todoActions.createTodo(text);
  }
  render() {
    const { todos, todoActions, isOnline } = this.props;
    return (
      <div>
        { isOnline
          ? (<span>Online</span>)
          : (<span>Offline</span>)
        }
        <br />
        <TextInput create placeholder="what to do?" onSave={this.createTodo} />
        <TodoList todos={todos} actions={todoActions} />
      </div>
    );
  }
}

TodoView.propTypes = {
  todoActions: PropTypes.object.isRequired,  // eslint-disable-line react/forbid-prop-types
  todo: PropTypes.object.isRequired,  // eslint-disable-line react/forbid-prop-types
  todos: PropTypes.array.isRequired,  // eslint-disable-line react/forbid-prop-types
  isOnline: PropTypes.bool.isRequired
};

export default connect(
    state => ({ isOnline: state.app.isOnline, todo: state.todo, todos: state.todo.todos }),
    dispatch => ({ todoActions: bindActionCreators(TodoActions, dispatch) })
)(TodoView);
