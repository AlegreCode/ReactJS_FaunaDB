import { Trash2, Check } from 'lucide-react';

export default function Todo({ todo, toggleTodo, deleteTodo }) {
  return (
    <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors">
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
  );
}

