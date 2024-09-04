import { test, expect } from 'vitest'
import { useForm } from '../helpers/form/useForm'
import { Priority } from '../store/interface'

// Тестирование хука useForm
test('initializes form state and resets correctly', () => {
  const initialState = { title: '', description: '', priority: Priority.Low, date: '' }
  const { state, reset } = useForm(initialState)

  // Проверяем начальное состояние
  expect(state.title).toBe('')
  expect(state.description).toBe('')
  expect(state.priority).toBe(Priority.Low)
  expect(state.date).toBe('')

  // Изменяем состояние
  state.title = 'Updated Title'
  state.description = 'Updated Description'
  state.date = new Date().toISOString()

  // Проверяем измененное состояние
  expect(state.title).toBe('Updated Title')
  expect(state.description).toBe('Updated Description')
  expect(state.date).not.toBe('')

  // Сбрасываем состояние
  reset()

  // Проверяем сброшенное состояние
  expect(state.title).toBe('')
  expect(state.description).toBe('')
  expect(state.priority).toBe(Priority.Low)
  expect(state.date).toBe('')
})
