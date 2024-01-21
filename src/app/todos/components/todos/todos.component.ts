import { Component, OnInit } from '@angular/core';
import { TodosService } from '../../services/todos.service';
import { Todo } from '../../models/todos.models';
import { Observable } from 'rxjs';
import { AuthService } from '../../../core/services/auth.service';

@Component({
  selector: 'tl-todos',
  templateUrl: './todos.component.html',
  styleUrls: ['./todos.component.scss'],
})
export class TodosComponent implements OnInit {
  todos$?: Observable<Todo[]>;
  todoTitle = '';

  constructor(
    private todosService: TodosService,
    private authService: AuthService,
  ) {}

  ngOnInit() {
    this.todos$ = this.todosService.todos$;
    this.todosService.getTodos();
  }

  addTodoHandler() {
    this.todosService.addTodo(this.todoTitle);
    this.todoTitle = '';
  }

  removeTodo(todoId: string) {
    this.todosService.removeTodo(todoId);
  }

  changeTodoTitle(data: { todoId: string; todoTitle: string }) {
    this.todosService.updateTodoTitle(data.todoId, data.todoTitle);
  }

  logoutHandler() {
    this.authService.logout();
  }
}
