"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const { authenticateJwt, SECRET } = require("../middleware/index");
const { Todo } = require("../db");
const router = express_1.default.Router();
router.post("/todos", authenticateJwt, (req, res) => {
    const { title, description } = req.body;
    const done = false;
    const userId = req.userId;
    const newTodo = new Todo({ title, description, done, userId });
    newTodo
        .save()
        .then((savedTodo) => {
        res.status(201).json(savedTodo);
    })
        .catch((err) => {
        res.status(500).json({ error: "Failed to create a new todo" });
    });
});
router.get("/todos", authenticateJwt, (req, res) => {
    const userId = req.userId;
    Todo.find({ userId })
        .then((todos) => {
        res.json(todos);
    })
        .catch((err) => {
        res.status(500).json({ error: "Failed to retrieve todos" });
    });
});
router.patch("/todos/:todoId/done", authenticateJwt, (req, res) => {
    const { todoId } = req.params;
    const userId = req.userId;
    Todo.findOneAndUpdate({ _id: todoId, userId }, { done: true }, { new: true })
        .then((updatedTodo) => {
        if (!updatedTodo) {
            return res.status(404).json({ error: "Todo not found" });
        }
        res.json(updatedTodo);
    })
        .catch((err) => {
        res.status(500).json({ error: "Failed to update todo" });
    });
});
module.exports = router;
