<script setup lang="ts">
import { ref, watch  } from 'vue';
import { TodoItem as TodoItemType } from '../store/interface';
import ConfirmModal from './ConfirmModal.vue';

const props = defineProps<{ todo: TodoItemType }>();

const isModalVisible = ref<boolean>(false);
let tempTitle = ref<string>(props.todo.title);
let tempDescription = ref<string>(props.todo.description);
let tempDate = ref<string>(props.todo.date);

const emit = defineEmits(['remove', 'toggle', 'edit', 'update', 'cancel']);

const showConfirmation = () => {
  isModalVisible.value = true;
};
const confirmUpdate = () => {
  emit('update', { 
    id: props.todo.id,
    title: tempTitle.value,
    description: tempDescription.value,
    date: tempDate.value
  });
  isModalVisible.value = false;
};
const cancelUpdate = () => {
  emit('cancel', props.todo.id);
  isModalVisible.value = false;
};
// Сброс временных переменных при начале редактирования
watch(() => props.todo.isEditing, (newVal) => {
  if (newVal) {
    tempTitle.value = props.todo.title;
    tempDescription.value = props.todo.description;
    tempDate.value = props.todo.date;
  }
});
</script>

<template>
  <div :class="{ todo_item: true, completed: todo.completed }">
    <div class="info" v-if="todo.isEditing">
      <input 
        class="input-edit" 
        type="text" 
        v-model="tempTitle" 
         /> 
      <textarea 
        class="textarea-edit" 
        v-model="tempDescription" 
        >
      </textarea>
      <input 
        class="input-edit" 
        type="date" 
        v-model="tempDate" 
      />
      <button @click="showConfirmation">Сохранить изменения</button>
    </div>
    <div class="info" v-else>
      <h3 
        :class="{ crossed: todo.completed }" 
        @click="$emit('edit', todo.id)"
      >
        {{ props.todo.title }}
      </h3>
      <p @click="$emit('edit', todo.id)">{{ props.todo.description }}</p>
      <div class="">
        <strong>Приоритет</strong> - {{ props.todo.priority }}
        <button @click="$emit('edit', todo.id)">Изменить</button>
      </div>
      <span>Дата: {{ props.todo.date }}</span>
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

  <ConfirmModal 
    v-if="isModalVisible"
    @confirm="confirmUpdate" 
    @cancel="cancelUpdate" 
  />
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
span{
  color:#565656;
  font-size: 13px;
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
