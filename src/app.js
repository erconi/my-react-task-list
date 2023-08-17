import React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import Home from './components/Home';
import Tareas from './components/Tareas';
import SobreNosotros from './components/SobreNosotros';
import Menu from './components/Menu';
import { ChakraProvider } from "@chakra-ui/react"


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

export default App;
