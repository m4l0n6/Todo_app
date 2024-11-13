const db = require('../configs/database');

const Todo = {
    getAllTodos: (callback) => {
        db.query('SELECT * FROM todos', callback)
    },
    createTodo: (title, description, due_date, callback) => {
        db.query('INSERT INTO todos (title, description, due_date) VALUES (?, ?, ?)', [title, description, due_date], callback);
    },
    updateTodo: (id, title, description, due_date, completed, callback) => {
        db.query('UPDATE todos SET title = ?, description = ?, due_date = ?, completed = ? WHERE id = ?', [title, description, due_date, completed, id], callback);
    },
    deleteTodo: (id, callback) => {
        db.query('DELETE FROM todos WHERE id = ?', [id], callback);
    }
}

module.exports = Todo;