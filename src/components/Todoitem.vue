<script setup lang="ts">
import { TodoItem as TodoItemType } from '../store/interface';
import { defineEmits } from 'vue';

const props = defineProps<{ todo: TodoItemType }>();

const emit = defineEmits(['remove', 'toggle']);
</script>

<template>
  <div :class="{ todo_item: true, completed: todo.completed }">
    <div class="info">
      <h3 :class="{ crossed: todo.completed }" >{{ props.todo.title }}</h3>
      <p>{{ props.todo.description }}</p>
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
.todo_item.completed {
  opacity: 0.5;
}
.crossed {
  text-decoration: line-through;
}
</style>
