// list-edit-router.js
const express = require('express');
const router = express.Router();

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

module.exports = router;
