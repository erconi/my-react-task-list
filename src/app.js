import React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import Home from './components/Home';
import Tareas from './components/Tareas';
import SobreNosotros from './components/SobreNosotros';
import Menu from './components/Menu';
import { ChakraProvider, Button } from "@chakra-ui/react"

const listViewRouter = require('./list-view-router');
const listEditRouter = require('./list-edit-router');

const App = () => {
  return (
    <ChakraProvider>
      <Router>
        <Menu />
        <Switch>
          <Route exact path="/">
            <Home />
            <Button colorScheme="teal" size="md">
              Botón
            </Button>
          </Route>
          <Route path="/tareas">
            <Tareas />
          </Route>
          <Route path="/sobrenosotros">
            <SobreNosotros />
          </Route>
        </Switch>
      </Router>
    </ChakraProvider>
  );
}
export default App


