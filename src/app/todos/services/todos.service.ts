import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment';
import { Todo } from '../models/todos.models';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class TodosService {
  todos$ = new BehaviorSubject<Todo[]>([]);

  constructor(private http: HttpClient) {}

  getTodos() {
    return this.http.get<Todo[]>(`${environment.baseURL}/todo-lists`).subscribe((data) => {
      this.todos$.next(data);
    });
  }
}
