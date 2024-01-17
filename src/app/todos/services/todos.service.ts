import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment';
import { Todo } from '../models/todos.models';
import { BehaviorSubject, map } from 'rxjs';
import { CommonResponse } from '../../core/models/core.models';

@Injectable({
  providedIn: 'root',
})
export class TodosService {
  todos$ = new BehaviorSubject<Todo[]>([]);

  constructor(private http: HttpClient) {}

  getTodos() {
    this.http.get<Todo[]>(`${environment.baseURL}/todo-lists`).subscribe((data) => {
      this.todos$.next(data);
    });
  }

  addTodo(title: string) {
    this.http
      .post<CommonResponse<{ item: Todo }>>(`${environment.baseURL}/todo-lists`, { title })
      .pipe(
        map((data) => {
          const stateTodos = this.todos$.getValue();
          const newTodo = data.data.item;
          return [newTodo, ...stateTodos];
        }),
      )
      .subscribe((data) => {
        this.todos$.next(data);
      });
  }

  removeTodo(todoId: string) {
    this.http
      .delete<CommonResponse>(`${environment.baseURL}/todo-lists/${todoId}`)
      .pipe(
        map(() => {
          const stateTodos = this.todos$.getValue();
          return stateTodos.filter((todo) => todo.id !== todoId);
        }),
      )
      .subscribe((data) => {
        this.todos$.next(data);
      });
  }
}
