import {
  getTodosByUserId,
  createTodo as createTodoService,
  updateTodo as updateTodoService,
  deleteTodo as deleteTodoService
} from '../dataServices/todosService.js';

// export async function getTodosByUser(req, res) {
//   const todos = await getTodosByUserId(req.params.userId);
//   res.json(todos);
// }
// export async function getTodosByUser(req, res) {
//   const userId = req.params.userId;

//   const { completed, title } = req.query;

//   const filters = {};
//  if (completed !== undefined) filters.completed = completed === 'true' ? 1 : 0;
//  if (title) filters.title = title;
// console.log('userId:', userId);
// console.log('filters:', filters);

//   const todos = await getTodosByUserId(userId, filters);
//   res.json(todos);
// }
export async function getTodosByUser(req, res) {
  try {
      console.log("📍 נכנסנו לפונקציה getTodosByUserId");
    const userId = Number(req.params.userId);
    const { completed, title,id } = req.query;

    const filters = {};
    if (completed !== undefined) filters.completed = completed === 'true' ? 1 : 0;
    if (title) filters.title = title;
    if(id) filters.id=id;

    console.log('userId:', userId);
    console.log('filters:', filters);

    const todos = await getTodosByUserId(userId, filters);
    res.json(todos);
  } catch (err) {
    console.error('🔥 Error in getTodosByUser:', err);
    res.status(500).json({ error: 'Internal Server Error' });
  }
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