const express = require('express');
const mysql = require('mysql2');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();
const port = 3000;

app.use(cors());
app.use(bodyParser.json());

const db = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: '', // Add your password here
  database: 'time_clock_db'
});

db.connect(err => {
  if (err) {
    console.error('Error connecting to the database:', err);
    return;
  }
  console.log('Connected to the MySQL database.');
});

app.get('/api/employees', (req, res) => {
  db.query('SELECT * FROM employees', (err, results) => {
    if (err) {
      res.status(500).send(err);
    } else {
      res.json(results);
    }
  });
});

app.post('/api/clock-in', (req, res) => {
  const { pin } = req.body;
  db.query('SELECT * FROM employees WHERE pin = ?', [pin], (err, results) => {
    if (err) {
      res.status(500).send(err);
    } else if (results.length > 0) {
      const employee = results[0];
      const currentTime = new Date();
      db.query(
        'UPDATE employees SET hours_worked = hours_worked + 1 WHERE id = ?',
        [employee.id],
        err => {
          if (err) {
            res.status(500).send(err);
          } else {
            res.json({ message: `Clocked in successfully at ${currentTime}.` });
          }
        }
      );
    } else {
      res.status(404).send('Employee not found.');
    }
  });
});

app.post('/api/employees', (req, res) => {
  const { name, pin, hourly_wage } = req.body;
  db.query(
    'INSERT INTO employees (name, pin, hourly_wage) VALUES (?, ?, ?)',
    [name, pin, hourly_wage],
    err => {
      if (err) {
        res.status(500).send(err);
      } else {
        res.json({ message: 'Employee added successfully.' });
      }
    }
  );
});

app.delete('/api/employees/:id', (req, res) => {
  const { id } = req.params;
  db.query('DELETE FROM employees WHERE id = ?', [id], err => {
    if (err) {
      res.status(500).send(err);
    } else {
      res.json({ message: 'Employee removed successfully.' });
    }
  });
});

app.put('/api/employees/:id/pin', (req, res) => {
  const { id } = req.params;
  const { pin } = req.body;
  db.query('UPDATE employees SET pin = ? WHERE id = ?', [pin, id], err => {
    if (err) {
      res.status(500).send(err);
    } else {
      res.json({ message: 'PIN updated successfully.' });
    }
  });
});

app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});
