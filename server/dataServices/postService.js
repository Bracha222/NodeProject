import db from './DB.js'

// export async function getAllPosts() {
//   console.log("im here");
//   const [rows] = await db.execute('SELECT * FROM Posts');
//   return rows;
// }

export async function getAllPosts(searchCriteria, searchValue) {
    
    let query = 'SELECT * FROM Posts';
    let params = [];

    if (searchCriteria && searchValue) {
        if (searchCriteria === 'title') {
            query += ' WHERE title LIKE ?';
            params.push(`%${searchValue}%`);
        } else if (searchCriteria === 'id') {
            query += ' WHERE id = ?';
            params.push(searchValue);
        }
    }

    try {
        const [rows] = await db.execute(query, params);
        return rows;
    } catch (err) {
        console.error('Error executing query:', err);
        throw err;
    }
}

//     const [rows] = await db.execute(query, params);
//     return rows;
// }

export async function getPostById(id) {
  const [rows] = await db.execute('SELECT * FROM Posts WHERE id = ?', [id]);
  return rows[0];
}



export async function getPostsByUserId(userId) {
  const [rows] = await db.execute('SELECT * FROM Posts WHERE user_id = ?', [userId]);
  return rows;
}

export async function createPost(post) {
  const { userId, title, body } = post;
  const [result] = await db.execute(
    'INSERT INTO Posts (user_id, title, body) VALUES (?, ?, ?)',
    [userId, title, body]
  );
  return result.insertId;
}

export async function updatePost(id, post) {
  const { title, body } = post;
  await db.execute('UPDATE Posts SET title = ?, body = ? WHERE id = ?', [title, body, id]);
}

export async function deletePostWithComments(postId) {
  await db.execute('DELETE FROM comments WHERE post_id = ?', [postId]);
  await db.execute('DELETE FROM Posts WHERE id = ?', [postId]);
}




