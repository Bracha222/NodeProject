import db from './DB.js';
import bcrypt from 'bcrypt';
export const savePassword = async (user_id,password) => {
    
    try {
    const [result] = await db.query(
    'INSERT INTO passwords (user_id,password) VALUES (?,?)',
    [user_id,password]
    );
    
    return result.insertId;
    } catch (error) {
     throw new Error('Error adding password');
    }
    
    };
    export const checkPassword = async (id, password) => {
        try {
          const [rows] = await db.query(
            'SELECT password FROM Passwords WHERE user_id = ?',
            [id]
          );
      
          if (rows.length === 0) {
            throw new Error('No password found for this user');
          }
      
          const hashedPassword = rows[0].password;
          const match = await bcrypt.compare(password, hashedPassword);
          return match;
        } catch (error) {
          throw new Error('Error checking password');
        }
      };