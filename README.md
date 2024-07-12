# Time Clock Backend

This repository uses [Node.js](https://nodejs.org/en) and [MySQL](https://dev.mysql.com/downloads/installer/) to serve as the backend for my [Employee Time Clock](https://github.com/Blake-Herbert/Employee-Time-Clock) and [Manager App](https://github.com/Blake-Herbert/Manager-App).

## Database Setup

Once you have MySQL installed, run these commands to create the Time Clock's database of employees:
```
CREATE DATABASE time_clock_db;
USE time_clock_db;

CREATE TABLE employees (
  id INT AUTO_INCREMENT PRIMARY KEY,
  name VARCHAR(100) NOT NULL,
  pin INT NOT NULL,
  hourly_wage DECIMAL(10, 2) NOT NULL,
  hours_worked DECIMAL(10, 2) DEFAULT 0
);
```


## Project setup

Run this command in terminal to start the backend app.
```
node index.js
```
