import db from './DB.js'

export async function getTodosByUserId(userId) {
  const [rows] = await db.execute('SELECT * FROM Todos WHERE user_id = ?', [userId]);
  return rows;
}

export async function createTodo(todo) {
  const { user_id, title, completed } = todo;
  const [result] = await db.execute(
    'INSERT INTO Todos (user_id, title, completed) VALUES (?, ?, ?)',
    [user_id, title, completed ?? false]
  );
  return result.insertId;
}

export async function updateTodo(id, todo) {
  const { title, completed } = todo;
  await db.execute('UPDATE Todos SET title = ?, completed = ? WHERE id = ?', [title, completed, id]);
}

export async function deleteTodo(id) {
  await db.execute('DELETE FROM Todos WHERE id = ?', [id]);
}

