import db from './DB.js';
export const addUser = async (user) => {
    const { user_name, email,phone_number } = user;
    
    try {
    const [result] = await db.query(
    'INSERT INTO users (user_name, email, phone_number) VALUES ( ?, ?, ?)',
    [user_name, email, phone_number]
    );
    
    return result.insertId;
    } catch (error) {
     throw new Error('Error adding data');
    }
    
    };

    export const getUserByUserEmail = async (email) => {
        try {
          const [rows] = await db.query(
            'SELECT * FROM Users WHERE email = ?',
            [email]
          );
          return rows.length ? rows[0] : null;
        } catch (error) {
          throw new Error('Error fetching user');
        }
      };
      