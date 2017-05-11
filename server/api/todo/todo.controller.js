import Todo from './todo.model';

export const index = (req, res, next) => {
  Todo.find({}, (error, todos) => {
    if (error) {
      return next(error);
    }
    return res.status(200).json(todos);
  });
};

export const create = io => (req, res, next) => {
  const todo = new Todo(req.body);
  todo.save((error) => {
    if (error) {
      return next(error);
    }
    io.of(req.user.board).emit('todo:save', { from: req.user._id, data: todo });
    return res.status(201).json(todo);
  });
};

export const update = io => (req, res, next) => {
  Todo.findById(req.params.id, (error, todo) => {
    if (error) {
      return next(error);
    }
    if (!todo) {
      return res.send(404);
    }
    const updatedTodo = Object.assign(todo, req.body);
    return updatedTodo.save((saveError) => {
      if (saveError) {
        return next(saveError);
      }
      io.of(req.user.board).emit('todo:save', { from: req.user._id, data: updatedTodo });
      return res.status(200).json(updatedTodo);
    });
  });
};

export const destroy = io => (req, res, next) => {
  Todo.findByIdAndRemove(req.params.id, (error, removedTodo) => {
    if (error) {
      return next(error);
    }
    io.of(req.user.board).emit('todo:remove', { from: req.user._id, data: removedTodo });
    return res.send(204);
  });
};
