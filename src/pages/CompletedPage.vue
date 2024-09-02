<script setup lang="ts">
import { ref } from 'vue'
import { useTodoActions } from '../helpers/todo/useTodoActions'
import { useTodoFilters } from '../helpers//todo/useTodoFilters'
import TodoItem from '../components/TodoItem.vue'
import { Priority } from '../store/interface'

const { removeTodo, editTodo, updateTodo, cancelEdit, toggleTodoCompletion } = useTodoActions()
// Используем хук для фильтрации задач
const { filteredTodos, setPriorityFilter, setDateRange } = useTodoFilters()

// Временные переменные для хранения значений фильтров
const tempPriority = ref<string>('')
const tempStartDate = ref<string | null>(null)
const tempEndDate = ref<string | null>(null)

// Применение фильтров по нажатию кнопки "Применить"
const applyFilters = () => {
  setPriorityFilter(tempPriority.value)
  setDateRange(
    tempStartDate.value ? new Date(tempStartDate.value) : null,
    tempEndDate.value ? new Date(tempEndDate.value) : null
  )
}
</script>

<template>
  <div>
    <h2>Выполненные задачи</h2>
    <div class="filter">
      <label for="priority">Фильтр по приоритету:</label>
      <select id="priority" v-model="tempPriority">
        <option value="">All</option>
        <option :value="Priority.Low">Low</option>
        <option :value="Priority.Medium">Medium</option>
        <option :value="Priority.High">High</option>
      </select>
    </div>
    <div class="filter">
      <label for="start-date">Дата начала:</label>
      <input type="date" id="start-date" v-model="tempStartDate" />
      <label for="end-date">Дата окончания:</label>
      <input type="date" id="end-date" v-model="tempEndDate" />
    </div>
    <button @click="applyFilters">Применить</button>
    <div v-if="filteredTodos.length > 0">
      <TodoItem
        v-for="todo in filteredTodos"
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
  </div>
</template>

<style scoped>
input {
  width: 300px;
  font-size: 13px;
  padding: 6px 0 4px 10px;
  border: 1px solid #cecece;
  background: #f6f6f6;
  border-radius: 8px;
}
textarea {
  overflow: auto;
  resize: none;
  width: 300px;
  height: 70px;
  background: #f6f6f6;
  border: 1px solid #cecece;
  padding: 8px 0 8px 10px;
}
select {
  background-color: white;
  border: 1px solid #ccc;
  border-radius: 4px;
  padding: 8px 12px;
  font-size: 16px;
  color: #333;
  width: 100%;
  max-width: 300px;
  outline: none;
  cursor: pointer;
}
select:focus {
  border-color: #66afe9;
  box-shadow: 0 0 5px rgba(102, 175, 233, 0.6);
}
.filter {
  display: flex;
  flex-direction: column;
  align-items: center;
}
.filter > * {
  margin-bottom: 10px;
}
</style>
