CREATE DATABASE online_exam;
USE online_exam;

CREATE TABLE users(
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(100),
    email VARCHAR(100),
    password VARCHAR(100)
);

CREATE TABLE questions(
    id INT AUTO_INCREMENT PRIMARY KEY,
    question VARCHAR(255),
    optionA VARCHAR(100),
    optionB VARCHAR(100),
    optionC VARCHAR(100),
    optionD VARCHAR(100),
    correct VARCHAR(1),
);

CREATE TABLE results(
    id INT AUTO_INCREMENT PRIMARY KEY,
    userId INT,
    score INT
);

INSERT INTO questions
(question, optionA, optionB, optionC, optionD, correct)
VALUES
('What is JavaScript?', 'Language', 'Framework', 'Database', 'OS', 'A'),
('HTML stands for?', 'Markup Language', 'Programming', 'Styling', 'None', 'A');