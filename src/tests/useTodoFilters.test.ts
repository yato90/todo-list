import { test, expect } from 'vitest';
import { createPinia, setActivePinia } from 'pinia';
import { useTodoStore } from '../store/TodoStore';
import { useTodoFilters } from '../helpers/todo/useTodoFilters';
import { Priority } from '../store/interface';

test('filters todos by priority',  () => {
  setActivePinia(createPinia());
  const todoStore = useTodoStore();
  const { filteredTodos, setPriorityFilter } = useTodoFilters();

  // Добавляем тестовые задачи в хранилище
  todoStore.addTodo({
    title: 'High Priority Task',
    description: 'Task',
    priority: Priority.High,
    completed: true,
    isEditing: false,
    date: new Date().toISOString()
  });
  todoStore.addTodo({
    title: 'Low Priority Task',
    description: 'Task',
    priority: Priority.Low,
    completed: true,
    isEditing: false,
    date: new Date().toISOString()
  });

  // Устанавливаем фильтр по приоритету
  setPriorityFilter(Priority.High);
  // Проверяем, что отфильтрованные задачи соответствуют установленному приоритету
  expect(filteredTodos.value.length).toBe(1);
  expect(filteredTodos.value[0].title).toBe('High Priority Task');
});

test('filters todos by date range', () => {
  setActivePinia(createPinia());
  const todoStore = useTodoStore();
  const { filteredTodos, setDateRange } = useTodoFilters();

  // Добавляем тестовые задачи в хранилище
  todoStore.addTodo({
    title: 'Past Task',
    description: 'Task',
    priority: Priority.High,
    completed: true,
    isEditing: false,
    date: '2023-01-01'
  });
  todoStore.addTodo({
    title: 'Future Task',
    description: 'Task',
    priority: Priority.Low,
    completed: true,
    isEditing: false,
    date: '2024-01-03'
  });

  // Устанавливаем диапазон дат
  setDateRange(new Date('2023-01-01'), new Date('2024-01-02'));
  // Проверяем, что только задачи в указанном диапазоне дат отображаются
  expect(filteredTodos.value.length).toBe(1);
  expect(filteredTodos.value[0].title).toBe('Past Task');
});
