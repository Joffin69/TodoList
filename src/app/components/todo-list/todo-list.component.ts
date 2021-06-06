import { Component, OnInit, OnDestroy, AfterViewInit } from '@angular/core';
import { Subscription } from 'rxjs';

import { Todo } from 'src/app/models/todo';
import { TodoService } from '../../services/todo.service';
import { AuthService } from 'src/app/services/auth.service';


@Component({
  selector: 'app-todo-list',
  templateUrl: './todo-list.component.html',
  styleUrls: ['./todo-list.component.css']
})
export class TodoListComponent implements OnInit, OnDestroy, AfterViewInit {

  todos: Todo[];
  isUserLoggedIn = false;
  isUserAuthd: Subscription;

  constructor(private todoService: TodoService, private authService: AuthService) {}

  ngOnInit(): void {
    this.isUserLoggedIn = this.authService.getIsUserLoggedIn();
    if (!this.isUserLoggedIn) {
      this.refreshTodo(null);
    } else {
      const userId = this.authService.retrieveLoggedInUserData();
      this.refreshTodo(userId);
    }
  }

  ngAfterViewInit(): void {
    this.isUserAuthd = this.authService.getUserAuthd()
    .subscribe(value => {
      this.isUserLoggedIn = value;
      if (!this.isUserLoggedIn) {
        this.refreshTodo(null);
      }
    });
  }

  fromTodoComponent(valueEmitted): void {
    if (valueEmitted.type === 'complete') {
      this.todoService.completeTodo(valueEmitted.todo.id);
    } else {
      this.refreshTodo(valueEmitted.userId);
    }
  }

  refreshTodo(userId): void {
    if (userId !== null) {
      this.todos = this.todoService.getTodos().filter(todo => {
        return todo.userId === userId;
      });
    } else {
      this.todos = this.todoService.getTodos();
    }
  }

  ngOnDestroy(): void {
    this.isUserAuthd.unsubscribe();
  }

}
