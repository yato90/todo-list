import { mount } from '@vue/test-utils'
import { test, expect } from 'vitest'
import TodoItem from '../components/TodoItem.vue'
import { Priority } from '../store/interface'

test('emits edit event when edit button is clicked', async () => {
  const todo = {
    id: 1,
    title: 'Тестовая задача',
    description: 'Это тестовое описание задачи',
    priority: Priority.Low,
    completed: false,
    isEditing: false,
    date: new Date().toISOString()
  }

  const wrapper = mount(TodoItem, {
    props: { todo }
  })

  // Имитируем нажатие на кнопку "Редактировать"
  await wrapper.find('button.edit').trigger('click')

  // Проверяем, что событие редактирования было вызвано
  expect(wrapper.emitted().edit).toBeTruthy()
})
