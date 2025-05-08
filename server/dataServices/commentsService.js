import db from './DB.js'

export async function getCommentsByPostId(postId) {
  const [rows] = await db.execute('SELECT * FROM Comments WHERE post_id = ?', [postId]);
  return rows;
}

export async function createComment(comment) {
  const { post_id, name, email, body } = comment;
  const [result] = await db.execute(
    'INSERT INTO Comments (post_id, name, email, body) VALUES (?, ?, ?, ?)',
    [post_id, name, email, body]
  );
  return result.insertId;
}

export async function updateComment(id, comment) {
  const { body: content } = comment;
  await db.execute('UPDATE Comments SET body = ? WHERE id = ?', [content, id]);
}

export async function deleteComment(id) {
  await db.execute('DELETE FROM Comments WHERE id = ?', [id]);
}

