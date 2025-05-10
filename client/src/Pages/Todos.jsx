import { useState, useEffect } from "react";
import { useParams } from 'react-router-dom';
import { getData, addData, updateData, deleteData } from "../api/api";
import TodoItem from '../Components/TodoItem';
import "../Css/Todo.css";
import "../Css/Home.css";

export default function Todos() {
    const { userId } = useParams();
    const [todos, setTodos] = useState([]);
    const [filteredTodos, setFilteredTodos] = useState([]);
    const [isAddVisible, setIsAddVisible] = useState(false);
    const [newTodoTitle, setNewTodoTitle] = useState('');
    const [searchCriteria, setSearchCriteria] = useState('title');
    const [searchValue, setSearchValue] = useState('');

    const fetchTodos = async () => {
        const data = await getData(`todos/user/${userId}`);
        setTodos(data);
        setFilteredTodos(data);
    };

    useEffect(() => {
        fetchTodos();
    }, []);

    const addToDo = async () => {
        const newTodo = {
            user_id: userId,
            title: newTodoTitle,
            completed: false,
        };
        await addData("todos/create", newTodo);
        setNewTodoTitle("");
        fetchTodos();
    };

    const handleDeleteTodo = async (id) => {
        await deleteData(`todos/delete/${id}`);
        fetchTodos();
    };

    const handleUpdate = async (todo) => {
        if (!todo || typeof todo !== 'object' || !('id' in todo)) {
            console.error("Invalid todo object passed to update:", todo);
            return;
        }

        const { id, title, completed } = todo;

        await updateData(`todos/update/${id}`, {
            title,
            completed
        });

        fetchTodos();
    };

    const handleVisibility = () => {
        setIsAddVisible(!isAddVisible);
    };

    const handleSortChange = (e) => {
        sortTodos(e.target.value);
    };

    const handleSearchChange = (e) => {
        setSearchValue(e.target.value);
        filterTodos(e.target.value, searchCriteria);
    };

    const sortTodos = (criteria) => {
        let sorted = [...filteredTodos];
        if (criteria === 'id') {
            sorted.sort((a, b) => a.id - b.id);
        } else if (criteria === 'title') {
            sorted.sort((a, b) => a.title.localeCompare(b.title));
        } else if (criteria === 'completed') {
            sorted.sort((a, b) => a.completed - b.completed);
        } else if (criteria === 'random') {
            sorted.sort(() => Math.random() - 0.5);
        }
        setFilteredTodos(sorted);
    };

    const filterTodos = (value, criteria) => {
        const filtered = todos.filter((todo) => {
            if (criteria === 'id') {
                return todo.id.toString().includes(value);
            } else if (criteria === 'title') {
                return todo.title.toLowerCase().includes(value.toLowerCase());
            } else if (criteria === 'completed') {
                return todo.completed.toString().includes(value.toLowerCase());
            }
            return false;
        });

        setFilteredTodos(filtered);
        if (filtered.length === 0) {
            alert("No results matching your search");
        }
    };

    return (
        <>
            {todos.length === 0 ? (
                <h1>No todos yet...</h1>
            ) : (
                <div>
                    <h1>Todo List</h1>
                    <div>
                        <label>Sort By:</label>
                        <select onChange={handleSortChange}>
                            <option value="id">ID</option>
                            <option value="title">Title</option>
                            <option value="completed">Completion Status</option>
                            <option value="random">Random</option>
                        </select>
                        <label>Search By:</label>
                        <select onChange={(e) => setSearchCriteria(e.target.value)}>
                            <option value="id">ID</option>
                            <option value="title">Title</option>
                            <option value="completed">Completion Status</option>
                        </select>
                        <input
                            type="text"
                            value={searchValue}
                            onChange={handleSearchChange}
                            placeholder="Search..."
                        />
                    </div>
                </div>
            )}

            <button onClick={handleVisibility}>Add Todo</button>

            <div className="todo-container">
                {filteredTodos.map((todo) => (
                    <TodoItem
                        key={todo.id}
                        todo={todo}
                        onDelete={handleDeleteTodo}
                        onUpdate={handleUpdate}
                    />
                ))}
            </div>

            {isAddVisible && (
                <div className="popup">
                    <div className="popup-content">
                        <input
                            type="text"
                            placeholder="Task title"
                            value={newTodoTitle}
                            onChange={(e) => setNewTodoTitle(e.target.value)}
                        />
                        <button
                            type="button"
                            onClick={() => {
                                addToDo();
                                handleVisibility();
                            }}
                        >
                            OK
                        </button>
                        <button onClick={handleVisibility}>Cancel</button>
                    </div>
                </div>
            )}
        </>
    );
}
