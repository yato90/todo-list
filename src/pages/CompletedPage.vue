<script setup lang="ts">
import { computed } from 'vue';
import { useTodoStore } from '../store/TodoStore';
import { useTodoActions } from '../helpers/todo/useTodoActions';
import TodoItem from '../components/Todoitem.vue';

const todoStore = useTodoStore();

const { 
  removeTodo, 
  editTodo, 
  updateTodo, 
  cancelEdit, 
  toggleTodoCompletion 
} = useTodoActions();

const completedTodos = computed(() => todoStore.completedTodos);
</script>

<template>
    <h2>Выполненные задачи</h2>
    <div v-if="completedTodos.length > 0">
      <TodoItem
        v-for="todo in completedTodos"
        :key="todo.id"
        :todo="todo"
        @edit="editTodo(todo.id)"
        @update="updateTodo(todo.id, $event)"
        @cancel="cancelEdit(todo.id)"
        @remove="removeTodo(todo.id)"
        @toggle="toggleTodoCompletion(todo.id)"
      />
    </div>
    <div v-else>
      <p>Завершенных задач пока нет.</p>
    </div>
</template>

<style scoped>
</style>
  