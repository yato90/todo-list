export enum Priority {
    Low = 'Low',
    Medium = 'Medium',
    High = 'High',
}

export interface TodoItem {
    id: number;
    title: string;
    description: string;
    priority: Priority;
    completed: boolean;
}

export interface TodoState {
    todos: TodoItem[];
}

export interface Errors{
    title: string;
    description: string;
}
