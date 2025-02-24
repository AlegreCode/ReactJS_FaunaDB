import { useState, useEffect } from 'react';
import Form from './components/Form';
import Todo from './components/Todo';
import { todoDb } from './lib/todoDb';

export default function TodoApp() {
  const [todos, setTodos] = useState([]);
  const [newTodo, setNewTodo] = useState('');
  const [loading, setLoading] = useState(true);

  // Cargar tareas al iniciar
  useEffect(() => {
    loadTodos();
  }, []);

  const loadTodos = async () => {
    try {
      const todosData = await todoDb.getAllTodos();
      setTodos(todosData);
    } catch (error) {
      console.error('Error al cargar las tareas:', error);
    } finally {
      setLoading(false);
    }
  };

  const addTodo = async (e) => {
    e.preventDefault();
    if (newTodo.trim()) {
      try {
        const newTodoData = await todoDb.createTodo({ text: newTodo });
        setTodos([...todos, newTodoData]);
        setNewTodo('');
      } catch (error) {
        console.error('Error al añadir la tarea:', error);
      }
    }
  };

  const toggleTodo = async (id) => {
    try {
      const todoToUpdate = todos.find(todo => todo.id === id);
      const updatedTodo = await todoDb.updateTodo(id, { 
        completed: !todoToUpdate.completed 
      });
      setTodos(todos.map(todo =>
        todo.id === id ? updatedTodo : todo
      ));
    } catch (error) {
      console.error('Error al actualizar la tarea:', error);
    }
  };

  const deleteTodo = async (id) => {
    try {
      await todoDb.deleteTodo(id);
      setTodos(todos.filter(todo => todo.id !== id));
    } catch (error) {
      console.error('Error al eliminar la tarea:', error);
    }
  };

  if (loading) {
    return <div className="text-center mt-8">Cargando...</div>;
  }

  return (
    <div className="min-h-screen bg-gray-100 py-8">
      <div className="max-w-md mx-auto bg-white rounded-lg shadow-lg p-6">
        <h1 className="text-2xl font-bold text-gray-800 mb-6">Lista de Tareas</h1>
        
        <Form newTodo={newTodo} setNewTodo={setNewTodo} addTodo={addTodo} />

        <div className="space-y-3">
          {todos.map(todo => (
            <Todo 
              key={todo.id} 
              todo={todo} 
              toggleTodo={toggleTodo} 
              deleteTodo={deleteTodo} 
            />
          ))}
        </div>

        {todos.length === 0 && (
          <div className="text-center text-gray-500 mt-6">
            No hay tareas pendientes. ¡Añade una!
          </div>
        )}
      </div>
    </div>
  );
}
