import React from 'react';
import PropTypes from 'prop-types';
import TextInput from '../common/text-input';

class Todo extends React.Component {
  constructor(props, context) {
    super(props, context);
    this.state = {
      editing: false
    };
  }
  handleEdit = () => {
    this.setState({
      editing: !this.state.editing
    });
  }
  handleSave = (text) => {
    const { todo, actions } = this.props;
    if (text.length === 0) {
      actions.deleteTodo(todo);
    } else {
      actions.updateTodo(todo, text);
    }
    this.setState({
      editing: false
    });
  }
  render() {
    const { todo, actions } = this.props;
    return (
      <div>
        <input type="checkbox" checked={todo.isDone} onChange={() => actions.toggleTodo(todo)} />
        {this.state.editing ? (
          <TextInput value={todo.text} onSave={this.handleSave} />
        ) : (
          <span onDoubleClick={this.handleEdit}>{ todo.text }</span>
        )}
        <button onClick={() => { actions.deleteTodo(todo); }}>Remove</button>
        {todo.socket && todo.socket.type === 'UPDATE' && (
          <span>Updated by other user</span>
        )}
        {todo.socket && todo.socket.type === 'DELETE' && (
          <span>Removed by other user</span>
        )}
      </div>
    );
  }
}

Todo.propTypes = {
  actions: PropTypes.object.isRequired, // eslint-disable-line react/forbid-prop-types
  todo: PropTypes.object.isRequired // eslint-disable-line react/forbid-prop-types
};

export default Todo;
