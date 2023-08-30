import React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import Home from './components/Home';
import Tareas from './components/Tareas';
import SobreNosotros from './components/SobreNosotros';
import Menu from './components/Menu';
import { ChakraProvider } from "@chakra-ui/react"

const listViewRouter = require('./list-view-router');
const listEditRouter = require('./list-edit-router');


const App = () => {
  return (
    <Router>
      <Menu />
      <Switch>
        <Route exact path="/">
          <Home />
        </Route>
        <Route path="/tareas">
          <Tareas />
        </Route>
        <Route path="/sobrenosotros">
          <SobreNosotros />
        </Route>
      </Switch>
    </Router>
  );
}

const express = require('express');
const app = express();

const tasks = [
    {
        "id": "123456",
        "isCompleted": false,
        "description": "Walk the dog"
    }
];

app.get('/tasks', (req, res) => {
    res.json(tasks);
});

app.listen(3000, () => {
    console.log('Server listening on port 3000');
});

app.use('/listar', listViewRouter);
app.use('/editar', listEditRouter);

const express = require('express');
const app = express();
app.use(express.json());

let tasks = [];

app.get('/tasks', (req, res) => {
  res.json(tasks);
});

app.get('/tasks/:id', (req, res) => {
  const task = tasks.find(t => t.id === parseInt(req.params.id));
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
  const task = tasks.find(t => t.id === parseInt(req.params.id));
  if (!task) return res.status(404).send('La tarea con el ID dado no fue encontrada.');

  task.title = req.body.title;
  task.completed = req.body.completed;
  res.json(task);
});

app.delete('/tasks/:id', (req, res) => {
  const task = tasks.find(t => t.id === parseInt(req.params.id));
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


export default App;