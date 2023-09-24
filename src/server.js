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

const users = [
  { username: 'user1', password: 'password1' },
  { username: 'user2', password: 'password2' }
];

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

app.post('/tasks', authenticateToken, async (req, res) => {
  try {
    const task = {
      id: tasks.length + 1,
      title: req.body.title,
      completed: false
    };
    tasks.push(task);
    if (tasks.includes(task)) {
      await res.status(201).json(task);
      console.log("Tarea creada exitosamente");
    } else {
      throw new Error('La tarea no pudo ser creada');
    }
  } catch (error) {
    console.error(error);
  }
});

// Crea una ruta PUT para actualizar una tarea existente por su id, usando el middleware de autenticación
app.put('/tasks/:id', authenticateToken, async (req, res) => {
  try {
    const task = tasks.find(t => t.id === req.params.id);
    if (!task) return res.status(404).send('La tarea con el ID dado no fue encontrada.');

    task.title = req.body.title;
    task.completed = req.body.completed;
    if (task.title === req.body.title && task.completed === req.body.completed) {
      await res.json(task);
      console.log("Tarea actualizada exitosamente");
    } else {
      throw new Error('La tarea no pudo ser actualizada');
    }
  } catch (error) {
    console.error(error);
  }
});

// Crea una ruta DELETE para eliminar una tarea existente por su id, usando el middleware de autenticación
app.delete('/tasks/:id', authenticateToken, async (req, res) => {
  try {
    const task = tasks.find(t => t.id === req.params.id);
    if (!task) return res.status(404).send('La tarea con el ID dado no fue encontrada.');

    const index = tasks.indexOf(task);
    tasks.splice(index, 1);
    if (!tasks.includes(task)) {
      await res.json(task);
      console.log("Tarea eliminada exitosamente");
    } else {
      throw new Error('La tarea no pudo ser eliminada');
    }
  } catch (error) {
    console.error(error);
  }
});

app.get('/tasks/completed/:completed', authenticateToken, (req, res) => {
    const completedTasks = tasks.filter(t => t.completed === (req.params.completed === 'true'));
    res.json(completedTasks);
});

app.post('/login', async (req, res) => {
  try {
    const user = users.find(user => user.username === req.body.username && user.password === req.body.password);

    if (!user) return res.status(401).send('Usuario o contraseña incorrectos.');

    const accessToken = jwt.sign({ username: user.username }, process.env.ACCESS_TOKEN_SECRET);

    await res.json({ accessToken });
    
    console.log("Usuario autenticado exitosamente");
    
  } catch (error) {
    
     console.error(error);
     
   }
});

const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`Escuchando en el puerto ${port}...`));

async function miFuncion() {
  try {
    const resultado = await miPromesa();
    console.log(resultado);
  } catch (error) {
    console.error(error);
  }
}

miFuncion();
