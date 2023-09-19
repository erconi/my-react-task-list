const express = require('express');
const router = express.Router();
const app = express();
app.use(express.json());

let tareas = [
  { id: 1, nombre: 'Tarea 1', completa: true },
  { id: 2, nombre: 'Tarea 2', completa: false }
];

router.post('/crear', (req, res) => {
  const nuevaTarea = req.body;
  tareas.push(nuevaTarea);
  res.send(tareas);
});

router.delete('/eliminar/:id', (req, res) => {
  const id = Number(req.params.id);
  tareas = tareas.filter(tarea => tarea.id !== id);
  res.send(tareas);
});

router.put('/actualizar/:id', (req, res) => {
  const id = Number(req.params.id);
  const updatedTask = req.body;
  
  tareas = tareas.map(tarea => tarea.id === id ? updatedTask : tarea);
  
  res.send(tareas);
});

// Middleware para validar solicitudes POST y PUT
function validateTask(req, res, next) {
  if (req.method === 'POST' || req.method === 'PUT') {
    if (!req.body.nombre || req.body.completa === undefined) {
      return res.status(400).send('La solicitud debe contener un nombre y un estado de completitud.');
    }
  }
  next();
}

app.use(validateTask);
app.use('/tareas', router);

const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`Escuchando en el puerto ${port}...`));
