-- Virtual Herbal Garden - Doubt Solver Database Schema
-- Run this script in your MySQL server to set up the database and users table.

CREATE DATABASE IF NOT EXISTS doubtsolver;
USE doubtsolver;

CREATE TABLE IF NOT EXISTS users (
    id INT AUTO_INCREMENT PRIMARY KEY,
    username VARCHAR(50) NOT NULL UNIQUE,
    email VARCHAR(100) NOT NULL UNIQUE,
    password VARCHAR(255) NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
