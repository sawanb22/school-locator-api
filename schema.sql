-- School Distance API - MySQL schema
-- Create database and table as per assignment requirements

CREATE DATABASE IF NOT EXISTS schooldb;
USE schooldb;

-- Drop existing table for idempotent setup (optional)
-- DROP TABLE IF EXISTS schools;

CREATE TABLE IF NOT EXISTS schools (
  id INT AUTO_INCREMENT PRIMARY KEY,
  name VARCHAR(255) NOT NULL,
  address VARCHAR(255) NOT NULL,
  latitude FLOAT NOT NULL,
  longitude FLOAT NOT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
