const Todo = require('../models/todos');

exports.getAllTodos = (req, res) => {
    Todo.getAllTodos((err, results) => {
        if (err) return res.status(500).json({ error: err });
        res.status(200).json(results);
    });
}

exports.createTodo = (req, res) => {
    const { title, description, due_date } = req.body;
    Todo.createTodo(title, description, due_date, (err, results) => {
        if (err) return res.status(500).json({ error: err });
        res.status(201).json({ message: 'Todo created successfully' });
    });
}

exports.updateTodo = (req, res) => {
    const { id } = req.params;
    const { title, description, due_date, completed } = req.body;
    Todo.updateTodo(id, title, description, due_date, completed, (err, results) => {
        if (err) return res.status(500).json({ error: err });
        res.status(200).json({ message: 'Todo updated successfully' });
    });
}

exports.deleteTodo = (req, res) => {
    const { id } = req.params;
    Todo.deleteTodo(id, (err, results) => {
        if (err) return res.status(500).json({ error: err });
        res.status(200).json({ message: 'Todo deleted successfully' });
    });
}