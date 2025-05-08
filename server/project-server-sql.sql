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
    וuser_id INT NOT NULL,
    title VARCHAR(100),
    completed BOOLEAN default false,
    FOREIGN KEY (וuser_id) REFERENCES Posts(id)
);


