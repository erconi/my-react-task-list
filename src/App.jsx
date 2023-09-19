import { useState } from 'react';
import './App.css';
import { TodoAdd } from './components/TodoAdd';
import { TodoList } from './components/TodoList';
import { useTodo } from './hooks/useTodo';
import TaskForm from './TaskForm';



function App() {
  const {
    todos,
    todosCount,
    pendingTodosCount,
    handleNewTodo,
    handleDeleteTodo,
    handleCompleteTodo,
    handleUpdateTodo,
  } = useTodo();

  return (
    <>
      <div className='card-to-do'>
        <h1>Lista de tareas</h1>
        <div className='counter-todos'>
          <h3>
            N° Tareas: <span>{todosCount}</span>
          </h3>
          <h3>
            Pendientes: <span>{pendingTodosCount}</span>
          </h3>
        </div>

        <div className='add-todo'>
          <h3>Agregar Tarea</h3>
          <TaskForm />
        </div>

        <TodoList
          todos={todos}
          handleUpdateTodo={handleUpdateTodo}
          handleDeleteTodo={handleDeleteTodo}
          handleCompleteTodo={handleCompleteTodo}
        />
      </div>
    </>
  );
}

function App() {
  const [tasks, setTasks] = useState([]);

  const handleNewTask = (task) => {
    setTasks([...tasks, task]);
  };

  return (
    <div className="App">
      <h1>My Task List</h1>
      <TaskForm handleNewTask={handleNewTask} />
      {tasks.map((task, index) => (
        <div key={index}>
          <h2>{task.name}</h2>
          {task.description && <p>{task.description}</p>}
        </div>
      ))}
    </div>
  );
}
export default App;