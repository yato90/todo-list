<script setup lang="ts">
import { reactive, defineAsyncComponent  } from 'vue';
import { useTodoStore } from '../store/TodoStore';
import { useForm } from '../helpers/form/useForm';
import { Priority, Errors as ErrorsType, TodoItem as TodoItemType } from '../store/interface';

// Ленивый импорт компонента TodoItems
const TodoItems = defineAsyncComponent(() => import('./Todoitem.vue'));

// Определение интерфейса для формы задач
interface TodoForm {
  title: string;
  description: string;
  priority: Priority;
}
// Используем useForm для работы с формой задач
const { state: formState, reset: resetForm } = useForm<TodoForm>({
  title: '',
  description: '',
  priority: Priority.Low,
});

const todoStore = useTodoStore();

const errors = reactive<ErrorsType>({
  title: '',
  description: '',
});

// Простая валидация
const validateForm = (): boolean => {
  errors.title = formState.title.trim() === '' ? 'Название не введено' : '';
  errors.description = formState.description.trim() === '' ? 'Описание не введено' : '';
  return !errors.title && !errors.description;
};

// Отправка формы
const onSubmit = () => {
  if (validateForm()) {
    todoStore.addTodo({
      title: formState.title,
      description: formState.description,
      priority: formState.priority,
      completed: false,
      isEditing: false,
    });

    // Сбрасываем форму после добавления задачи
    resetForm();
  }
};

// Удаление задачи
const removeTodo = (id: number) => {
  todoStore.removeTodo(id);
};

const editTodo = (id: number) => {
  todoStore.editTodo(id);
};

const updateTodo = (id: number, updatedFields: Partial<Omit<TodoItemType, 'id'>>) => {
  todoStore.updateTodo(id, updatedFields);
};

const cancelEdit = (id: number) => {
  todoStore.cancelEdit(id);
};

const toggleTodoCompletion = (id: number) => {
  todoStore.toggleCompletion(id);
};
</script>

<template>
    <div>
        <h1>Todo List</h1>
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
	background: #F6F6f6;
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
.form_item{
  display: flex;
  align-items:center;
  flex-direction: column;
  margin-bottom: 1rem;
}
.error {
  color: red;
  font-size: 0.9em;
}
</style>
