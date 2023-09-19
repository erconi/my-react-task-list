import React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import Home from './components/Home';
import Tareas from './components/Tareas';
import SobreNosotros from './components/SobreNosotros';
import Menu from './components/Menu';
import { ChakraProvider, Box, Button } from "@chakra-ui/react"

const listViewRouter = require('./list-view-router');
const listEditRouter = require('./list-edit-router');

const App = () => {
  return (
    <ChakraProvider>
      <Router>
        <Menu />
        <Box borderWidth="1px" borderRadius="lg" overflow="hidden">
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
          <Button colorScheme="teal" variant="solid">
            Click me
          </Button>
        </Box>
      </Router>
    </ChakraProvider>
  );
}
export default App

