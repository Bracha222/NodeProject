import React, { useState } from "react";
import "../Css/Todo.css";

export default function TodoItem({ todo, onDelete, onUpdate }) {
    const [isEditing, setIsEditing] = useState(false);
    const [newTitle, setNewTitle] = useState(todo.title);

    const handleEditClick = () => {
        setIsEditing(true);
    };

    const handleSaveClick = () => {
        if (newTitle.trim() === "") {
            alert("Title cannot be empty!");
            return;
        }
        onUpdate({ ...todo, title: newTitle });
        setIsEditing(false);
    };

    const handleCancelClick = () => {
        setNewTitle(todo.title);
        setIsEditing(false);
    };

    const handleCheckboxChange = () => {
        onUpdate({ ...todo, completed: !todo.completed });
    };

    return (
        <div className="todo-item">
            <h3>{todo.id}</h3>
            <input
                type="checkbox"
                checked={todo.completed}
                onChange={handleCheckboxChange}
            />

            {isEditing ? (
                <>
                    <input
                        type="text"
                        value={newTitle}
                        onChange={(e) => setNewTitle(e.target.value)}
                    />
                    <button onClick={handleSaveClick}>Save</button>
                    <button onClick={handleCancelClick}>Cancel</button>
                </>
            ) : (
                <>
                    <h3 className={todo.completed ? "todo-title completed" : "todo-title"}>
                        {todo.title}
                    </h3>
                    <button onClick={handleEditClick}>Update</button>
                </>
            )}

            <button onClick={() => onDelete(todo.id, todo.userId)}>Delete</button>
        </div>
    );
}
