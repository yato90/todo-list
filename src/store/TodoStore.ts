import { defineStore } from 'pinia'
import { TodoState, TodoItem } from './interface'

export const useTodoStore = defineStore('todo', {
  state: (): TodoState => ({
    todos: []
  }),
  persist: true,
  getters: {
    completedTodos(state): TodoItem[] {
      return state.todos.filter((todo) => todo.completed)
    }
  },
  actions: {
    // Исключаем id и генерируем свой
    addTodo(todo: Omit<TodoItem, 'id'>) {
      const newTodo: TodoItem = {
        id: Date.now(),
        ...todo
      }
      // Создаем новый массив, добавляя новую задачу
      this.todos = [...this.todos, newTodo]
    },
    removeTodo(idToRemove: number) {
      // Создаем новый массив, исключая задачу с указанным id
      this.todos = this.todos.filter((item) => item.id !== idToRemove)
    },
    toggleCompletion(id: number) {
      const todo = this.todos.find((todo) => todo.id === id)
      if (todo) {
        todo.completed = !todo.completed
      }
    },
    editTodo(id: number) {
      const todo = this.todos.find((item) => item.id === id)
      if (todo) {
        todo.isEditing = true
      }
    },
    updateTodo(id: number, updatedFields: Partial<Omit<TodoItem, 'id'>>) {
      const index = this.todos.findIndex((todo) => todo.id === id)
      if (index !== -1) {
        // Создаем новый объект с обновленными полями
        const updatedTodo = {
          ...this.todos[index],
          ...updatedFields,
          isEditing: false
        }
        // Обновляем массив задач, создавая новый массив с обновленной задачей
        this.todos = [...this.todos.slice(0, index), updatedTodo, ...this.todos.slice(index + 1)]
      }
    },
    cancelEdit(id: number) {
      const todo = this.todos.find((item) => item.id === id)
      if (todo) {
        todo.isEditing = false
      }
    }
  }
})
