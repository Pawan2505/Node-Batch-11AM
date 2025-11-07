const express = require("express");
const todoController = require("../controllers/todoController");
const router = express.Router();

router.get("/", todoController.getTodos);
router.post("/add", todoController.addTodo);
router.post("/delete/:id", todoController.deleteTodo);

module.exports = router;
