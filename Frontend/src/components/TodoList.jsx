import React from "react";
import TodoItem from "./TodoItem";
import { format } from 'date-fns'

const TodoList = ({todos, deleteTodo, editTodo, checkedTodo}) => {
    return (
        <div className="w-full h-full px-6 pb-6">
            {todos.length == 0 ? (<p className="text-center text-2xl text-gray-500">Nothing task in here</p>)
            : (todos
                .sort((todo) => todo.completed === 1 ? 1 : -1)
                .map((todo, index) => (
                <TodoItem 
                    key={index} 
                    id={todo.id}
                    title={todo.title}
                    description={todo.description}
                    due_date={todo.due_date}
                    completed={todo.completed}
                    delete={deleteTodo}
                    edit={editTodo}
                    checked={checkedTodo}
                />
            )))}
        </div>
    )
}

export default TodoList;