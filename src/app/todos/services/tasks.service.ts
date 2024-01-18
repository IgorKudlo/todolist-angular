import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment';
import { GetTasksResponse, Task } from '../models/tasks.models';
import { map, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class TasksService {
  constructor(private http: HttpClient) {}

  getTasks(todolistId: string): Observable<Task[]> {
    return this.http
      .get<GetTasksResponse>(`${environment.baseURL}/todo-lists/${todolistId}/tasks`)
      .pipe(map((res) => res.items));
  }
}
