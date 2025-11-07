const Todo = require("../models/todoModel");

// Show all todos
module.exports.getTodos = async (req, res) => {
  const todos = await Todo.find();
  res.render("index", { todos });
};

// Add new todo
module.exports.addTodo = async (req, res) => {
const newTodo = await Todo.create(req.body);
res.redirect('/');
};

// Delete todo
module.exports.deleteTodo = async (req, res) => {
  await Todo.findByIdAndDelete(req.params.id);
  res.redirect("/");
};
