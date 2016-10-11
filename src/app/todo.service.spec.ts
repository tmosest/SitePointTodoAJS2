/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { Todo } from './todo';
import { TodoService } from './todo.service';

describe('Todo Service', () => {
    
    beforeEach(() => {
        this.TodoService = new TodoService();
    });
    
    describe('#getAllTodos()', () => {
            
        it('should return an empty array by default', () => {
            expect(this.TodoService.getAllTodos()).toEqual([]);
        })
        
    });
    
});

describe('Todo Service Injected', () => {
    
    beforeEach(() => {
        TestBed.configureTestingModule({
          providers: [TodoService],
        });
    });
    
    describe('#getAllTodos()', () => {
    
        it('should return an empty array by default', inject([TodoService], (service: TodoService) => {
            expect(service.getAllTodos()).toEqual([]);
        }));
    
    });
    
    describe('#save(todo)', () => {
    
        it('should automatically assign an incrementing id', inject([TodoService], (service: TodoService) => {
          let todo1 = new Todo({title: 'Hello 1', complete: false});
          let todo2 = new Todo({title: 'Hello 2', complete: true});
          service.addTodo(todo1);
          service.addTodo(todo2);
          expect(service.getTodoById(1)).toEqual(todo1);
          expect(service.getTodoById(2)).toEqual(todo2);
        }));
    
    });
    
    
    describe('#deleteTodoById(todo)', () => {
        
        it('should remove the todo with the corrsponding id', inject([TodoService], (service: TodoService) => {
            let todo1 = new Todo({title: 'Hello 1', complete: false});
            let todo2 = new Todo({title: 'Hello 2', complete: true});
            service.addTodo(todo1);
            service.addTodo(todo2);
            expect(service.getAllTodos()).toEqual([todo1, todo2]);
            service.deleteTodoById(1);
            expect(service.getAllTodos()).toEqual([todo2]);
            service.deleteTodoById(2);
            expect(service.getAllTodos()).toEqual([]);
        }));    
        
        it('should not remove anything if todo with corresponding id is not found', inject([TodoService], (service: TodoService) => {
            let todo1 = new Todo({title: 'Hello 1', complete: false});
            let todo2 = new Todo({title: 'Hello 2', complete: true});
            service.addTodo(todo1);
            service.addTodo(todo2);
            expect(service.getAllTodos()).toEqual([todo1, todo2]);
            service.deleteTodoById(3);
            expect(service.getAllTodos()).toEqual([todo1, todo2]);
        }));
        
    });
        
    describe('#updateTodoById(id, values)', () => {
        
        it('should return corresponding id with updated data', inject([TodoService], (service: TodoService) => {
            let todo = new Todo({title: 'Hello 1', complete: false});
            service.addTodo(todo);
            let updatedTodo = service.updateTodoById(1, {
                title: 'new title'
            });
            expect(updatedTodo.title).toEqual('new title');
        }));
        
        it('should return null if todo is not found', inject([TodoService], (service: TodoService) => {
            let todo = new Todo({title: 'Hello 1', complete: false});
            service.addTodo(todo);
            let updatedTodo = service.updateTodoById(2, {
                title: 'new title'
            });
            expect(updatedTodo).toEqual(null); 
        }));
        
    });
    
    describe("#toggleTodoComplete(todo)", () => {
        
        it('should return the updated todo with inverse complete status', inject([TodoService], (service: TodoService) => {
            let todo = new Todo({title: 'Hello 1', complete: false});
            service.addTodo(todo);
            expect(service.getAllTodos()).toEqual([todo]);
            let updatedTodo = service.toggleTodoComplete(todo);
            expect(updatedTodo.complete).toEqual(true);
            service.toggleTodoComplete(todo);
            expect(updatedTodo.complete).toEqual(false);
        }));
        
    });
    
});
