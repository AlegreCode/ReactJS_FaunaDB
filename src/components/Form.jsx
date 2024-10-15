import { Plus } from 'lucide-react';

export default function Form({ newTodo, setNewTodo, addTodo }) {
  return (
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
  );
}

