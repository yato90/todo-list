// src/composables/useTodoActions.ts
import { useTodoStore } from '../../store/TodoStore'
import { TodoItem as TodoItemType } from '../../store/interface'

export function useTodoActions() {
  const todoStore = useTodoStore()

  const removeTodo = (id: number) => {
    todoStore.removeTodo(id)
  }

  const editTodo = (id: number) => {
    todoStore.editTodo(id)
  }

  const updateTodo = (id: number, updatedFields: Partial<Omit<TodoItemType, 'id'>>) => {
    todoStore.updateTodo(id, updatedFields)
  }

  const cancelEdit = (id: number) => {
    todoStore.cancelEdit(id)
  }

  const toggleTodoCompletion = (id: number) => {
    todoStore.toggleCompletion(id)
  }

  return {
    removeTodo,
    editTodo,
    updateTodo,
    cancelEdit,
    toggleTodoCompletion
  }
}
