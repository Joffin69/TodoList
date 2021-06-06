import { Component, OnInit, Input, EventEmitter, Output, OnChanges, SimpleChanges } from '@angular/core';
import { TodoService } from 'src/app/services/todo.service';

import { Todo } from '../../models/todo';
import { AuthService } from 'src/app/services/auth.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-todos',
  templateUrl: './todos.component.html',
  styleUrls: ['./todos.component.css']
})
export class TodosComponent implements OnInit, OnChanges {

  @Input() data: Todo[];
  todos: Todo[];
  @Output() eventEmitted: EventEmitter<any> = new EventEmitter();
  isUserLoggedIn: boolean;
  userAuthdSub: Subscription;


  constructor(private todoService: TodoService, private authService: AuthService) {}

  ngOnInit(): void {
    this.todos = this.data;
    // this.userAuthdSub = this.authService.getUserAuthd()
    // .subscribe(value => {
    //   this.isUserLoggedIn = value;
    // });
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes.data) {
      this.isUserLoggedIn = this.authService.getIsUserLoggedIn();
      this.todos = this.data;
    }
  }

  onComplete(todo: Todo): void {
    this.eventEmitted.emit({
      'type': 'complete',
      'todo': todo
    });
  }

  onReOpen(todo: Todo): void {
    this.todoService.reOpenTodo(todo.id);
  }

  onDelete(todo: Todo): void {
    this.todoService.deleteTodo(todo.id);
    this.eventEmitted.emit({
      'type': 'delete',
      'userId': this.authService.retrieveLoggedInUserData()
    });
  }
}
