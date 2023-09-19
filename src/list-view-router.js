const express = require('express');
const router = express.Router();
const app = express();
app.use(express.json());

let tareas = [
  { id: 1, nombre: 'Tarea 1', completa: true },
  { id: 2, nombre: 'Tarea 2', completa: false },
  { id: 3, nombre: 'Tarea 3', completa: true },
  { id: 4, nombre: 'Tarea 4', completa: false }
];

router.get('/completas', (req, res) => {
  const tareasCompletas = tareas.filter(tarea => tarea.completa);
  res.send(tareasCompletas);
});

router.get('/incompletas', (req, res) => {
  const tareasIncompletas = tareas.filter(tarea => !tarea.completa);
  res.send(tareasIncompletas);
});

// Middleware para validar parámetros
function validateParams(req, res, next) {
  if (req.params.id && isNaN(parseInt(req.params.id))) {
    return res.status(400).send('El ID de la tarea debe ser un número.');
  }
  next();
}

router.use(validateParams);

app.use('/tareas', router);

const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`Escuchando en el puerto ${port}...`));

module.exports = router;

