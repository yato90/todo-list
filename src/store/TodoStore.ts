import { defineStore } from 'pinia';
import { TodoState, TodoItem } from './interface';

export const useTodoStore = defineStore('todo', {
    state: (): TodoState => ({
        todos: [],
    }),
    persist: true,
    actions: {
    // Исключаем id и генерируем свой
    addTodo(todo: Omit<TodoItem, 'id'>) {
        const newTodo: TodoItem = {
            id: Date.now(),
            ...todo,
        };
        // Создаем новый массив, добавляя новую задачу
        this.todos = [...this.todos, newTodo];
    },

    removeTodo(idToRemove: number) {
        // Создаем новый массив, исключая задачу с указанным id
        this.todos = this.todos.filter(item => item.id !== idToRemove);
    },
    toggleCompletion(id: number) {
        const todo = this.todos.find(todo => todo.id === id);
        if (todo) {
          todo.completed = !todo.completed;
        }
    },
  },
});
