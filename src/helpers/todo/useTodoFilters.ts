// src/composables/useTodoFilters.ts
import { ref, computed } from 'vue'
import { useTodoStore } from '../../store/TodoStore'
import { Priority } from '../../store/interface'

export function useTodoFilters() {
  const todoStore = useTodoStore()

  // Состояние для фильтров
  const selectedPriority = ref<Priority | string>('')
  const dateRange = ref<{ startDate: Date | null; endDate: Date | null }>({
    startDate: null,
    endDate: null
  })

  // Фильтрация по приоритету
  const filteredByPriority = computed(() => {
    if (selectedPriority.value) {
      return todoStore.completedTodos.filter((todo) => todo.priority === selectedPriority.value)
    }
    return todoStore.completedTodos
  })

  // Фильтрация по диапазону дат
  const filteredByDateRange = computed(() => {
    const { startDate, endDate } = dateRange.value
    return filteredByPriority.value.filter((todo) => {
      const todoDate = new Date(todo.date)
      return (!startDate || todoDate >= startDate) && (!endDate || todoDate <= endDate)
    })
  })

  // Метод для обновления приоритета
  const setPriorityFilter = (priority: Priority | string) => {
    selectedPriority.value = priority
  }

  // Метод для обновления диапазона дат
  const setDateRange = (startDate: Date | null, endDate: Date | null) => {
    dateRange.value = { startDate, endDate }
  }

  return {
    filteredTodos: filteredByDateRange,
    setPriorityFilter,
    setDateRange
  }
}
