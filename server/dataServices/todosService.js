import db from './DB.js'

// export async function getTodosByUserId(userId) {
//   const [rows] = await db.execute('SELECT * FROM Todos WHERE user_id = ?', [userId]);
//   return rows;
// }

// export async function getTodosByUserId(userId, filters = {}) {
//   let query = 'SELECT * FROM Todos WHERE user_id = ?';
//   const params = [userId];

//   if ('completed' in filters) {
//     query += ' AND completed = ?';
//     params.push(filters.completed);
//   }

//   if ('title' in filters) {
//     query += ' AND title LIKE ?';
//     params.push(`%${filters.title}%`);
//   }

//   const [rows] = await db.query(query, params);
//   return rows;
// }

export async function getTodosByUserId(userId, filters = {}) {
  try {
    let query = 'SELECT * FROM Todos WHERE user_id = ?';
    const params = [userId];

    if ('completed' in filters) {
      query += ' AND completed = ?';
      params.push(filters.completed);
    }

    if ('title' in filters) {
      query += ' AND title LIKE ?';
      params.push(`%${filters.title}%`);
    }

    if ('id' in filters) {
      console.log('id');
      query += ' AND id = ?';
      params.push(Number(filters.id));
    }

    console.log('Final SQL:', query);
    console.log('Params:', params);

    const [rows] = await db.query(query, params);
    return rows;
  } catch (err) {
    console.error('🔥 Error in getTodosByUserId:', err);
    throw err;
  }
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

