import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { TodoService } from 'src/app/services/todo.service';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-todo-form',
  templateUrl: './todo-form.component.html',
  styleUrls: ['./todo-form.component.css']
})
export class TodoFormComponent implements OnInit {

  title: string;
  userName: string;
  @Output() addTodoEvent: EventEmitter<any> = new EventEmitter<any>();

  constructor(private todoService: TodoService, private authService: AuthService) { }

  ngOnInit(): void {
    this.userName = this.authService.retrieveLoggedInUserData();
  }

  addTodo(): void {
    this.todoService.addTodo(this.title, this.userName);
    this.title = '';
    this.addTodoEvent.emit({
      'type': 'add',
      'userId': this.userName
    });
  }

}
