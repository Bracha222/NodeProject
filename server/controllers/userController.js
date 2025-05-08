import { addUser as addUserService, getUserByUserEmail } from '../dataServices/userService.js';
import { savePassword, checkPassword} from '../dataServices/passwordService.js';
import bcrypt from 'bcrypt';

const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const phoneRegex = /^0[2-9]\d{7,8}$/; // לדוגמה: פורמט ישראלי

export async function loginUser(req, res) {
    const { email, password } = req.body;

    if (!email || !password) {
        return res.status(400).json({ message: 'Missing user_name or password' });
    }

    try {
        // שלב 1: שליפת המשתמש לפי user_name
        const user = await getUserByUserEmail(email);
        if (!user) {
            return res.status(401).json({ message: 'User not found' });
        }

        // שלב 2: בדיקת סיסמה
        const isValid = await checkPassword(user.id, password);
        if (!isValid) {
            return res.status(401).json({ message: 'Incorrect password' });
        }

        // שלב 3: הצלחה
        res.json({ success: true, user });

    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

export async function addUser(req, res) {
    console.log('body recieved:', req.body);
    const { user_name, phone_number, email, password } = req.body;

    // ולידציה בסיסית
    if (!user_name || !phone_number || !email || !password) {
        return res.status(400).json({ message: 'Missing required fields' });
    }

    if (user_name.length < 2 || user_name.length > 50) {
        return res.status(400).json({ message: 'User name must be between 2 and 50 characters' });
    }

    if (!emailRegex.test(email)) {
        return res.status(400).json({ message: 'Invalid email format' });
    }

    if (!phoneRegex.test(phone_number)) {
        return res.status(400).json({ message: 'Invalid phone number format' });
    }

    if (password.length < 8) {
        return res.status(400).json({ message: 'Password must be at least 8 characters long' });
    }

    try {
        // שלב 1: הוספת משתמש
        const userId = await addUserService({ user_name, phone_number, email });

        // שלב 2: הצפנת הסיסמה
        const hashedPassword = await bcrypt.hash(password, 10);

        // שלב 3: שמירת הסיסמה בטבלה המתאימה
        await savePassword(userId, hashedPassword);

        res.status(201).json({ message: 'User created successfully', userId });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
}
