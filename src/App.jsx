import { useState } from 'react';
import { Trash2, Plus, Check } from 'lucide-react';

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
        <h1 className="text-2xl font-bold text-gray-800 mb-6">Todo List</h1>
        
        {/* Form para agregar nuevos todos */}
        <form onSubmit={addTodo} className="flex gap-2 mb-6">
          <input
            type="text"
            value={newTodo}
            onChange={(e) => setNewTodo(e.target.value)}
            placeholder="¿Qué necesitas hacer?"
            className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <button
            type="submit"
            className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 flex items-center gap-2"
          >
            <Plus size={20} />
            Agregar
          </button>
        </form>

        {/* Lista de todos */}
        <div className="space-y-3">
          {todos.map(todo => (
            <div
              key={todo.id}
              className="flex items-center justify-between p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors"
            >
              <div className="flex items-center gap-3">
                <button
                  onClick={() => toggleTodo(todo.id)}
                  className={`w-6 h-6 rounded-full border-2 flex items-center justify-center
                    ${todo.completed 
                      ? 'bg-green-500 border-green-500 text-white' 
                      : 'border-gray-400'
                    }`}
                >
                  {todo.completed && <Check size={16} />}
                </button>
                <span className={`text-gray-800 ${todo.completed ? 'line-through text-gray-500' : ''}`}>
                  {todo.text}
                </span>
              </div>
              <button
                onClick={() => deleteTodo(todo.id)}
                className="text-red-500 hover:text-red-700 focus:outline-none"
              >
                <Trash2 size={20} />
              </button>
            </div>
          ))}
        </div>

        {/* Mensaje cuando no hay todos */}
        {todos.length === 0 && (
          <div className="text-center text-gray-500 mt-6">
            No hay tareas pendientes. ¡Añade una!
          </div>
        )}
      </div>
    </div>
  );
}