<script setup lang="ts">
import { TodoItem as TodoItemType } from '../store/interface';

const props = defineProps<{ todo: TodoItemType }>();

const emit = defineEmits(['remove', 'toggle', 'edit', 'update', 'cancel']);
</script>

<template>
  <div :class="{ todo_item: true, completed: todo.completed }">
    <div class="info" v-if="todo.isEditing">
      <input 
        class="input-edit" 
        type="text" 
        v-model="todo.title" 
        @blur="$emit('update', { id: todo.id, title: todo.title })" />
      <textarea 
        class="textarea-edit" 
        v-model="todo.description" 
        @blur="$emit('update', { id: todo.id, description: todo.description })">
      </textarea>
      <button @click="$emit('cancel', todo.id)">Закрыть</button>
    </div>
    <div class="info" v-else>
      <h3 
        :class="{ crossed: todo.completed }" 
        @click="$emit('edit', todo.id)"
      >
        {{ props.todo.title }}
      </h3>
      <p @click="$emit('edit', todo.id)">{{ props.todo.description }}</p>
      <strong>Приоритет</strong> - {{ props.todo.priority }}
    </div>
    <div>
      <input 
        type="checkbox" 
        :checked="props.todo.completed" 
        @change="$emit('toggle', props.todo.id)" 
      />
      <button @click="$emit('remove')">Удалить</button>
    </div>
  </div>
</template>

<style scoped>
.todo_item{
  display: flex;
  justify-content: space-between;
  width: 700px;
  margin: 10px 0px 10px 0;
  padding: 10px;
  align-items: center;
  text-align: left;
  color:black;
  border-radius: 5px;
  border: 2px solid;
}
p{
  width: 500px;
  white-space: pre-wrap;
  word-wrap: break-word;
}
button {
  margin-left: 1em;
}
.info{
  width: 500px;
}
.input-edit {
	width: 100%;
	font-size: 13px;
	padding: 6px 0 4px 10px;
	border: 1px solid #cecece;
	background: #F6F6f6;
	border-radius: 8px;
  margin-bottom: 1rem;
}
.textarea-edit {
	overflow: auto;
	resize: none;
	width: 100%;
	height: 110px;
	background: #f6f6f6;
	border: 1px solid #cecece;
	padding: 8px 0 8px 10px;
}
.todo_item.completed {
  opacity: 0.5;
}
.crossed {
  text-decoration: line-through;
}
</style>
