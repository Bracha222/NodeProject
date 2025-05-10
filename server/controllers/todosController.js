import {
  getTodosByUserId,
  createTodo as createTodoService,
  updateTodo as updateTodoService,
  deleteTodo as deleteTodoService
} from '../dataServices/todosService.js';

export async function getTodosByUser(req, res) {
  const todos = await getTodosByUserId(req.params.userId);
  res.json(todos);
}

export async function createTodo(req, res) {
  const id = await createTodoService(req.body);
  res.status(201).json({ id });
}

export async function updateTodo(req, res) {
  await updateTodoService(req.params.id, req.body);
  res.status(200).json({ success: true });
}

export async function deleteTodo(req, res) {
  await deleteTodoService(req.params.id);
  res.status(200).json({ success: true });
}