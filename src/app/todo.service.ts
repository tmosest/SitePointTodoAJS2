import { Injectable } from '@angular/core';
import {Todo} from './todo';

@Injectable()
export class TodoService {

    // Place holder for last id so we can simualte auto id incrementation.
    lastId: number = 0;
    
    // Placeholder for todo's
    todos: Todo[] = [];
    
    constructor() { }

    // Simulate POST /todos
    addTodo(todo: Todo): TodoService {
        if(!todo.id) {
            todo.id = ++this.lastId;
        }
        this.todos.push(todo);
        return this;
    }

    // Simulate Delete /todos/:id
    deleteTodoById(id: number): TodoService {
        this.todos = this.todos
            .filter(todo => todo.id !== id);
        return this;
    }

    // Simulate PUT /todos/:id
    updateTodoById(id: number, values: Object = {}): Todo {
        let todo = this.getTodoById(id);
        if(!todo) {
            return null;
        }
        Object.assign(todo, values);
        return todo;
    }

    // Simulate GET /todos
    getAllTodos(id: number): Todo[] {
        return this.todos;
    }

    // Simulate GET /todos/:id
    getTodoById(id: number): Todo {
        return this.todos
            .filter(todo => todo.id === id)
            .pop();
    }
    
    // Toggle todo complete
    toggleTodoComplete(todo: Todo) {
        let updateTodo = this.updateTodoById(todo.id, {
            complete: !todo.complete
        });
        return updateTodo;
    }
}
