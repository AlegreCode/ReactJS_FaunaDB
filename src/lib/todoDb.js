import client from './fauna'
import { fql } from 'fauna'

export const todoDb = {
  // Obtener todas las tareas
  getAllTodos: async () => {
    try {
      const result = await client.query(fql`
        Todo.all()
      `)
      return result.data
    } catch (error) {
      console.error('Error al obtener las tareas:', error)
      return []
    }
  },

  // Crear una nueva tarea
  createTodo: async (todoData) => {
    try {
      const result = await client.query(fql`
        Todo.create({
          text: ${todoData.text},
          completed: false
        })
      `)
      return result.data
    } catch (error) {
      console.error('Error al crear la tarea:', error)
      throw error
    }
  },

  // Actualizar una tarea
  updateTodo: async (todoId, updates) => {
    try {
      const result = await client.query(fql`
        Todo.byId(${todoId})!.update({
          completed: ${updates.completed}
        })
      `)
      return result.data
    } catch (error) {
      console.error('Error al actualizar la tarea:', error)
      throw error
    }
  },

  // Eliminar una tarea
  deleteTodo: async (todoId) => {
    try {
      await client.query(fql`
        Todo.byId(${todoId})!.delete()
      `)
      return true
    } catch (error) {
      console.error('Error al eliminar la tarea:', error)
      throw error
    }
  }
} 