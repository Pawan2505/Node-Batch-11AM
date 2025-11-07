const Todo = require("../models/todoModel");

// Show all todos
module.exports.getTodos = async (req, res) => {
  const todos = await Todo.find();
  const message = req.flash('success'); 
  res.render("index", { todos, message });
};

// Add new todo
module.exports.addTodo = async (req, res) => {
  await Todo.create(req.body);
  req.flash('success', 'Todo added successfully!');
  res.redirect('/');
};

// Delete todo
module.exports.deleteTodo = async (req, res) => {
  await Todo.findByIdAndDelete(req.params.id);
  req.flash('success', 'Todo deleted successfully!');
  res.redirect('/');
};
