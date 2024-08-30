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
        this.todos.push(newTodo);
    },

    removeTodo(idToRemove: number) {
        const indexToRemove = this.todos.findIndex(item => item.id === idToRemove);
        this.todos.splice(indexToRemove, 1);
    },
    toggleCompletion(id: number) {
        const todo = this.todos.find(todo => todo.id === id);
        if (todo) {
          todo.completed = !todo.completed;
        }
    },
  },
});
