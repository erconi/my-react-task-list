const express = require('express');
const jwt = require('jsonwebtoken');
const app = express();
app.use(express.json());

let tasks = [
    {
        "id": "123456",
        "isCompleted": false,
        "description": "Walk the dog"
    }
];

// Array of predefined users
const users = [
  { username: 'user1', password: 'password1' },
  { username: 'user2', password: 'password2' }
];

// Middleware function to validate JWT token
function authenticateToken(req, res, next) {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1];
  if (token == null) return res.sendStatus(401);

  jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, user) => {
    if (err) return res.sendStatus(403);
    req.user = user;
    next();
  });
}

app.get('/tasks', authenticateToken, (req, res) => {
  res.json(tasks);
});

app.get('/tasks/:id', authenticateToken, (req, res) => {
  const task = tasks.find(t => t.id === req.params.id);
  if (!task) return res.status(404).send('La tarea con el ID dado no fue encontrada.');
  res.json(task);
});

app.post('/tasks', authenticateToken, (req, res) => {
  const task = {
    id: tasks.length + 1,
    title: req.body.title,
    completed: false
  };
  tasks.push(task);
  res.status(201).json(task);
});

app.put('/tasks/:id', authenticateToken, (req, res) => {
  const task = tasks.find(t => t.id === req.params.id);
  if (!task) return res.status(404).send('La tarea con el ID dado no fue encontrada.');

  task.title = req.body.title;
  task.completed = req.body.completed;
  res.json(task);
});

app.delete('/tasks/:id', authenticateToken, (req, res) => {
  const task = tasks.find(t => t.id === req.params.id);
  if (!task) return res.status(404).send('La tarea con el ID dado no fue encontrada.');

  const index = tasks.indexOf(task);
  tasks.splice(index, 1);
  res.json(task);
});

app.get('/tasks/completed/:completed', authenticateToken, (req, res) => {
    const completedTasks = tasks.filter(t => t.completed === (req.params.completed === 'true'));
    res.json(completedTasks);
});

// Login route
app.post('/login', (req, res) => {
  // Authenticate user
  const user = users.find(user => user.username === req.body.username && user.password === req.body.password);
  
  if (!user) return res.status(401).send('Usuario o contraseña incorrectos.');

  // Create and send JWT token
  const accessToken = jwt.sign({ username: user.username }, process.env.ACCESS_TOKEN_SECRET);
  
  res.json({ accessToken });
});

const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`Escuchando en el puerto ${port}...`));
