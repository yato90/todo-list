<script setup lang="ts">
const emit = defineEmits(['confirm', 'cancel'])

const confirm = () => {
  emit('confirm')
}
const cancel = () => {
  emit('cancel')
}
</script>

<template>
  <div class="modal-overlay">
    <div class="modal">
      <p>Вы уверены, что хотите сохранить изменения?</p>
      <div class="modal-button">
        <button @click="confirm">Подтвердить</button>
        <button @click="cancel">Отмена</button>
      </div>
    </div>
  </div>
</template>

<style scoped>
.modal-overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
}

.modal {
  background-color: white;
  padding: 20px;
  border-radius: 5px;
  text-align: center;
}
.modal-button {
  display: flex;
  justify-content: space-between;
}
</style>
