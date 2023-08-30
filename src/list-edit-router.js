// list-edit-router.js
const express = require('express');
const router = express.Router();
const express = require('express');
const app = express();
app.use(express.json());

router.post('/crear', (req, res) => {
    let tareas = [
  { nombre: 'Tarea 1', completa: true },
  { nombre: 'Tarea 2', completa: false }
];

function crearTarea(nombre, completa) {
  const nuevaTarea = { nombre, completa };
  tareas.push(nuevaTarea);
}

crearTarea('Tarea 3', false);
console.log(tareas);

    
});

router.delete('/eliminar/:id', (req, res) => {
    let tareas = [
  { id: 1, nombre: 'Tarea 1', completa: true },
  { id: 2, nombre: 'Tarea 2', completa: false }
];

function eliminarTarea(id) {
  tareas = tareas.filter(tarea => tarea.id !== id);
}

eliminarTarea(2);
console.log(tareas);


});

router.put('/actualizar/:id', (req, res) => {
    let tareas = [
  { id: 1, nombre: 'Tarea 1', completa: true },
  { id: 2, nombre: 'Tarea 2', completa: false }
];

function eliminarTarea(id) {
  tareas = tareas.filter(tarea => tarea.id !== id);
}

eliminarTarea(2);
console.log(tareas);

  
});



// Middleware para validar solicitudes POST y PUT
function validateTask(req, res, next) {
  if (req.method === 'POST' || req.method === 'PUT') {
    if (!req.body.title || !req.body.completed) {
      return res.status(400).send('La solicitud debe contener un título y un estado de completitud.');
    }
  }
  next();
}

// Middleware para validar métodos HTTP
function validateMethod(req, res, next) {
  const validMethods = ['GET', 'POST', 'PUT', 'DELETE'];
  if (!validMethods.includes(req.method)) {
    return res.status(400).send('Método HTTP no válido.');
  }
  next();
}

const listEditRouter = express.Router();
listEditRouter.use(validateTask);

app.use(validateMethod);
app.use('/list-edit', listEditRouter);

// Aquí puedes definir tus rutas para manejar las tareas

const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`Escuchando en el puerto ${port}...`));


module.exports = router;
