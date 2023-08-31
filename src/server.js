const express = require('express');
const app = express();
app.use(express.json());

let tasks = [
    {
        "id": "123456",
        "isCompleted": false,
        "description": "Walk the dog"
    }
];

app.get('/tasks', (req, res) => {
  res.json(tasks);
});

app.get('/tasks/:id', (req, res) => {
  const task = tasks.find(t => t.id === req.params.id);
  if (!task) return res.status(404).send('La tarea con el ID dado no fue encontrada.');
  res.json(task);
});

app.post('/tasks', (req, res) => {
  const task = {
    id: tasks.length + 1,
    title: req.body.title,
    completed: false
  };
  tasks.push(task);
  res.status(201).json(task);
});

app.put('/tasks/:id', (req, res) => {
  const task = tasks.find(t => t.id === req.params.id);
  if (!task) return res.status(404).send('La tarea con el ID dado no fue encontrada.');

  task.title = req.body.title;
  task.completed = req.body.completed;
  res.json(task);
});

app.delete('/tasks/:id', (req, res) => {
  const task = tasks.find(t => t.id === req.params.id);
  if (!task) return res.status(404).send('La tarea con el ID dado no fue encontrada.');

  const index = tasks.indexOf(task);
  tasks.splice(index, 1);
  res.json(task);
});

app.get('/tasks/completed/:completed', (req, res) => {
    const completedTasks = tasks.filter(t => t.completed === (req.params.completed === 'true'));
    res.json(completedTasks);
});

const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`Escuchando en el puerto ${port}...`));