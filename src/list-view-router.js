// list-view-router.js
const express = require('express');
const router = express.Router();
const express = require('express');
const app = express();
app.use(express.json());

router.get('/completas', (req, res) => {
  const tareas = [
  { nombre: 'Tarea 1', completa: true },
  { nombre: 'Tarea 2', completa: false },
  { nombre: 'Tarea 3', completa: true },
  { nombre: 'Tarea 4', completa: false }
];

const tareasCompletas = tareas.filter(tarea => tarea.completa);

console.log('Tareas completas:');
tareasCompletas.forEach(tarea => console.log(tarea.nombre));

});

router.get('/incompletas', (req, res) => {
const tareas = [
  { nombre: 'Tarea 1', completa: true },
  { nombre: 'Tarea 2', completa: false },
  { nombre: 'Tarea 3', completa: true },
  { nombre: 'Tarea 4', completa: false }
];

const tareasIncompletas = tareas.filter(tarea => !tarea.completa);

console.log('Tareas incompletas:');
tareasIncompletas.forEach(tarea => console.log(tarea.nombre));


});


// Middleware para validar parámetros
function validateParams(req, res, next) {
  if (req.params.id && isNaN(parseInt(req.params.id))) {
    return res.status(400).send('El ID de la tarea debe ser un número.');
  }
  next();
}

const listViewRouter = express.Router();
listViewRouter.use(validateParams);

app.use('/list-view', listViewRouter);

// Aquí puedes definir tus rutas para manejar las tareas

const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`Escuchando en el puerto ${port}...`));


module.exports = router;
