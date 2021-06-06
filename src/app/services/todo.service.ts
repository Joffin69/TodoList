import { Injectable } from '@angular/core';

import { Todo } from '../models/todo';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class TodoService {

  todo: Todo[] = [
    {
      id: 1,
      userId: 'jjohn12',
      title: 'Complete TodoApp',
      completed: true
    },
    {
      id: 2,
      userId: 'jjohn12',
      title: 'Go to lulu mall',
      completed: false
    },
    {
      id: 3,
      userId: 'mmath',
      title: 'Buy Groceries',
      completed: false
    },
    {
      id: 4,
      userId: 'wshetty',
      title: 'Finish change ticket implementation',
      completed: false
    },
    {
      id: 5,
      userId: 'akumar759',
      title: 'Finish LTC CR-759',
      completed: false
    },
    {
      id: 6,
      userId: 'mmath',
      title: 'Buy sunglasses',
      completed: false
    },
    {
      id: 7,
      userId: 'wshetty',
      title: 'Complete CI-19 Integration with SFDC',
      completed: false
    },
    {
      id: 8,
      userId: 'rgupta69',
      title: 'Complete Bank Loan POC',
      completed: false
    },
    {
      id: 9,
      userId: 'aabraham6',
      title: 'Learn ReactJS',
      completed: false
    },
    {
      id: 10,
      userId: 'rgupta69',
      title: 'Check with Sindhu on dot net implementation',
      completed: false
    }
  ];

  constructor(private authService: AuthService) { }

  getTodos(): Todo[] {
    return this.todo;
  }

  completeTodo(id): void {
    if (this.todo.length > 0) {
      this.todo.forEach(todo => {
        if (todo.id === id) {
          todo.completed = true;
        }
      });
    }
  }

  reOpenTodo(id): void {
    if (this.todo.length > 0) {
      for (const todo of this.todo) {
        if (todo.id === id) {
          todo.completed = false;
        }
      }
    }
  }

  addTodo(newTitle: string, userid: string): void {
    let newId: number;
    if (this.todo.length > 0) {
      newId = this.todo[this.todo.length - 1].id + 1;
    }
    else {
      newId = 1;
    }
    const todoObject = {
      id: newId,
      userId: userid,
      title: newTitle,
      completed: false
    };
    this.todo.push(todoObject);
  }

  deleteTodo(id: number): void{
    this.todo = this.todo.filter(todo => {
      return todo.id !== id;
    });
  }

 }
