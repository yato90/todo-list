<script setup lang="ts">
</script>

<template>
  <h1>Todo List</h1>
  <nav>
    <router-link to="/">Главная</router-link> |
    <router-link to="/completed">Выполненные задачи</router-link>
  </nav>
  <router-view/>
</template>

<style scoped>
</style>
