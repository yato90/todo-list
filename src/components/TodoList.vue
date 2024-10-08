<script setup lang="ts">
import { reactive, defineAsyncComponent } from 'vue'
import { useTodoStore } from '../store/TodoStore'
import { useForm } from '../helpers/form/useForm'
import { useTodoActions } from '../helpers/todo/useTodoActions'
import { Priority, Errors as ErrorsType } from '../store/interface'

// Ленивый импорт компонента TodoItems
const TodoItems = defineAsyncComponent(() => import('./TodoItem.vue'))

// Определение интерфейса для формы задач
interface TodoForm {
  title: string
  description: string
  priority: Priority
  date: string
}

// Установка текущей даты по умолчанию
const today = new Date().toISOString().split('T')[0]

// Используем useForm для работы с формой задач
const { state: formState, reset: resetForm } = useForm<TodoForm>({
  title: '',
  description: '',
  priority: Priority.Low,
  date: today
})
// Используем useTodoActions для дейсвий с задачами
const { removeTodo, editTodo, updateTodo, cancelEdit, toggleTodoCompletion } = useTodoActions()

const todoStore = useTodoStore()

const errors = reactive<ErrorsType>({
  title: '',
  description: ''
})

// Простая валидация
const validateForm = (): boolean => {
  errors.title = formState.title.trim() === '' ? 'Название не введено' : ''
  errors.description = formState.description.trim() === '' ? 'Описание не введено' : ''
  return !errors.title && !errors.description
}
// Отправка формы
const onSubmit = () => {
  if (validateForm()) {
    todoStore.addTodo({
      title: formState.title,
      description: formState.description,
      priority: formState.priority,
      completed: false,
      isEditing: false,
      date: formState.date
    })

    // Сбрасываем форму после добавления задачи
    resetForm()
  }
}
</script>

<template>
  <div>
    <form @submit.prevent="onSubmit">
      <div class="form_item">
        <input type="text" v-model="formState.title" placeholder="Название" />
        <span v-if="errors.title" class="error">{{ errors.title }}</span>
      </div>
      <div class="form_item">
        <textarea v-model="formState.description" placeholder="Описание"></textarea>
        <span v-if="errors.description" class="error">{{ errors.description }}</span>
      </div>
      <div class="form_item">
        <input type="date" v-model="formState.date" />
      </div>
      <div class="form_item">
        <select v-model="formState.priority">
          <option :value="Priority.Low">Low</option>
          <option :value="Priority.Medium">Medium</option>
          <option :value="Priority.High">High</option>
        </select>
      </div>
      <button type="submit">Добавить</button>
    </form>
    <div v-if="todoStore.todos.length > 0">
      <TodoItems
        v-for="todo in todoStore.todos"
        :key="todo.id"
        :todo="todo"
        @edit="editTodo(todo.id)"
        @update="updateTodo(todo.id, $event)"
        @cancel="cancelEdit(todo.id)"
        @remove="removeTodo(todo.id)"
        @toggle="toggleTodoCompletion(todo.id)"
      />
    </div>
  </div>
</template>

<style scoped>
form {
  margin-bottom: 1em;
  padding: 10px;
}
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
button {
  margin-top: 1em;
}
.form_item {
  display: flex;
  align-items: center;
  flex-direction: column;
  margin-bottom: 1rem;
}
.error {
  color: red;
  font-size: 0.9em;
}
</style>
