import db from './DB.js'

export async function getAllPosts() {
  const [rows] = await db.execute('SELECT * FROM Posts');
  return rows;
}

export async function getPostById(id) {
  const [rows] = await db.execute('SELECT * FROM Posts WHERE id = ?', [id]);
  return rows[0];
}

export async function getPostsByUserId(userId) {
  const [rows] = await db.execute('SELECT * FROM Posts WHERE user_id = ?', [userId]);
  return rows;
}

export async function createPost(post) {
  const { user_id, title, body } = post;
  const [result] = await db.execute(
    'INSERT INTO Posts (user_id, title, body) VALUES (?, ?, ?)',
    [user_id, title, body]
  );
  return result.insertId;
}

export async function updatePost(id, post) {
  const { title, body } = post;
  await db.execute('UPDATE Posts SET title = ?, body = ? WHERE id = ?', [title, body, id]);
}

export async function deletePost(id) {
  await db.execute('DELETE FROM Posts WHERE id = ?', [id]);
}

