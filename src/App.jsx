import { useState } from 'react';
import Form from './components/Form';
import Todo from './components/Todo';

export default function TodoApp() {
  const [todos, setTodos] = useState([]);
  const [newTodo, setNewTodo] = useState('');

  const addTodo = (e) => {
    e.preventDefault();
    if (newTodo.trim()) {
      setTodos([...todos, { id: Date.now(), text: newTodo, completed: false }]);
      setNewTodo('');
    }
  };

  const toggleTodo = (id) => {
    setTodos(
      todos.map(todo =>
        todo.id === id ? { ...todo, completed: !todo.completed } : todo
      )
    );
  };

  const deleteTodo = (id) => {
    setTodos(todos.filter(todo => todo.id !== id));
  };

  return (
    <div className="min-h-screen bg-gray-100 py-8">
      <div className="max-w-md mx-auto bg-white rounded-lg shadow-lg p-6">
        <h1 className="text-2xl font-bold text-gray-800 mb-6">Lista de Tareas</h1>
        
        <Form newTodo={newTodo} setNewTodo={setNewTodo} addTodo={addTodo} />

        <div className="space-y-3">
          {todos.map(todo => (
            <Todo key={todo.id} todo={todo} toggleTodo={toggleTodo} deleteTodo={deleteTodo} />
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
