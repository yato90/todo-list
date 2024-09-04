import { setActivePinia, createPinia } from 'pinia';
import { test, expect } from 'vitest';
import { useTodoStore } from '../store/TodoStore';
import { Priority } from '../store/interface';

test('adds a new todo', () => {
    setActivePinia(createPinia());
    const todoStore = useTodoStore();

    const newTodo = { 
        title: 'Новая задача', 
        description: 'Описание новой задачи', 
        priority: Priority.Medium, 
        completed: false, 
        isEditing: false, 
        date: new Date().toISOString() 
    };

    // Добавляем задачу
    todoStore.addTodo(newTodo);

    // Проверяем, что задача была добавлена
    expect(todoStore.todos.length).toBe(1);
    expect(todoStore.todos[0].title).toBe('Новая задача');
});

test('removes a todo', () => {
    setActivePinia(createPinia());
    const todoStore = useTodoStore();

    const todoToRemove = { 
        id: 1, 
        title: 'Задача на удаление', 
        description: 'Описание', 
        priority: Priority.Medium, 
        completed: false, 
        isEditing: false, 
        date: new Date().toISOString() 
    };

    // Добавляем и затем удаляем задачу
    todoStore.addTodo(todoToRemove);
    todoStore.removeTodo(todoToRemove.id);

    // Проверяем, что задача была удалена
    expect(todoStore.todos.length).toBe(0);
});

test('toggles completion of a todo', () => {
    setActivePinia(createPinia());
    const todoStore = useTodoStore();

    const todo = { 
        id: 1, 
        title: 'Задача', 
        description: 'Описание задачи', 
        priority: Priority.Medium, 
        completed: false, 
        isEditing: false, 
        date: new Date().toISOString() 
    };

    todoStore.addTodo(todo);

    // Переключаем состояние задачи
    todoStore.toggleCompletion(todo.id);

    // Проверяем, что состояние задачи изменилось на "выполнено"
    expect(todoStore.todos[0].completed).toBe(true);
});

test('edits a todo', () => {
    setActivePinia(createPinia());
    const todoStore = useTodoStore();

    const todo = { 
        id: 1, 
        title: 'Задача для редактирования', 
        description: 'Описание задачи', 
        priority: Priority.Medium, 
        completed: false, 
        isEditing: false, 
        date: new Date().toISOString() 
    };

    todoStore.addTodo(todo);

    // Включаем режим редактирования
    todoStore.editTodo(todo.id);

    // Проверяем, что задача перешла в состояние редактирования
    expect(todoStore.todos[0].isEditing).toBe(true);
});

test('updates a todo', () => {
    setActivePinia(createPinia());
    const todoStore = useTodoStore();

    const todo = { 
        id: 1, 
        title: 'Задача для обновления', 
        description: 'Описание задачи', 
        priority: Priority.Medium, 
        completed: false, 
        isEditing: false, 
        date: new Date().toISOString() 
    };

    todoStore.addTodo(todo);

    // Обновляем задачу
    todoStore.updateTodo(todo.id, { title: 'Обновленная задача' });

    // Проверяем, что заголовок задачи был обновлен
    expect(todoStore.todos[0].title).toBe('Обновленная задача');
});
