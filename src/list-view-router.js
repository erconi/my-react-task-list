// list-view-router.js
const express = require('express');
const router = express.Router();

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

module.exports = router;
