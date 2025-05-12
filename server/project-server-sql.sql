create database IF NOT EXISTS project_server;
use project_server;

CREATE TABLE IF NOT EXISTS Users (
    id INT AUTO_INCREMENT PRIMARY KEY,
    user_name VARCHAR(100) NOT NULL,
    phone_number VARCHAR(15),
    email VARCHAR(100)
);

CREATE TABLE IF NOT EXISTS Passwords (
    user_id INT PRIMARY KEY,
    password VARCHAR(255) NOT NULL,
    FOREIGN KEY (user_id) REFERENCES Users(id)
);

CREATE TABLE IF NOT EXISTS Posts (
    id INT AUTO_INCREMENT PRIMARY KEY,
    user_id INT NOT NULL,
    title VARCHAR(255) NOT NULL,
    body TEXT,
    FOREIGN KEY (user_id) REFERENCES Users(id)
);

CREATE TABLE IF NOT EXISTS Comments (
    id INT AUTO_INCREMENT PRIMARY KEY,
    post_id INT NOT NULL,
    name VARCHAR(255) NOT NULL,
    email VARCHAR(100),
    body TEXT,
    FOREIGN KEY (post_id) REFERENCES Posts(id)
);

CREATE TABLE IF NOT EXISTS Todos (
    id INT AUTO_INCREMENT PRIMARY KEY,
    user_id INT NOT NULL,
    title VARCHAR(100),
    completed BOOLEAN default false,
    FOREIGN KEY (user_id) REFERENCES Posts(id)
);

INSERT INTO Users (user_name, phone_number, email) VALUES
('Avigayil Resnick', '0501234567', 'avigayil@example.com'),
('Rina Cohen', '0527654321', 'rina@example.com'),
('David Levi', '0549876543', 'david@example.com'),
('Noa Bar', '0533344556', 'noa@example.com'),
('Eli Golan', '0511122233', 'eli@example.com'),
('Shira Azulay', '0556677889', 'shira@example.com');

INSERT INTO Passwords (user_id, password) VALUES
(1, '$2b$10$dJ3P9blb51Nf4ZtL2pyJLeRHbgNwe3edPaxPpAlpbLEmbu59Ku2mG'), -- avi12345
(2, '$2b$10$uUC8dMy9A5Peo6IE/fyc7uORVQPKxZnrfckJynm9e6bM9h1BRdNre'), -- rina2024
(3, '$2b$10$RxuYIfWFL69bn0RUKuxSOeU/R3E/qePPH0mV8HwAKzhhIEhNdxJu6'), -- david321
(4, '$2b$10$.Wz5WaN5IGTNYNldidFoUulxdTczvGEWciCwdAIrm6xB/PGDnJIzO'), -- noa12345
(5, '$2b$10$yffHzkrlC6bzVFMPLD5/veGpFy9ViB6ohB21eBuGv4ik9YPRAyDPW'), -- eli78910
(6, '$2b$10$BHO7cZJGRWg.DYywaH5fhuNStvEx3BkRge7oFAIcNJYthrb0fpq1C'); -- shira88!

INSERT INTO Posts (user_id, title, body) VALUES
(1, 'Welcome to My Page', 'Thanks for visiting. I’ll be sharing thoughts soon!'),
(2, 'Exciting News!', 'I just got accepted to my dream job!'),
(3, 'Life Hack', 'Here’s how I organize my week efficiently...'),
(4, 'Coding Journey', 'Today I solved my first bug solo. Felt amazing!'),
(5, 'Recipe Corner', 'Sharing my best shakshuka recipe ever.'),
(6, 'Book Review', 'Just finished "Atomic Habits" – a must-read!');

INSERT INTO Comments (post_id, name, email, body) VALUES
-- Comments for post_id 1
(1, 'Rina', 'rina@example.com', 'איזה פוסט כיף! מחכה להמשך'),
(1, 'David', 'david@example.com', 'ממש התחברתי למילים שלך'),
(1, 'Shira', 'shira@example.com', 'שיתוף מקסים'),

-- Comments for post_id 2
(2, 'Avigayil', 'avigayil@example.com', 'כל הכבוד! בשורות טובות'),
(2, 'Noa', 'noa@example.com', 'את אלופה! ממש מרגש'),
(2, 'Eli', 'eli@example.com', 'תמשיכי להפיץ טוב'),

-- Comments for post_id 3
(3, 'Shira', 'shira@example.com', 'טיפ מעולה, תודה!'),
(3, 'Rina', 'rina@example.com', 'התחלתי ליישם וזה עובד'),
(3, 'David', 'david@example.com', 'שיטה חכמה מאוד'),

-- Comments for post_id 4
(4, 'Eli', 'eli@example.com', 'מזדהה לגמרי, גם לי זה קרה'),
(4, 'Avigayil', 'avigayil@example.com', 'כל הכבוד על ההתמדה'),
(4, 'Noa', 'noa@example.com', 'מרגש מאוד'),

-- Comments for post_id 5
(5, 'David', 'david@example.com', 'אוהב מתכונים – הולך לנסות'),
(5, 'Rina', 'rina@example.com', 'שמעתי שהשקשוקה שלך אגדה 😉'),
(5, 'Eli', 'eli@example.com', 'הוספתי לפייבוריטס'),

-- Comments for post_id 6
(6, 'Noa', 'noa@example.com', 'גם אני אהבתי את הספר הזה!'),
(6, 'Shira', 'shira@example.com', 'קראת גם את הספר השני שלו?'),
(6, 'Avigayil', 'avigayil@example.com', 'תודה על ההמלצה!');

INSERT INTO Todos (user_id, title, completed) VALUES
(1, 'Finish React homework', false),
(1, 'Send project to mentor', true),
(2, 'Write weekly blog post', false),
(3, 'Grocery shopping', true),
(4, 'Refactor the backend API', false),
(5, 'Read a chapter of a book', true),
(6, 'Prepare for group meeting', false);

